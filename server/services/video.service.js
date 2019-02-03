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
   * @description Création d'un video
   *
   * @param {string} videoData - data du video
   *
   * @return {Promise<object>} - Les data du video
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
   * @param {string} videoData - data du video
   *
   * @return {Promise<object>} - Les data du video
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
   * @description Récupère les data d'un video par son ID
   *
   * @param {{subBase: string}} dbInfos - infos de la base de données
   * @param {string} uid - id du video
   * @param {string} course - id du cours
   *
   * @return {Promise<object>} - Le cours du video
   */
  async function getVideo(videoID) {

    const videoData = await VideoDAO.getVideo(videoID);

    const subtitlesData = lodash.get(videoData, 'subtitles');
    const subtitlesFormatted = await SubtitleSvc.fromDBToFrontManager(subtitlesData);

    lodash.set(videoData, 'subtitles', subtitlesFormatted);

    return videoData;

  }

  /**
   * @description Récupère les data de tous les videos 
   *
   * @param {{subBase: string}} dbInfos - infos de la base de données
   * @param {string} uid - id du video
   * @param {string} course - id du cours
   *
   * @return {Promise<object>} - Le cours du video
   */
  async function getAllVideos() {

    return await VideoDAO.getAllVideos();

  }


  /**
   * @description Récupère les data d'un video par son Email
   *
   * @param {{subBase: string}} dbInfos - infos de la base de données
   * @param {string} uid - id du video
   * @param {string} course - id du cours
   *
   * @return {Promise<object>} - Le cours du video
   */
  async function deleteVideo(videoID) {

    await ContextSvc.deleteContextsForVideo(videoID);

    await FavoriteSvc.deleteAllFavoritesWithVideo(videoID);

    return await VideoDAO.deleteVideo(videoID);

  }



})();

