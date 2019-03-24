(function () {
  'use strict';

  // External dependencies
  const lodash = require('lodash');
  // Internal dependencies
  const MongoCore = require('../core/database.core');

  const VideoMongo = MongoCore.VideoMongo;

  // Interface du service
  module.exports = {
    createVideo: createVideo,
    updateVideo: updateVideo,
    getVideo: getVideo,
    getAllVideos: getAllVideos,
    deleteVideo: deleteVideo
  };

  async function createVideo(videoData) {
    return new Promise(async function (resolve, reject) {
      try {

        const data = {
          link: lodash.get(videoData, 'link'),
          name: lodash.get(videoData, 'name'),
          subtitles: lodash.get(videoData, 'subtitles')
        };

        console.log('createVideo DAO data', data);

        const newVideo = new VideoMongo(data);
        const videoCreated = await newVideo.save();

        return resolve(videoCreated);

      } catch (err) {
        console.log('Error in video.dao createVideo', err);
        return reject(err);
      }
    });

  }

  async function updateVideo(videoID, videoData) {
    return new Promise(async function (resolve, reject) {
      try {

        const existingVideo = await VideoMongo.findOne({
          _id: videoID
        });
        if (!!existingVideo === false) {
          return reject('nonExisting video');
        }

        // console.log('existingVideo before merge', existingVideo);

        existingVideo.name = lodash.get(videoData, 'name');
        existingVideo.subtitles = lodash.get(videoData, 'subtitles');
        // console.log('existingVideo after merge', existingVideo);
        // existingVideo.markModified('subtitles');
        const videoUpdated = await existingVideo.save();
        // const videoUpdated = await VideoMongo.findOneAndUpdate({
        //   _id: existingVideo._id
        // }, data, {
        //   "new": true
        // }, (err, doc) => {
        //   return doc;
        // });

        // console.log('videoUpdated', videoUpdated);

        return resolve(videoUpdated);

      } catch (err) {
        console.log('Error in video.dao updateVideo', err);
        reject(err);
      }
    });

  }



  async function getVideo(videoID) {
    return new Promise(async function (resolve, reject) {
      return await VideoMongo.
      findOne({
        _id: videoID
      }).
      populate('subtitles.words').
      exec(function (err, story) {
        if (err) {
          return reject(err);
        }

        return resolve(lodash.get(story, '_doc'));
      });



    });
  }



  async function getAllVideos() {
    return new Promise(async function (resolve, reject) {
      await VideoMongo.find({}, async function (err, res) {
        if (err) {
          console.log('Error in video.dao getAllVideos', err);
          return reject(err);
        }
        return resolve(res);
      });
    });
  }



  async function deleteVideo(videoID) {
    return new Promise(async function (resolve, reject) {
      await VideoMongo.remove({
        _id: videoID
      }, async function (err, res) {
        if (err) {
          console.log('Error in video.dao delete', err);
          return reject(err);
        }
        return resolve(res);
      });
    });
  }

})();
