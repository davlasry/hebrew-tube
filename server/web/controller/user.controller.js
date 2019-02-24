(function() {
  'use strict';

  // External dependencies
  const lodash = require('lodash');

  // Internal dependencies
  const UserSvc = require('../../services/user.service');

  const AuthCore = require('../../core/auth.core');

  // service

  // transverse

  module.exports = {
    createUser: createUser,
    updateUser: updateUser,
    getUser: getUser,
    getAllUsers: getAllUsers,
    deleteUser: deleteUser
  };

  /**
   * @description Création d'un user
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function createUser(req, res) {
    try {
      const userID = lodash.get(req, 'userID');
      if (userID) {
        return res.status(500).send({
          auth: false,
          error: 'Invalid parameters'
        });
      }

      const userData = lodash.get(req, 'body');

      const userCreated = await UserSvc.createUser(userData, 'user');
      const token = AuthCore.generateToken(lodash.get(userCreated, '_id'));

      return res.status(200).send({
        auth: true,
        token: token,
        userID: lodash.get(userCreated, '_id')
      });
    } catch (err) {
      console.log(err.error);
      return res.status(500).send({
        auth: false,
        error: err.toString()
      });
    }
  }

  /**
   * @description Update d'un user
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function updateUser(req, res) {
    try {
      const userIDFromParam = lodash.get(req, 'params.userID');
      const userIDFromToken = lodash.get(req, 'userID');

      if (userIDFromToken !== userIDFromParam) {
        return res.status(500).send({
          error: 'Incorrect parameters'
        });
      }

      const userData = lodash.get(req, 'body');

      await UserSvc.updateUser(userIDFromToken, userData);
      return res.status(200).send({
        auth: true,
        message: 'update successful'
      });
    } catch (err) {
      return res.status(500).send({
        auth: false,
        error: err.toString()
      });
    }
  }

  /**
   * @description Récupération d'un user
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function getUser(req, res) {
    try {
      const userIDFromParam = lodash.get(req, 'params.userID');
      const userIDFromToken = lodash.get(req, 'userID');

      if (userIDFromToken !== userIDFromParam) {
        return res.status(500).send({
          error: 'Incorrect parameters'
        });
      }

      const user = await UserSvc.getUserForFront(userIDFromToken);
      // console.log('user', user);

      return res.status(200).send({
        data: user
      });
    } catch (err) {
      return res.status(500).send({
        auth: false,
        error: err.toString()
      });
    }
  }

  /**
   * @description Récupération de tous les users
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function getAllUsers(req, res) {
    try {
      const users = await UserSvc.getAllUsers();

      return res.status(200).send({
        data: users
      });
    } catch (err) {
      return res.status(500).send({
        auth: false,
        error: err.toString()
      });
    }
  }

  /**
   * @description Suppression d'un user
   * @param {object} req - la requête
   * @param {object} res - la réponse
   * @return {*} la requête
   */
  async function deleteUser(req, res) {
    try {
      const userToDeleteID = lodash.get(req, 'params.userID');

      await UserSvc.deleteUser(userToDeleteID);

      return res
        .status(200)
        .send('user ' + userToDeleteID + ' successfully deleted');
    } catch (err) {
      return res.status(500).send({
        auth: false,
        error: err.toString()
      });
    }
  }
})();
