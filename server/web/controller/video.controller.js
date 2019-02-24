(function () {
  'use strict';

  // External dependencies
  const lodash = require('lodash');

  // Internal dependencies
  const VideoSvc = require('../../services/video.service');

  const AuthCore = require('../../core/auth.core');

  // service


  // transverse


  module.exports = {
    createVideo: createVideo,
    updateVideo: updateVideo,
    getVideo: getVideo,
    getAllVideos: getAllVideos,
    deleteVideo: deleteVideo
  };

  /**
   * @description Création d'une Video
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function createVideo(req, res) {
    console.log('createVideo body', req.body);
    try {
      const videoData = lodash.get(req, 'body');
      const videoCreated = await VideoSvc.createVideo(videoData);


      return res.status(200).send({
        data: videoCreated
      });
    } catch (err) {
      return res.status(500).send({
        message: 'error in video creation',
        error: err.toString()
      });
    }
  }

  /**
   * @description Update d'une Video
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function updateVideo(req, res) {
    // console.log(req.body);
    try {
      const videoData = lodash.get(req, 'body');
      const videoID = lodash.get(req, 'params.videoID');

      const videoUpdated = await VideoSvc.updateVideo(videoID, videoData);

      return res.status(200).send({
        data: videoUpdated
      });
    } catch (err) {
      return res.status(500).send({
        message: 'error in video update',
        error: err.toString()
      });
    }
  }



  /**
   * @description Récupération d'une video
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function getVideo(req, res) {
    try {
      const videoID = lodash.get(req, 'params.videoID');
      const video = await VideoSvc.getVideo(videoID);

      return res.status(200).send({
        data: video
      });

    } catch (err) {
      return res.status(500).send({
        auth: false,
        error: err.toString()
      });
    }
  }

  /**
   * @description Récupération de toutes les videos
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function getAllVideos(req, res) {
    try {
      const videos = await VideoSvc.getAllVideos();

      return res.status(200).send({
        data: videos
      });

    } catch (err) {
      return res.status(500).send({
        auth: false,
        error: err.toString()
      });
    }
  }

  /**
   * @description Suppression d'une video
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function deleteVideo(req, res) {
    try {
      const videoToDeleteID = lodash.get(req, 'params.videoID');

      await VideoSvc.deleteVideo(videoToDeleteID);

      return res.status(200).send({
        videoID: videoToDeleteID
      });

    } catch (err) {
      return res.status(500).send({
        auth: false,
        error: err.toString()
      });
    }
  }



})();
