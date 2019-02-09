(function () {
  'use strict';

  // External dependencies
  const lodash = require('lodash');

  // Internal dependencies
  // core
  const AuthCore = require('../core/auth.core');
  // service
  const WordDAO = require('./../dao/word.dao');
  // dao
  const FavoriteWordDAO = require('../dao/favorite-word.dao');
  const FavoriteVideoDAO = require('../dao/favorite-video.dao');



  // Interface du service
  module.exports = {
    createFavoriteWord: createFavoriteWord,
    getAllFavoriteWordsForUser: getAllFavoriteWordsForUser,
    deleteFavoriteWord: deleteFavoriteWord,
    deleteAllFavoritesWithWord: deleteAllFavoritesWithWord,
    createFavoriteVideo: createFavoriteVideo,
    getAllFavoriteVideosForUser: getAllFavoriteVideosForUser,
    deleteFavoriteVideo: deleteFavoriteVideo,
    deleteAllFavoritesWithVideo: deleteAllFavoritesWithVideo
  };

  // Implémentation


  /**
   * @description Création d'un favoriteWord
   *
   * @param {string} userID, wordID
   *
   * @return {Promise<object>} - Les data du favoriteWord
   */
  async function createFavoriteWord(userID, wordID) {

    if (!userID || !wordID) {
      throw new Error({
        error: ('Invalid parameters')
      });
    }

    return await FavoriteWordDAO.createFavoriteWord(userID, wordID);

  }



  /**
   * @description Récupère tous les favoriteWords du user
   *
   * @param {string} uid - id du user
   *
   * @return {Promise<object>} - Tous les Words favoris d'un User
   */
  async function getAllFavoriteWordsForUser(userID) {

    const favoriteWords = await FavoriteWordDAO.getAllFavoriteWordsForUser(userID);
    const promises = [];
    for(let i = 0; i < favoriteWords.length; i++) {
      promises.push(await formatFavoriteWord(favoriteWords[i]));
    }

    return await Promise.all(promises);

  }


  /**
   * @description Delete un Favorite Word
   *
   * @param {string} uid - id du favoriteWord
   *
   * @return {Promise<object>} - résultat
   */
  async function deleteFavoriteWord(favoriteWordID) {

    return await FavoriteWordDAO.deleteFavoriteWord(favoriteWordID);
  }

  /**
   * @description Quand un mot est supprimé , cette méthode sert à faire un delete partout dans les favoris
   *
   * @param {string} uid - id du word
   *
   * @return {Promise<object>} - résultat
   */
  async function deleteAllFavoritesWithWord(wordID) {

    return await FavoriteWordDAO.deleteAllFavoritesWithWord(wordID);
  }

  /**
   * @description Création d'un favorite Video
   *
   * @param {string} userID, Video ID
   *
   * @return {Promise<object>} - Les data du favoriteVideo
   */
  async function createFavoriteVideo(userID, videoID) {

    if (!userID || !videoID) {
      throw new Error({
        error: ('Invalid parameters')
      });
    }

    return await FavoriteVideoDAO.createFavoriteVideo(userID, videoID);

  }



  /**
   * @description Récupère tous les favoriteVideos du user
   *
   * @param {string} uid - id du user
   *
   * @return {Promise<object>} - Tous les Video favoris d'un User
   */
  async function getAllFavoriteVideosForUser(userID) {

    return await FavoriteVideoDAO.getAllFavoriteVideosForUser(userID);

  }


  /**
   * @description Delete un Favorite Video
   *
   * @param {string} uid - id du favorite Video
   *
   * @return {Promise<object>} - résultat
   */
  async function deleteFavoriteVideo(favoriteVideoID) {

    return await FavoriteVideoDAO.deleteFavoriteVideo(favoriteVideoID);

  }

  /**
   * @description Quand une vidéo est supprimée, cette méthode sert à faire un delete partout dans les favoris
   *
   * @param {string} uid - id du favorite Video
   *
   * @return {Promise<object>} - résultat
   */
  async function deleteAllFavoritesWithVideo(videoID) {

    return await FavoriteVideoDAO.deleteAllFavoritesWithVideo(videoID);

  }

  /* private function */

  async function formatFavoriteWord(favoriteWordData) {
    const wordID = lodash.get(favoriteWordData, 'id_word');
    const wordData = await WordDAO.getWord(wordID);

    return {
      _id: lodash.get(favoriteWordData, '_id'),
      id_word: wordID,
      id_user: lodash.get(favoriteWordData, 'id_user'),
      hebrew: lodash.get(wordData, 'hebrew'),
      pronunciation: lodash.get(wordData, 'pronunciation')
    };
  }


})();
