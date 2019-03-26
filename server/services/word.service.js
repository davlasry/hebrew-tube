(function() {
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
    // console.log('createWord', wordData);

    // if (!lodash.get(wordData, 'hebrew') || !lodash.get(wordData, 'french')) {
    if (!lodash.get(wordData, 'hebrew')) {
      throw new Error({
        error: 'Invalid parameters'
      });
    }

    // IMPORTANT NOTE
    // In here, if the user wants to create a word but there already is an existing one with the same field hebrew,
    // the word is automatically updated to the new params
    const existingWord = await checkExistingHebrewWord(
      lodash.get(wordData, 'hebrew')
    );
    if (existingWord) {
      // console.log("existingWord", existingWord);
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
    // console.log('updateWord service', wordData);

    // if (!lodash.get(wordData, 'hebrew') || !lodash.get(wordData, 'french')) {
    if (!lodash.get(wordData, 'hebrew')) {
      throw new Error({
        error: 'Invalid parameters'
      });
    }

    const existingWord = await checkExistingHebrewWord(
      lodash.get(wordData, 'hebrew')
    );
    // console.log("updateWord service existingWord", existingWord);
    if (!existingWord) {
      throw new Error({
        error: 'Invalid parameters'
      });
    }

    lodash.set(wordData, '_id', existingWord._id);

    return await WordDAO.updateWord(wordData);
  }

  /**
   * @description Récupère les data d'un word par son ID
   *
   * @param {string} uid - id du word
   *
   * @return {Promise<object>} - Le word
   */
  async function getWord(wordID) {
    return await WordDAO.getWord(wordID);
  }

  /**
   * @description Récupère les data de tous les words
   *
   * @param {string} uid - id du word
   *
   * @return {Promise<object>} - Les data de tous les words
   */
  async function getAllWords() {
    return await WordDAO.getAllWords();
  }

  /**
   * @description Suppression d'un word par son ID
   *
   * @param {string} uid - id du word
   *
   * @return {Promise<object>} - Confirmation delete
   */
  async function deleteWord(wordID) {
    // console.log('deleteWord wordID', wordID);

    const wordContexts = await ContextSvc.getAllContextsForWord(wordID);

    if (wordContexts.length > 0) {
      // console.log('WORD IS USED IN CONTEXTS');
      throw new Error('Not allowed, word is used in Contexts');
    }

    await FavoriteSvc.deleteAllFavoritesWithWord(wordID);

    return await WordDAO.deleteWord(wordID);
  }

  /* private function */

  // Check si un mot contenant le champ hebrew est déjà présent
  // Renvoie true or false
  async function checkExistingHebrewWord(hebrewWord) {
    return await WordDAO.checkExistingHebrewWord(hebrewWord);
    // console.log("checkExistingHebrewWord service", existingHebrewWord);
    // return existingHebrewWord;
  }
})();
