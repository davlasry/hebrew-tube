(function () {
  'use strict';

  // External dependencies
  const lodash = require('lodash');
  // Internal dependencies
  const MongoCore = require('../core/database.core');

  const FavoriteWordMongo = MongoCore.FavoriteWordMongo;

  // Interface du service
  module.exports = {
    createFavoriteWord: createFavoriteWord,
    getAllFavoriteWordsForUser: getAllFavoriteWordsForUser,
    deleteFavoriteWord: deleteFavoriteWord,
    deleteAllFavoritesWithWord: deleteAllFavoritesWithWord
  };

  async function createFavoriteWord(userID, wordID) {
    return new Promise(async function (resolve, reject) {
      try {

        const data = {
          id_user: userID,
          id_word: wordID
        };

        const newFavoriteWord = new FavoriteWordMongo(data);
        const favoriteWordCreated = await newFavoriteWord.save();

        return resolve(favoriteWordCreated);

      } catch (err) {
        console.log('Error in favorite-word.dao createFavoriteWord', err);
        return reject(err);
      }
    });

  }



  async function getAllFavoriteWordsForUser(userID) {
    return new Promise(async function (resolve, reject) {

      await FavoriteWordMongo.find({
        id_user: userID
      }, async function (err, res) {
        console.log(res);;
        if (err) {
          console.log('Error in favorite-word.dao getAllFavoritesForUser', err);
          return reject(err);
        }
        return resolve(res);
      });
    });
  }



  async function deleteFavoriteWord(favoriteWordID) {
    return new Promise(async function (resolve, reject) {
      await FavoriteWordMongo.remove({
        _id: favoriteWordID
      }, async function (err, res) {
        if (err) {
          console.log('Error in favorite-word.dao deleteFavoriteWord', err);
          return reject(err);
        }
        return resolve(res);
      });
    });
  }



  async function deleteAllFavoritesWithWord(wordID) {
    return new Promise(async function (resolve, reject) {
      await FavoriteWordMongo.remove({
        id_word: wordID
      }, async function (err, res) {
        if (err) {
          console.log('Error in favorite-word.dao deleteAllFavoritesWithWord', err);
          return reject(err);
        }
        return resolve(res);
      });
    });
  }




})();
