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
    searchWord: searchWord,
    getAllWords: getAllWords,
    checkExistingHebrewWord: checkExistingHebrewWord,
    deleteWord: deleteWord
  };

  async function createWord(wordData) {
    // console.log('createWord Dao', wordData);
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

  async function updateWord(wordData, overwrite) {
    console.log('updateWord DAO', wordData);
    return new Promise(async function (resolve, reject) {
      try {
        let existingWord = await WordMongo.findOne({
          hebrew: lodash.get(wordData, 'hebrew')
        });
        if (!!existingWord === false) {
          if (overwrite) {
            existingWord = await WordMongo.findOne({
              _id: lodash.get(wordData, '_id')
            });
            existingWord.hebrew = lodash.get(wordData, 'hebrew');
          } else {
            return reject('nonExistingWord');
          }
        }

        console.log('updateWord DAO existingWord', existingWord);

        if (lodash.get(wordData, 'french')) {
          existingWord.french = lodash.get(wordData, 'french');
        }
        // lodash.set(existingWord, 'french', lodash.get(wordData, 'french'));
        existingWord.type = lodash.get(wordData, 'type');
        existingWord.pronunciation = lodash.get(wordData, 'pronunciation');
        existingWord.genre = lodash.get(wordData, 'genre');
        existingWord.number = lodash.get(wordData, 'number');
        existingWord.forme = lodash.get(wordData, 'forme');
        existingWord.infinitif = lodash.get(wordData, 'infinitif');
        existingWord.time = lodash.get(wordData, 'time');
        existingWord._id = lodash.get(wordData, '_id');

        console.log('updateWord DAO existingWord', existingWord);

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
        },
        async function (err, res) {
          if (err) {
            console.log('Error in word.dao getWord', err);
            return reject(err);
          }
          return resolve(res);
        }
      );
    });
  }

  async function searchWord(searchString) {
    console.log('searchString:', searchString);
    return new Promise(async function (resolve, reject) {
      await WordMongo.find({
          $text: {
            $search: searchString
          }
        },
        async function (err, res) {
          if (err) {
            console.log('Error in word.dao searchWord', err);
            return reject(err);
          }
          return resolve(res);
        }
      );
    });
  }

  async function getAllWords(sortOrder, pageNumber, pageSize) {
    return new Promise(async function (resolve, reject) {
      await WordMongo.find({})
        .skip(pageSize * pageNumber - pageSize)
        .limit(pageSize)
        .sort({
          hebrew: sortOrder
        })
        .exec(function (err, res) {
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
        },
        async function (err, res) {
          if (err) {
            console.log('Error in word.dao checkExistingHebrewWord', err);
            return reject(err);
          }
          // console.log("checkExistingHebrewWord word", res);
          return resolve(res);
        }
      );
    });
  }

  async function deleteWord(wordID) {
    // console.log('deleteWord DAO', wordID);
    return new Promise(async function (resolve, reject) {
      await WordMongo.remove({
          _id: wordID
        },
        async function (err, res) {
          if (err) {
            console.log('Error in word.dao delete', err);
            return reject(err);
          }
          return resolve(res);
        }
      );
    });
  }
})();
