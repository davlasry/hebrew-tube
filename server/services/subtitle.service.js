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
   * @param {string} wordData - data du word
   *
   * @return {Promise<object>} - Les data du word
   */
  async function fromFrontToDBManager(subtitleData) {

    const promises = [];

    for(let i = 0; i < subtitleData.length; i++) {
      promises.push(await formatSubtitleToDB(subtitleData[i]));
    }

    return await Promise.all(promises);

  }

  /**
   * @description Manager pour envoie des données au Front
   *
   * @param {string} wordData - data du word
   *
   * @return {Promise<object>} - Les data du word
   */
  async function fromDBToFrontManager(subtitleData) {

    const promises = [];

    for(let i = 0; i < subtitleData.length; i++) {
      promises.push(await formatSubtitleToFront(subtitleData[i]));
    }

    return await Promise.all(promises);

  }



  /* private functions */


  async function formatSubtitleToDB(subtitleData) {

    const subtitleWords = lodash.get(subtitleData, 'words');

    const promises = [];
    for(let i = 0; i < subtitleWords.length; i++) {
      promises.push(await WordSvc.createWord(subtitleWords[i]));
    }

    const wordsData = await Promise.all(promises);

    const wordsList = [];
    for(let j = 0; j < wordsData.length; j++) {
      wordsList.push(lodash.get(wordsData[j], '_id'));
    }

    lodash.set(subtitleData, 'words', wordsList);

    return subtitleData;
  }


  async function formatSubtitleToFront(subtitleData) {

    const subtitleWords = lodash.get(subtitleData, 'words');

    const promises = [];
    for(let i = 0; i < subtitleWords.length; i++) {
      promises.push(await WordSvc.getWord(subtitleWords[i]));
    }

    const wordsData = await Promise.all(promises);

    lodash.set(subtitleData, 'words', wordsData);

    return subtitleData;
  }


})();