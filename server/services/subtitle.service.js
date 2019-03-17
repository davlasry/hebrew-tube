(function () {
  'use strict';

  // External dependencies
  const lodash = require('lodash');

  // Internal dependencies
  // core
  const AuthCore = require('../core/auth.core');
  // dao
  const WordSvc = require('../services/word.service');


  // Interface du service
  module.exports = {
    fromFrontToDBManager: fromFrontToDBManager,
    fromDBToFrontManager: fromDBToFrontManager
  };

  // Implémentation


  /**
   * @description Manager pour storage des datas en DB
   *
   * @param {array} subtitleData - data subtitles arrivant du Front
   *
   * @return {Promise<object>} - Les data formatté pour être stocké en DB
   */
  async function fromFrontToDBManager(subtitleData) {

    console.log('fromFrontToDBManager', subtitleData);

    const promises = [];

    for (let i = 0; i < subtitleData.length; i++) {
      console.log('subtitleData[i]', subtitleData[i]);

      promises.push(await formatSubtitleToDB(subtitleData[i]));
    }

    return await Promise.all(promises);

  }

  /**
   * @description Manager pour envoi des données au Front
   *
   * @param {array} subtitleData - data subtitles stockées en DB
   *
   * @return {Promise<object>} - Les data formatté pour être envoyé au Front
   */
  async function fromDBToFrontManager(subtitleData) {

    const promises = [];

    for (let i = 0; i < subtitleData.length; i++) {
      promises.push(await formatSubtitleToFront(subtitleData[i]));
    }

    return await Promise.all(promises);

  }



  /* private functions */

  // 1 - On récupère les données du Front avec les data des Word
  // 2 - On crée un word (il sera updaté s'il existe déjà)
  // 3 - On fait une liste des ID des words
  // 4 - On remplace les "words" par la liste d'IDs
  async function formatSubtitleToDB(subtitleData) {

    const subtitleWords = lodash.get(subtitleData, 'words');
    // console.log('subtitleWords', subtitleWords);

    const promises = [];
    for (let i = 0; i < subtitleWords.length; i++) {
      console.log('formatSubtitleToDb, subtitleWord', subtitleWords[i]);
      promises.push(await WordSvc.createWord(subtitleWords[i]));
    }

    const wordsData = await Promise.all(promises);

    const wordsList = [];
    for (let j = 0; j < wordsData.length; j++) {
      console.log('formatSubtitleToDB word', wordsData[j]);
      wordsList.push(lodash.get(wordsData[j], '_id'));
    }

    lodash.set(subtitleData, 'words', wordsList);

    return subtitleData;
  }

  // 1 - On récupère les données de la DB avec les IDs des Word
  // 2 - On récupère les data du Word via l'ID
  // 3 - On remplace la liste d'IDs des words par leurs datas
  async function formatSubtitleToFront(subtitleData) {

    const subtitleWords = lodash.get(subtitleData, 'words');

    const promises = [];
    for (let i = 0; i < subtitleWords.length; i++) {
      promises.push(await WordSvc.getWord(subtitleWords[i]));
    }

    const wordsData = await Promise.all(promises);

    lodash.set(subtitleData, 'words', wordsData);

    return subtitleData;
  }


})();
