(function () {
  'use strict';

  // External dependencies
  const lodash = require('lodash');
  // Internal dependencies
  const MongoCore = require('../core/database.core');

  const CollectionMongo = MongoCore.CollectionMongo;

  // Interface du service
  module.exports = {
    createCollection: createCollection,
    updateCollection: updateCollection,
    getCollection: getCollection,
    getAllCollections: getAllCollections,
    checkExistingCollection: checkExistingCollection,
    deleteCollection: deleteCollection,
    addWordToCollection: addWordToCollection,
    deleteWordFromCollection: deleteWordFromCollection
  };

  async function createCollection(collectionData, userID) {
    return new Promise(async function (resolve, reject) {
      try {
        const data = {
          name: lodash.get(collectionData, 'name'),
          id_user: userID
        };

        const newCollection = new CollectionMongo(data);
        const collectionCreated = await newCollection.save();

        return resolve(collectionCreated);
      } catch (err) {
        console.log('Error in collection.dao createCollection', err);
        return reject(err);
      }
    });
  }

  async function updateCollection(collectionData, collectionID) {
    console.log('collectionData:', collectionData);
    return new Promise(async function (resolve, reject) {
      try {
        const existingCollection = await CollectionMongo.findOne({
          _id: collectionID
        });
        if (!!existingCollection === false) {
          return reject('nonExistingCollection');
        }

        console.log(lodash.get(collectionData, 'name'));
        existingCollection.name = lodash.get(collectionData, 'name');
        existingCollection.privacy = lodash.get(collectionData, 'privacy');

        console.log('existingCollection:', existingCollection);

        const collectionUpdated = await existingCollection.save();

        return resolve(collectionUpdated);
      } catch (err) {
        console.log('Error in collection.dao updateCollection', err);
        reject(err);
      }
    });
  }

  async function addWordToCollection(collectionId, wordId) {
    // console.log('addWordToCollection DAO collectionId', collectionId);
    // console.log('addWordToCollection DAO wordId', wordId);
    return new Promise(async function (resolve, reject) {
      try {
        const collection = await CollectionMongo.findOne({
          _id: collectionId
        });

        if (collection.words.indexOf(wordId.toString()) == -1) {
          collection.words.push(wordId);
          collection.save();
        } else {
          throw new Error('Word already exists in collection');
        }

        // console.log('addWordToCollection collection:', collection);

        return resolve(collection);
      } catch (err) {
        console.log('Error in collection.dao addWordToCollection', err);
        reject(err);
      }
    });
  }

  async function deleteWordFromCollection(collectionId, wordId) {
    // console.log('deleteWordFromCollection DAO collectionId', collectionId);
    // console.log('deleteWordFromCollection DAO wordId', wordId);
    return new Promise(async function (resolve, reject) {
      try {
        const collection = await CollectionMongo.findOne({
          _id: collectionId
        });

        collection.words.splice(collection.words.indexOf(wordId), 1);
        collection.save();

        // console.log('collection deleteWordFromCollection:', collection);

        return resolve(collection);
      } catch (err) {
        console.log('Error in collection.dao deleteWordFromCollection', err);
        reject(err);
      }
    });
  }

  async function getCollection(collectionID) {
    return new Promise(async function (resolve, reject) {
      return await CollectionMongo.findOne({
          _id: collectionID
        })
        .populate({
          path: 'words',
          model: 'Word'
        })
        .exec(function (err, collection) {
          // console.log('collection._doc:', collection._doc);
          if (err) {
            return reject(err);
          }

          return resolve(lodash.get(collection, '_doc'));
        });
    });
  }

  async function getAllCollections() {
    return new Promise(async function (resolve, reject) {
      return await CollectionMongo.find({})
        .populate({
          path: 'words',
          model: 'Word'
        })
        .exec(function (err, collections) {
          // console.log('collections:', collections);
          if (err) {
            return reject(err);
          }

          return resolve(collections);
        });
    });
  }

  async function checkExistingCollection(name, userID) {
    return new Promise(async function (resolve, reject) {
      await CollectionMongo.findOne({
          name: name,
          id_user: userID
        },
        async function (err, res) {
          if (err) {
            console.log('Error in collection.dao checkExistingCollection', err);
            return reject(err);
          }
          return resolve(res);
        }
      );
    });
  }

  async function deleteCollection(collectionID) {
    console.log('deleteCollection DAO', collectionID);
    return new Promise(async function (resolve, reject) {
      await CollectionMongo.deleteOne({
          _id: collectionID
        },
        async function (err, res) {
          if (err) {
            console.log('Error in collection.dao delete', err);
            return reject(err);
          }
          return resolve(res);
        }
      );
    });
  }
})();
