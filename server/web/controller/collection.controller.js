(function () {
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
    getCollection: getCollection,
    getAllCollections: getAllCollections,
    deleteCollection: deleteCollection,
    deleteCollections: deleteCollections
  };

  /**
   * @description Création d'un Collection
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function createCollection(req, res) {
    console.log(req.body);
    try {
      const collectionData = lodash.get(req, 'body');
      const collectionCreated = await CollectionSvc.createCollection(collectionData);

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
      const collectionUpdated = await CollectionSvc.updateCollection(collectionData);

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
    console.log('deleteCollection params', req.params);
    try {
      const collectionToDeleteID = lodash.get(req, 'params.collectionID');

      console.log('collectionToDeleteID', collectionToDeleteID);

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

  /**
   * @description Suppression de plusieurs collections
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function deleteCollections(req, res) {
    try {
      const collectionsIDArray = lodash.get(req, 'body');

      const promises = [];
      for (let i = 0; i < collectionsIDArray.length; i++) {
        promises.push(await CollectionSvc.deleteCollection(collectionsIDArray[i]));
      }

      await Promise.all(promises);


      return res.status(200).send('collections successfully deleted');

    } catch (err) {
      return res.status(500).send({
        auth: false,
        error: err.toString()
      });
    }
  }




})();
