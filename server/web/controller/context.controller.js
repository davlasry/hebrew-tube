(function () {
  'use strict';

  // External dependencies
  const lodash = require('lodash');

  // Internal dependencies
  const ContextSvc = require('../../services/context.service');

  const AuthCore = require('../../core/auth.core');

 

  module.exports = {
    getAllContextsForWord: getAllContextsForWord
  };


  /**
   * @description Récupération de tous les contexts d'un Word
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function getAllContextsForWord(req, res) {
    try {
      const wordID = lodash.get(req, 'params.wordID');

      const contextsForWord = await ContextSvc.getAllContextsForWord(wordID);
      
      return res.status(200).send({data: contextsForWord});

    } catch(err) {
      return res.status(500).send({error: err.toString()});
    }
  }
 


})();