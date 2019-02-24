(function () {
  'use strict';

  // External dependencies
  const lodash = require('lodash');
  // Internal dependencies
  const MongoCore = require('../core/database.core');

  const WordMongo = MongoCore.WordMongo;

  // Interface du service
  module.exports = {
    createWord: createWord,
    updateWord: updateWord,
    getWord: getWord,
    getAllWords: getAllWords,
    checkExistingHebrewWord: checkExistingHebrewWord,
    deleteWord: deleteWord
  };

  async function createWord(wordData) {
    return new Promise(async function (resolve, reject) {
      try {

        const data = {
          hebrew: lodash.get(wordData, 'hebrew'),
          french: lodash.get(wordData, 'french'),
          pronunciation: lodash.get(wordData, 'pronunciation'),
          type: lodash.get(wordData, 'type')
        };

        const newWord = new WordMongo(data);
        const wordCreated = await newWord.save();

        return resolve(wordCreated);

      } catch (err) {
        console.log('Error in word.dao createWord', err);
        return reject(err);
      }
    });

  }

  async function updateWord(wordData) {
    return new Promise(async function (resolve, reject) {
      try {

        const existingWord = await WordMongo.findOne({
          hebrew: lodash.get(wordData, 'hebrew')
        });
        if (!!existingWord === false) {
          return reject('nonExistingWord');
        }

        const data = {
          french: lodash.get(wordData, 'french'),
          type: lodash.get(wordData, 'type'),
          pronunciation: lodash.get(wordData, 'pronunciation')
        };

        lodash.merge(existingWord, data);
        const wordUpdated = await existingWord.save();

        return resolve(wordUpdated);

      } catch (err) {
        console.log('Error in word.dao updateWord', err);
        reject(err);
      }
    });

  }



  async function getWord(wordID) {
    return new Promise(async function (resolve, reject) {
      await WordMongo.findOne({
        _id: wordID
      }, async function (err, res) {
        if (err) {
          console.log('Error in word.dao getWord', err);
          return reject(err);
        }
        return resolve(res);
      });
    });
  }



  async function getAllWords() {
    return new Promise(async function (resolve, reject) {
      await WordMongo.find({}, async function (err, res) {
        if (err) {
          console.log('Error in word.dao getAllWords', err);
          return reject(err);
        }
        return resolve(res);
      });
    });
  }


  async function checkExistingHebrewWord(hebrew) {
    return new Promise(async function (resolve, reject) {
      await WordMongo.findOne({
        hebrew: hebrew
      }, async function (err, res) {
        if (err) {
          console.log('Error in word.dao checkExistingHebrewWord', err);
          return reject(err);
        }
        return resolve(res);
      });
    });
  }


  async function deleteWord(wordID) {
    console.log('deleteWord DAO', wordID);
    return new Promise(async function (resolve, reject) {
      await WordMongo.remove({
        _id: wordID
      }, async function (err, res) {
        if (err) {
          console.log('Error in word.dao delete', err);
          return reject(err);
        }
        return resolve(res);
      });
    });
  }

})();
