(function () {
  'use strict';

  // External dependencies
  const lodash = require('lodash');

  // Internal dependencies
  // core
  const AuthCore = require('../core/auth.core');
  // dao
  const WordDAO = require('../dao/word.dao');
  // service
  const ContextSvc = require('./context.service');
  const FavoriteSvc = require('./favorite.service');


  // Interface du service
  module.exports = {
    createWord: createWord,
    updateWord: updateWord,
    getWord: getWord,
    getAllWords: getAllWords,
    deleteWord: deleteWord
  };

  // Implémentation


  /**
   * @description Création d'un word
   *
   * @param {string} wordData - data du word
   *
   * @return {Promise<object>} - Les data du word
   */
  async function createWord(wordData) {

    if(!lodash.get(wordData, 'hebrew') || !lodash.get(wordData, 'french')) {
      throw new Error({error: ('Invalid parameters')});
    }


    // IMPORTANT NOTE
    // In here, if the user wants to create a word but there already is an existing one with the same field hebrew,
    // the word is automatically updated to the new params
    const existingWord = await checkExistingHebrewWord(lodash.get(wordData, 'hebrew'));
    if(existingWord) {
      return await updateWord(wordData);
    }
  
    return await WordDAO.createWord(wordData);

  }


  /**
   * @description Update d'un word
   *
   * @param {string} wordData - data du word
   *
   * @return {Promise<object>} - Les data du word
   */
  async function updateWord(wordData) {

    if(!lodash.get(wordData, 'hebrew') || !lodash.get(wordData, 'french')) {
      throw new Error({error: ('Invalid parameters')});
    }

    const existingWord = await checkExistingHebrewWord(lodash.get(wordData, 'hebrew'));
    if(!existingWord) {
      throw new Error({error: ('Invalid parameters')});
    }
  
    return await WordDAO.updateWord(wordData);

  }


  /**
   * @description Récupère les data d'un word par son ID
   *
   * @param {{subBase: string}} dbInfos - infos de la base de données
   * @param {string} uid - id du word
   * @param {string} course - id du cours
   *
   * @return {Promise<object>} - Le cours du word
   */
  async function getWord(wordID) {

    return await WordDAO.getWord(wordID);

  }

  /**
   * @description Récupère les data de tous les words 
   *
   * @param {{subBase: string}} dbInfos - infos de la base de données
   * @param {string} uid - id du word
   * @param {string} course - id du cours
   *
   * @return {Promise<object>} - Le cours du word
   */
  async function getAllWords() {

    return await WordDAO.getAllWords();

  }


  /**
   * @description Récupère les data d'un word par son Email
   *
   * @param {{subBase: string}} dbInfos - infos de la base de données
   * @param {string} uid - id du word
   * @param {string} course - id du cours
   *
   * @return {Promise<object>} - Le cours du word
   */
  async function deleteWord(wordID) {
  
    const wordContexts = await ContextSvc.getAllContextsForWord(wordID);

    if(wordContexts.length > 0) {
      throw new Error({error: ('Not allowed, word is used in Contexts')});
    }

    await FavoriteSvc.deleteAllFavoritesWithWord(wordID);

    return await WordDAO.deleteWord(wordID);

  }




  /* private function */

  async function checkExistingHebrewWord(hebrewWord) {
    const existingHebrewWord = await WordDAO.checkExistingHebrewWord(hebrewWord);
    return !!existingHebrewWord;

  }


})();

