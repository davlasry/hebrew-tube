(function() {
  'use strict';

  // External dependencies
  const lodash = require('lodash');

  // Internal dependencies
  // core
  const AuthCore = require('../core/auth.core');
  // dao
  const CollectionDAO = require('../dao/collection.dao');
  // service
  const ContextSvc = require('./context.service');
  const FavoriteSvc = require('./favorite.service');

  // Interface du service
  module.exports = {
    createCollection: createCollection,
    updateCollection: updateCollection,
    addWordToCollection: addWordToCollection,
    getCollection: getCollection,
    getAllCollections: getAllCollections,
    deleteCollection: deleteCollection,
    deleteWordFromCollection: deleteWordFromCollection
  };

  // Implémentation

  /**
   * @description Création d'un collection
   *
   * @param {string} collectionData - data du collection
   *
   * @return {Promise<object>} - Les data du collection
   */
  async function createCollection(collectionData, userID) {
    // console.log('collectionData', collectionData);

    if (!lodash.get(collectionData, 'name')) {
      throw new Error({
        error: 'Invalid parameters'
      });
    }

    // IMPORTANT NOTE
    // In here, if the user wants to create a collection but there already is an existing one with the same field name,
    // the collection is automatically updated to the new params
    const existingCollection = await checkExistingCollection(
      lodash.get(collectionData, 'name')
    );
    if (existingCollection) {
      return await updateCollection(collectionData);
    }

    return await CollectionDAO.createCollection(collectionData, userID);
  }

  /**
   * @description Update d'un collection
   *
   * @param {string} collectionData - data du collection
   *
   * @return {Promise<object>} - Les data du collection
   */
  async function updateCollection(collectionData, collectionID) {
    console.log('collectionData in SERVICE:', collectionData);

    // if (
    //   !lodash.get(collectionData, 'name') ||
    //   !lodash.get(collectionData, 'privacy')
    // ) {
    //   throw new Error({
    //     error: 'Invalid parameters'
    //   });
    // }

    return await CollectionDAO.updateCollection(collectionData, collectionID);
  }

  /**
   * @description Update d'un collection
   *
   * @param {string} collectionData - data du collection
   *
   * @return {Promise<object>} - Les data du collection
   */
  async function addWordToCollection(collectionId, wordId) {
    // console.log('addWordToCollectio SERVICE wordId:', wordId);
    // console.log('addWordToCollectio SERVICE collectionId:', collectionId);
    if (!collectionId || !wordId) {
      throw new Error({
        error: 'Invalid parameters'
      });
    }

    return await CollectionDAO.addWordToCollection(collectionId, wordId);
  }

  async function deleteWordFromCollection(collectionId, wordId) {
    // console.log('deleteWordFromCollection SERVICE wordId:', wordId);
    // console.log('deleteWordFromCollection SERVICE collectionId:', collectionId);
    if (!collectionId || !wordId) {
      throw new Error({
        error: 'Invalid parameters'
      });
    }

    return await CollectionDAO.deleteWordFromCollection(collectionId, wordId);
  }

  /**
   * @description Récupère les data d'un collection par son ID
   *
   * @param {string} uid - id du collection
   *
   * @return {Promise<object>} - Le collection
   */
  async function getCollection(collectionID) {
    return await CollectionDAO.getCollection(collectionID);
  }

  /**
   * @description Récupère les data de tous les collections
   *
   * @param {string} uid - id du collection
   *
   * @return {Promise<object>} - Les data de tous les collections
   */
  async function getAllCollections() {
    return await CollectionDAO.getAllCollections();
  }

  /**
   * @description Suppression d'un collection par son ID
   *
   * @param {string} uid - id du collection
   *
   * @return {Promise<object>} - Confirmation delete
   */
  async function deleteCollection(collectionID) {
    console.log('deleteCollection collectionID', collectionID);

    // const collectionContexts = await ContextSvc.getAllContextsForCollection(
    //   collectionID
    // );

    // if (collectionContexts.length > 0) {
    //   console.log('WORD IS USED IN CONTEXTS');
    //   throw new Error('Not allowed, collection is used in Contexts');
    // }

    // await FavoriteSvc.deleteAllFavoritesWithCollection(collectionID);

    return await CollectionDAO.deleteCollection(collectionID);
  }

  /* private function */

  // Check si un mot contenant le champ name est déjà présent
  // Renvoie true or false
  async function checkExistingCollection(nameCollection) {
    const existingCollection = await CollectionDAO.checkExistingCollection(
      nameCollection
    );
    return !!existingCollection;
  }
})();
