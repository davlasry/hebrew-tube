(function() {
  'use strict';

  // External dependencies
  const lodash = require('lodash');

  // Internal dependencies
  // core
  const AuthCore = require('../core/auth.core');
  // dao
  const UserDAO = require('../dao/user.dao');

  // Interface du service
  module.exports = {
    createUser: createUser,
    updateUser: updateUser,
    getUserForFront: getUserForFront,
    getUser: getUser,
    getAllUsers: getAllUsers,
    getUserByEmail: getUserByEmail,
    deleteUser: deleteUser
  };

  // Implémentation

  /**
   * @description Création d'un user
   *
   * @param {string} userData - data du user
   *
   * @return {Promise<object>} - Les data du user
   */
  async function createUser(userData, role) {
    if (!lodash.get(userData, 'email') || !lodash.get(userData, 'password')) {
      throw new Error({
        error: 'Invalid parameters'
      });
    }

    const existingUser = await getUserByEmail(lodash.get(userData, 'email'));
    if (existingUser) {
      throw new Error({
        error: 'Email already taken'
      });
    }
    const hashedPassword = AuthCore.hashPassword(userData.password);

    return await UserDAO.createUser(userData, role, hashedPassword);
  }

  /**
   * @description Update d'un user
   *
   * @param {string} userData - data du user
   *
   * @return {Promise<object>} - Les data du user
   */
  async function updateUser(userID, userData) {
    let hashedPassword = null;
    if (lodash.get(userData, 'password')) {
      hashedPassword = AuthCore.hashPassword(userData.password);
    }

    const existingUser = await getUser(userID);
    if (existingUser.email !== userData.email) {
      throw new Error({
        error: 'Incorrect parameters'
      });
    }

    return await UserDAO.updateUser(userID, userData, hashedPassword);
  }

  /**
   * @description Récupère les data d'un user par son ID avec uniquement les paramètres visible sur le Front par un User
   *
   * @param {string} uid - id du user
   *
   * @return {Promise<object>} - Les data du user pour le Front
   */
  async function getUserForFront(userID) {
    const rawUserData = await getUser(userID);
    return {
      id: lodash.get(rawUserData, '_id'),
      email: lodash.get(rawUserData, 'email'),
      firstName: lodash.get(rawUserData, 'firstName'),
      lastName: lodash.get(rawUserData, 'lastName'),
      createdAt: lodash.get(rawUserData, 'createdAt'),
      role: lodash.get(rawUserData, 'role')
    };
  }

  /**
   * @description Récupère les data d'un user par son ID
   *
   * @param {string} uid - id du user
   *
   * @return {Promise<object>} - Les data du user
   */
  async function getUser(userID) {
    return await UserDAO.getUser(userID);
  }

  /**
   * @description ADMIN FUNCTION - Récupère les data de tous les users
   *
   * @param {string} uid - id du user
   *
   * @return {Promise<object>} - Les datas de tous les users
   */
  async function getAllUsers() {
    return await UserDAO.getAllUsers();
  }

  /**
   * @description Récupère les data d'un user par son Email
   *
   * @param {string} email du user
   *
   * @return {Promise<object>} - Les data du user
   */
  async function getUserByEmail(userEmail) {
    return await UserDAO.getUserByEmail(userEmail);
  }

  /**
   * @description Suppression d'un user par son ID
   *
   * @param {string} uid - id du user
   *
   * @return {Promise<object>} - Confirmation
   */
  async function deleteUser(userID) {
    return await UserDAO.deleteUser(userID);
  }
})();
