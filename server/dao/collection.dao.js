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
    deleteCollection: deleteCollection
  };

  async function createCollection(collectionData) {
    return new Promise(async function (resolve, reject) {
      try {

        const data = {
          name: lodash.get(collectionData, 'name'),
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

  async function updateCollection(collectionData) {
    return new Promise(async function (resolve, reject) {
      try {

        const existingCollection = await CollectionMongo.findOne({
          name: lodash.get(collectionData, 'name')
        });
        if (!!existingCollection === false) {
          return reject('nonExistingCollection');
        }

        const collectionUpdated = await existingCollection.save();

        return resolve(collectionUpdated);

      } catch (err) {
        console.log('Error in collection.dao updateCollection', err);
        reject(err);
      }
    });

  }



  async function getCollection(collectionID) {
    return new Promise(async function (resolve, reject) {
      await CollectionMongo.findOne({
        _id: collectionID
      }, async function (err, res) {
        if (err) {
          console.log('Error in collection.dao getCollection', err);
          return reject(err);
        }
        return resolve(res);
      });
    });
  }



  async function getAllCollections() {
    return new Promise(async function (resolve, reject) {
      await CollectionMongo.find({}, async function (err, res) {
        if (err) {
          console.log('Error in collection.dao getAllCollections', err);
          return reject(err);
        }
        return resolve(res);
      });
    });
  }


  async function checkExistingCollection(name) {
    return new Promise(async function (resolve, reject) {
      await CollectionMongo.findOne({
        name: name
      }, async function (err, res) {
        if (err) {
          console.log('Error in collection.dao checkExistingCollection', err);
          return reject(err);
        }
        return resolve(res);
      });
    });
  }


  async function deleteCollection(collectionID) {
    console.log('deleteCollection DAO', collectionID);
    return new Promise(async function (resolve, reject) {
      await CollectionMongo.remove({
        _id: collectionID
      }, async function (err, res) {
        if (err) {
          console.log('Error in collection.dao delete', err);
          return reject(err);
        }
        return resolve(res);
      });
    });
  }

})();
