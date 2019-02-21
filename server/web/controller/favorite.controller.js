(function () {
  'use strict';

  // External dependencies
  const lodash = require('lodash');

  // Internal dependencies
  const FavoriteSvc = require('../../services/favorite.service');

  const AuthCore = require('../../core/auth.core');



  module.exports = {
    createFavoriteWord: createFavoriteWord,
    getAllFavoriteWordsForUser: getAllFavoriteWordsForUser,
    deleteFavoriteWord: deleteFavoriteWord,
    deleteMultipleFavoriteWords: deleteMultipleFavoriteWords,
    createFavoriteVideo: createFavoriteVideo,
    getAllFavoriteVideosForUser: getAllFavoriteVideosForUser,
    deleteFavoriteVideo: deleteFavoriteVideo,
    deleteMultipleFavoriteVideos: deleteMultipleFavoriteVideos
  };

  /**
   * @description Création d'un FavoriteWord
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function createFavoriteWord(req, res) {
    try {
      const userID = lodash.get(req, 'userID');
      const wordID = lodash.get(req, 'body.wordID');

      const favoriteWordCreated = await FavoriteSvc.createFavoriteWord(userID, wordID);

      console.log(favoriteWordCreated);

      return res.status(200).send({
        data: favoriteWordCreated
      });
    } catch (err) {
      return res.status(500).send({
        message: 'error in favorite word creation',
        error: err.toString()
      });
    }
  }


  /**
   * @description Récupération de tous les favoriteWords d'un user
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function getAllFavoriteWordsForUser(req, res) {
    try {
      const userID = lodash.get(req, 'userID');

      const favoriteWords = await FavoriteSvc.getAllFavoriteWordsForUser(userID);

      return res.status(200).send({
        data: favoriteWords
      });

    } catch (err) {
      return res.status(500).send({
        error: err.toString()
      });
    }
  }

  /**
   * @description Suppression d'un favoriteWord
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function deleteFavoriteWord(req, res) {
    console.log('deleteFavoriteWord req.body', req.body);
    try {
      const favoriteWordID = lodash.get(req, 'params.favoriteWordID');
      if (!favoriteWordID) {
        return res.status(500).send({
          error: 'missing parameters'
        });
      }
      await FavoriteSvc.deleteAllFavoritesWithWord(favoriteWordID);

      return res.status(200).send('favoriteWord ' + favoriteWordID + ' successfully deleted');

    } catch (err) {
      return res.status(500).send({
        error: err.toString()
      });
    }
  }

  /**
   * @description Suppression de plusieurs favoriteWord
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function deleteMultipleFavoriteWords(req, res) {
    console.log('deleteMultipleFavoriteWordsFavoriteWord req.body', req.body.wordsIds);
    try {
      const favoriteWordsIDArray = lodash.get(req, 'body.wordsIds');

      const promises = [];
      for (let i = 0; i < favoriteWordsIDArray.length; i++) {
        promises.push(await FavoriteSvc.deleteAllFavoritesWithWord(favoriteWordsIDArray[i]));
      }

      await Promise.all(promises);

      return res.status(200).send(favoriteWordsIDArray);

    } catch (err) {
      return res.status(500).send({
        error: err.toString()
      });
    }
  }


  /**
   * @description Création d'un FavoriteVideo
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function createFavoriteVideo(req, res) {
    try {
      const userID = lodash.get(req, 'userID');
      const videoID = lodash.get(req, 'body.videoID');

      const favoriteVideoCreated = await FavoriteSvc.createFavoriteVideo(userID, videoID);

      return res.status(200).send({
        data: favoriteVideoCreated
      });
    } catch (err) {
      return res.status(500).send({
        message: 'error in favorite Video creation',
        error: err.toString()
      });
    }
  }


  /**
   * @description Récupération de tous les favoriteVideos d'un user
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function getAllFavoriteVideosForUser(req, res) {
    try {
      const userID = lodash.get(req, 'userID');

      const favoriteVideos = await FavoriteSvc.getAllFavoriteVideosForUser(userID);

      return res.status(200).send({
        data: favoriteVideos
      });

    } catch (err) {
      return res.status(500).send({
        error: err.toString()
      });
    }
  }

  /**
   * @description Suppression d'un favoriteVideo
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function deleteFavoriteVideo(req, res) {
    try {
      const favoriteVideoID = lodash.get(req, 'params.favoriteVideoID');
      if (!favoriteVideoID) {
        return res.status(500).send({
          error: 'missing parameters'
        });
      }
      await FavoriteSvc.deleteFavoriteVideo(favoriteVideoID);

      return res.status(200).send('favoriteVideo ' + favoriteVideoID + ' successfully deleted');

    } catch (err) {
      return res.status(500).send({
        error: err.toString()
      });
    }
  }

  /**
   * @description Suppression de plusieurs favoriteVideo
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function deleteMultipleFavoriteVideos(req, res) {
    try {

      const favoriteVideosIDArray = lodash.get(req, 'body');

      const promises = [];
      for (let i = 0; i < favoriteVideosIDArray.length; i++) {
        promises.push(await FavoriteSvc.deleteFavoriteVideo(favoriteVideosIDArray[i]));
      }

      await Promise.all(promises);

      return res.status(200).send('favoriteVideo successfully deleted');

    } catch (err) {
      return res.status(500).send({
        error: err.toString()
      });
    }
  }



})();
