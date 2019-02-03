(function() {
  'use strict';

  // External dependencies
  const lodash = require('lodash');
  // Internal dependencies
  const MongoCore = require('../core/database.core');

  const FavoriteVideoMongo = MongoCore.FavoriteVideoMongo;

  // Interface du service
  module.exports = {
    createFavoriteVideo: createFavoriteVideo,
    getAllFavoriteVideosForUser: getAllFavoriteVideosForUser,
    deleteFavoriteVideo: deleteFavoriteVideo,
    deleteAllFavoritesWithVideo: deleteAllFavoritesWithVideo
  };

  async function createFavoriteVideo(userID, videoID) {
    return new Promise(async function(resolve, reject) {
      try {

        const data = {
          id_user: userID,
          id_video: videoID
        };

        const newFavoriteVideo = new FavoriteVideoMongo(data);
        const favoriteVideoCreated = await newFavoriteVideo.save();

        return resolve(favoriteVideoCreated);

      } catch(err) {
        console.log('Error in favorite-video.dao createFavoriteVideo', err);
        return reject(err);
      }
    });

  }



  async function getAllFavoriteVideosForUser(userID) {
    return new Promise(async function(resolve, reject) {

        await FavoriteVideoMongo.find({id_user: userID}, async function(err, res) {
            if (err) {
                console.log('Error in favorite-video.dao getAllFavoritesForUser', err);
                return reject(err);
            }
            return resolve(res);
        });
    });
  }



  async function deleteFavoriteVideo(favoriteVideoID) {
    return new Promise(async function(resolve, reject) {
      await FavoriteVideoMongo.remove({_id: favoriteVideoID}, async function(err, res) {
        if (err) {
          console.log('Error in favorite-video.dao deleteFavoriteVideo', err);
          return reject(err);
        }
        return resolve(res);
      });
    });
  }


  async function deleteAllFavoritesWithVideo(videoID) {
    return new Promise(async function(resolve, reject) {
      await FavoriteVideoMongo.remove({id_video: videoID}, async function(err, res) {
        if (err) {
          console.log('Error in favorite-video.dao deleteAllFavoritesWithVideo', err);
          return reject(err);
        }
        return resolve(res);
      });
    });
  }

})();
