(function() {
  'use strict';

  // External dependencies
  const lodash = require('lodash');

  // Internal dependencies
  const CollectionSvc = require('../../services/collection.service');

  const AuthCore = require('../../core/auth.core');

  // service

  // transverse

  module.exports = {
    createCollection: createCollection,
    updateCollection: updateCollection,
    addWordToCollection: addWordToCollection,
    getCollection: getCollection,
    getAllCollections: getAllCollections,
    deleteCollection: deleteCollection,
    deleteWordFromCollection: deleteWordFromCollection
  };

  /**
   * @description Création d'un Collection
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function createCollection(req, res) {
    try {
      const collectionData = lodash.get(req, 'body');
      const userID = lodash.get(req, 'userID');
      const collectionCreated = await CollectionSvc.createCollection(
        collectionData,
        userID
      );

      return res.status(200).send({
        data: collectionCreated
      });
    } catch (err) {
      return res.status(500).send({
        message: 'error in collection creation',
        error: err.toString()
      });
    }
  }

  /**
   * @description Update d'un Collection
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function updateCollection(req, res) {
    try {
      const collectionData = lodash.get(req, 'body');
      const collectionId = lodash.get(collectionData, 'collectionId');
      const wordId = lodash.get(collectionData, 'wordId');

      // console.log('updateCollection collectionId', collectionId);
      // console.log('updateCollection wordId', wordId);

      const collectionUpdated = await CollectionSvc.updateCollection(
        collectionData
      );

      return res.status(200).send({
        data: collectionUpdated
      });
    } catch (err) {
      return res.status(500).send({
        message: 'error in collection update',
        error: err.toString()
      });
    }
  }

  /**
   * @description Ajout d'un word a une Collection
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function addWordToCollection(req, res) {
    // console.log('addWordToCollection IN');
    try {
      const collectionId = lodash.get(req, 'params.collectionID');
      const data = lodash.get(req, 'body');
      const wordId = lodash.get(data, 'wordId');

      // console.log('addWordToCollection collectionId', collectionId);
      // console.log('addWordToCollection wordId', wordId);

      const collectionUpdated = await CollectionSvc.addWordToCollection(
        collectionId,
        wordId
      );

      // console.log(
      //   'collectionUpdated addWordToCollection Controller',
      //   collectionUpdated
      // );
      return res.status(200).send({
        data: collectionUpdated
      });
    } catch (err) {
      return res.status(500).send({
        message: 'error in collection update',
        error: err.toString()
      });
    }
  }

  /**
   * @description Retirer un word d'une Collection
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function deleteWordFromCollection(req, res) {
    // console.log('deleteWordFromCollection IN', req.body);
    try {
      const collectionId = lodash.get(req, 'params.collectionID');
      const wordId = lodash.get(req, 'params.wordID');

      // console.log('deleteWordFromCollection collectionId', collectionId);
      // console.log('deleteWordFromCollection wordId', wordId);

      const collectionUpdated = await CollectionSvc.deleteWordFromCollection(
        collectionId,
        wordId
      );

      // console.log(
      //   'collectionUpdated deleteWordFromCollection Service',
      //   collectionUpdated
      // );
      return res.status(200).send({
        data: collectionUpdated
      });
    } catch (err) {
      return res.status(500).send({
        message: 'error in collection update',
        error: err.toString()
      });
    }
  }

  /**
   * @description Récupération d'un collection
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function getCollection(req, res) {
    try {
      const collectionID = lodash.get(req, 'params.collectionID');

      const collection = await CollectionSvc.getCollection(collectionID);

      return res.status(200).send({
        data: collection
      });
    } catch (err) {
      return res.status(500).send({
        auth: false,
        error: err.toString()
      });
    }
  }

  /**
   * @description Récupération de tous les collections
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function getAllCollections(req, res) {
    try {
      const collections = await CollectionSvc.getAllCollections();

      return res.status(200).send({
        data: collections
      });
    } catch (err) {
      return res.status(500).send({
        auth: false,
        error: err.toString()
      });
    }
  }

  /**
   * @description Suppression d'un collection
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function deleteCollection(req, res) {
    // console.log('deleteCollection params', req.params);
    try {
      const collectionToDeleteID = lodash.get(req, 'params.collectionID');

      // console.log('collectionToDeleteID', collectionToDeleteID);

      await CollectionSvc.deleteCollection(collectionToDeleteID);

      return res.status(200).send({
        collectionID: collectionToDeleteID
      });
    } catch (err) {
      return res.status(500).send({
        auth: false,
        error: err.toString()
      });
    }
  }
})();
