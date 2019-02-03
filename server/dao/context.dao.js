(function() {
  'use strict';

  // External dependencies
  const lodash = require('lodash');
  // Internal dependencies
  const MongoCore = require('../core/database.core');

  const ContextMongo = MongoCore.ContextMongo;

  // Interface du service
  module.exports = {
    createContext: createContext,
    getAllContextsForWord: getAllContextsForWord,
    deleteContextsForVideo: deleteContextsForVideo
  };

  async function createContext(wordID, videoID, subtitleIndex) {
    return new Promise(async function(resolve, reject) {
      try {

        const data = {
          id_word: wordID,
          id_video: videoID,
          subtitleIndex: subtitleIndex
        };

        const newContext = new ContextMongo(data);
        const contextCreated = await newContext.save();

        return resolve(contextCreated);

      } catch(err) {
        console.log('Error in context.dao createContext', err);
        return reject(err);
      }
    });

  }



  async function getAllContextsForWord(wordID) {
    return new Promise(async function(resolve, reject) {

        await ContextMongo.find({id_word: wordID}, async function(err, res) {
            if (err) {
                console.log('Error in context.dao getAllContextsForWord', err);
                return reject(err);
            }
            return resolve(res);
        });
    });
  }



  async function deleteContextsForVideo(videoID) {
    return new Promise(async function(resolve, reject) {
      await ContextMongo.remove({id_video: videoID}, async function(err, res) {
        if (err) {
          console.log('Error in context.dao deleteContextsForVideo', err);
          return reject(err);
        }
        return resolve(res);
      });
    });
  }

})();
