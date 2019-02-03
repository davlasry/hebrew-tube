(function () {
  'use strict';

  // External dependencies
  const lodash = require('lodash');

  // Internal dependencies
  // core
  const AuthCore = require('../core/auth.core');
  // dao
  const ContextDAO = require('../dao/context.dao');


  // Interface du service
  module.exports = {
    createContextsForVideo: createContextsForVideo,
    getAllContextsForWord: getAllContextsForWord,
    deleteContextsForVideo: deleteContextsForVideo
  };

  // Implémentation


  /**
   * @description Récupère toutes les data pour une vidéo, et crée un contexte par mot
   *
   * @param {string} videoID - id de la vidéo
   * @param {object} videoData - data de la vidéo
   *
   * @return {Promise<object>} - 
   */
  async function createContextsForVideo(videoID, videoData) {

    const subtitlesArray = lodash.get(videoData, 'subtitles');

    const promises = [];
    for(let i = 0; i < subtitlesArray.length; i++) {
      const wordsArray = lodash.get(subtitlesArray[i], 'words');
      for(let j = 0; j < wordsArray.length; j++) {
        promises.push(await ContextDAO.createContext(wordsArray[j], videoID, i));
      }
    }

    return await Promise.all(promises);

  }


  /**
   * @description Récupère tous les contexts pour un mot
   *
   * @param {string} wordID - id du word
   *
   * @return {Promise<object>} - Tous les contexts d'un mot
   */
  async function getAllContextsForWord(wordID) {

    return await ContextDAO.getAllContextsForWord(wordID);

  }


  /**
   * @description Quand on update / supprime une vidéo, on supprime d'abord tous les contextes associés à cette vidéo
   *              Si c'est un update, ils sont recréés juste après (et ainsi on est sur qu'ils sont à jour)
   *
   * @param {string} videoID - id de la Video
   *
   * @return {Promise<object>} - résultat
   */
  async function deleteContextsForVideo(videoID) {
  
    return await ContextDAO.deleteContextsForVideo(videoID);

  }

})();