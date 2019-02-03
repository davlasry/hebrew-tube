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
   * @description Création d'un Video
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function createVideo(req, res) {
    try {
      const videoData = lodash.get(req, 'body');
      const videoCreated = await VideoSvc.createVideo(videoData);


      return res.status(200).send({data: videoCreated});
    } catch(err) {
      return res.status(500).send({message: 'error in video creation', error: err});
    }
  }

  /**
   * @description Update d'un Video
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function updateVideo(req, res) {
    try {
      const videoData = lodash.get(req, 'body');
      const videoID = lodash.get(req, 'params.videoID');

      const videoUpdated = await VideoSvc.updateVideo(videoID, videoData);

      // TO DO
      //  Need to update subtitles HERE

      return res.status(200).send({data: videoUpdated});
    } catch(err) {
      return res.status(500).send({message: 'error in video update', error: err});
    }
  }



  /**
   * @description Récupération d'un video
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function getVideo(req, res) {
    try {
      const videoID = lodash.get(req, 'params.videoID');
      const video = await VideoSvc.getVideo(videoID);
      
      // TO DO
      //  Need to get subtitles HERE

      return res.status(200).send({data: video});

    } catch(err) {
      return res.status(500).send({auth: false, error: err});
    }
  }

  /**
   * @description Récupération de tous les videos
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function getAllVideos(req, res) {
    try {
      const videos = await VideoSvc.getAllVideos();
      
      return res.status(200).send({data: videos});

    } catch(err) {
      return res.status(500).send({auth: false, error: err});
    }
  }
 
   /**
   * @description Suppression d'un video
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function deleteVideo(req, res) {
    try {
      const videoToDeleteID = lodash.get(req, 'params.videoID');

      await VideoSvc.deleteVideo(videoToDeleteID);
      
      return res.status(200).send('video ' + videoToDeleteID + ' successfully deleted');

    } catch(err) {
      return res.status(500).send({auth: false, error: err});
    }
  }
 


})();