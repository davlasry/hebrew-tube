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

    if(!lodash.get(videoData, 'link') || !lodash.get(videoData, 'name')) {
      throw new Error({error: ('Invalid parameters')});
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

    if(!lodash.get(videoData, 'link') || !lodash.get(videoData, 'name')) {
      throw new Error({error: ('Invalid parameters')});
    }

    const existingVideo = await getVideo(videoID);
    if(!existingVideo) {
      throw new Error({error: ('Invalid parameters')});
    }

    await ContextSvc.deleteContextsForVideo(videoID);

    const subtitlesData = lodash.get(videoData, 'subtitles');
    const subtitlesFormatted = await SubtitleSvc.fromFrontToDBManager(subtitlesData);
    lodash.set(videoData, 'subtitles', subtitlesFormatted);

    await ContextSvc.createContextsForVideo(videoID, videoData);
  
    return await VideoDAO.updateVideo(videoData, existingVideo);

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

    const subtitlesData = lodash.get(videoData, 'subtitles');
    const subtitlesFormatted = await SubtitleSvc.fromDBToFrontManager(subtitlesData);

    lodash.set(videoData, 'subtitles', subtitlesFormatted);

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



})();

