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
   * @description Manager pour storage des datas en DB
   *
   * @param {string} wordData - data du word
   *
   * @return {Promise<object>} - Les data du word
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
   * @description Récupère tous les favoriteVideos du user
   *
   * @param {string} wordID - id du user
   *
   * @return {Promise<object>} - Tous les Video favoris d'un User
   */
  async function getAllContextsForWord(wordID) {

    return await ContextDAO.getAllContextsForWord(wordID);

  }


  /**
   * @description Delete un Favorite Video
   *
   * @param {string} videoID - id du favorite Video
   *
   * @return {Promise<object>} - résultat
   */
  async function deleteContextsForVideo(videoID) {
  
    return await ContextDAO.deleteContextsForVideo(videoID);

  }

})();