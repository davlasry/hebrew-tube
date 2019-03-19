(function () {
  'use strict';

  // External dependencies
  const lodash = require('lodash');

  // Internal dependencies
  // core
  const AuthCore = require('../core/auth.core');
  // service
  const SubtitleSvc = require('./subtitle.service');
  const ContextSvc = require('../services/context.service');
  const FavoriteSvc = require('../services/favorite.service');
  // dao
  const VideoDAO = require('../dao/video.dao');


  // Interface du service
  module.exports = {
    createVideo: createVideo,
    updateVideo: updateVideo,
    getVideo: getVideo,
    getAllVideos: getAllVideos,
    deleteVideo: deleteVideo
  };

  // Implémentation


  /**
   * @description Création d'une video
   *
   * @param {string} videoData - data de la video
   *
   * @return {Promise<object>} - Les data de la video
   */
  async function createVideo(videoData) {

    // console.log('createVideo Service', videoData);

    if (!lodash.get(videoData, 'link') || !lodash.get(videoData, 'name')) {
      throw new Error({
        error: ('Invalid parameters')
      });
    }

    const subtitlesData = lodash.get(videoData, 'subtitles');
    const subtitlesFormatted = await SubtitleSvc.fromFrontToDBManager(subtitlesData);

    lodash.set(videoData, 'subtitles', subtitlesFormatted);

    const videoCreated = await VideoDAO.createVideo(videoData);

    await ContextSvc.createContextsForVideo(lodash.get(videoCreated, '_id'), videoData);

    return videoCreated;

  }


  /**
   * @description Update d'un video
   *
   * @param {string} videoData - data de la video
   *
   * @return {Promise<object>} - Les data de la video
   */
  async function updateVideo(videoID, videoData) {

    if (!lodash.get(videoData, 'link') || !lodash.get(videoData, 'name')) {
      throw new Error('Invalid parameters - missing link or name');
    }

    const existingVideo = await getVideo(videoID);
    if (!existingVideo) {
      throw new Error('Bad ID - Invalid parameters');
    }

    await ContextSvc.deleteContextsForVideo(videoID);

    const subtitlesData = lodash.get(videoData, 'subtitles');
    console.log('subtitlesData', subtitlesData);
    const subtitlesFormatted = await SubtitleSvc.fromFrontToDBManager(subtitlesData);
    console.log('subtitlesFormatted', subtitlesFormatted);
    lodash.set(videoData, 'subtitles', subtitlesFormatted);
    console.log('nsewVideoData', videoData);

    await ContextSvc.createContextsForVideo(videoID, videoData);

    return await VideoDAO.updateVideo(videoID, videoData);

  }


  /**
   * @description Récupère les data d'une video par son ID
   *
   * @param {string} uid - id du video
   *
   * @return {Promise<object>} - Les data de la video
   */
  async function getVideo(videoID) {

    const videoData = await VideoDAO.getVideo(videoID);

    // const subtitlesData = lodash.get(videoData, 'subtitles');
    // // const subtitlesFormatted = await SubtitleSvc.fromDBToFrontManager(subtitlesData);

    // // lodash.set(videoData, 'subtitles', subtitlesFormatted);
    return videoData;

  }

  /**
   * @description Récupère les data de toutes les videos
   *
   * @param {string} uid - id du video
   *
   * @return {Promise<object>} - Les data de toutes les videos
   */
  async function getAllVideos() {

    return await VideoDAO.getAllVideos();

  }


  /**
   * @description Suppression d'une vidéo par son ID
   *
   * @param {string} id de la video
   *
   * @return {Promise<object>} - Confirmation
   */
  async function deleteVideo(videoID) {

    await ContextSvc.deleteContextsForVideo(videoID);

    await FavoriteSvc.deleteAllFavoritesWithVideo(videoID);

    return await VideoDAO.deleteVideo(videoID);

  }

  /* private function */

  // async function formatVideo(videoData) {
  //   const videoID = lodash.get(favoriteWordData, 'id_word');
  //   const wordData = await WordDAO.getWord(wordID);

  //   return {
  //     _id: lodash.get(favoriteWordData, '_id'),
  //     id_word: wordID,
  //     id_user: lodash.get(favoriteWordData, 'id_user'),
  //     hebrew: lodash.get(wordData, 'hebrew'),
  //     french: lodash.get(wordData, 'french'),
  //     type: lodash.get(wordData, 'type'),
  //     pronunciation: lodash.get(wordData, 'pronunciation'),
  //     createdAt: lodash.get(wordData, 'createdAt')
  //   };
  // }



})();
