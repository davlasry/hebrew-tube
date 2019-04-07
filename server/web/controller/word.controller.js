(function() {
  'use strict';

  // External dependencies
  const lodash = require('lodash');

  // Internal dependencies
  const WordSvc = require('../../services/word.service');

  const AuthCore = require('../../core/auth.core');

  // service

  // transverse

  module.exports = {
    createWord: createWord,
    updateWord: updateWord,
    getWord: getWord,
    getAllWords: getAllWords,
    searchWord: searchWord,
    deleteWord: deleteWord,
    deleteWords: deleteWords
  };

  /**
   * @description Création d'un Word
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function createWord(req, res) {
    // console.log(req.body);
    try {
      const wordData = lodash.get(req, 'body');
      const wordCreated = await WordSvc.createWord(wordData);

      return res.status(200).send({
        data: wordCreated
      });
    } catch (err) {
      return res.status(500).send({
        message: 'error in word creation',
        error: err.toString()
      });
    }
  }

  /**
   * @description Update d'un Word
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function updateWord(req, res) {
    try {
      const wordData = lodash.get(req, 'body');
      const wordUpdated = await WordSvc.updateWord(wordData);

      return res.status(200).send({
        data: wordUpdated
      });
    } catch (err) {
      return res.status(500).send({
        message: 'error in word update',
        error: err.toString()
      });
    }
  }

  /**
   * @description Récupération d'un word
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function getWord(req, res) {
    try {
      const wordID = lodash.get(req, 'params.wordID');

      const word = await WordSvc.getWord(wordID);

      return res.status(200).send({
        data: word
      });
    } catch (err) {
      return res.status(500).send({
        auth: false,
        error: err.toString()
      });
    }
  }

  /**
   * @description Récupération d'un word
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function searchWord(req, res) {
    try {
      const searchString = lodash.get(req, 'params.searchString');
      // console.log('searchString:', searchString);

      const words = await WordSvc.searchWord(searchString);

      return res.status(200).send({
        data: words
      });
    } catch (err) {
      return res.status(500).send({
        auth: false,
        error: err.toString()
      });
    }
  }

  /**
   * @description Récupération de tous les words
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function getAllWords(req, res) {
    console.log('req.body', req.body);
    console.log('req', req);
    try {
      const words = await WordSvc.getAllWords();

      return res.status(200).send({
        data: words
      });
    } catch (err) {
      return res.status(500).send({
        auth: false,
        error: err.toString()
      });
    }
  }

  /**
   * @description Suppression d'un word
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function deleteWord(req, res) {
    // console.log('deleteWord params', req.params);
    try {
      const wordToDeleteID = lodash.get(req, 'params.wordID');

      // console.log('wordToDeleteID', wordToDeleteID);

      await WordSvc.deleteWord(wordToDeleteID);

      return res.status(200).send({
        wordID: wordToDeleteID
      });
    } catch (err) {
      return res.status(500).send({
        auth: false,
        error: err.toString()
      });
    }
  }

  /**
   * @description Suppression de plusieurs words
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function deleteWords(req, res) {
    try {
      const wordsIDArray = lodash.get(req, 'body');

      const promises = [];
      for (let i = 0; i < wordsIDArray.length; i++) {
        promises.push(await WordSvc.deleteWord(wordsIDArray[i]));
      }

      await Promise.all(promises);

      return res.status(200).send('words successfully deleted');
    } catch (err) {
      return res.status(500).send({
        auth: false,
        error: err.toString()
      });
    }
  }
})();
