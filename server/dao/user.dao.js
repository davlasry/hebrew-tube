(function () {
  'use strict';

  // External dependencies
  const lodash = require('lodash');
  // Internal dependencies
  const MongoCore = require('../core/database.core');

  const UserMongo = MongoCore.UserMongo;

  // Interface du service
  module.exports = {
    createUser: createUser,
    updateUser: updateUser,
    getUser: getUser,
    getAllUsers: getAllUsers,
    getUserByEmail: getUserByEmail,
    deleteUser: deleteUser
  };

  async function createUser(userData, role, password) {
    return new Promise(async function (resolve, reject) {
      try {

        const data = {
          email: userData.email,
          lastName: userData.lastName,
          firstName: userData.firstName,
          role: role,
          password: password
        };

        const newUser = new UserMongo(data);
        const userCreated = await newUser.save();

        return resolve(userCreated);

      } catch (err) {
        reject(err);
      }
    });

  }

  async function updateUser(userID, userData, password) {
    return new Promise(async function (resolve, reject) {
      try {

        const existingUser = await UserMongo.findOne({
          _id: userID
        });
        if (!!existingUser === false) {
          return reject('nonExistingUser');
        }

        const data = {
          lastName: userData.lastName,
          firstName: userData.firstName
        };

        if (password) {
          data.password = password;
        }


        lodash.merge(existingUser, data);
        const userUpdated = await existingUser.save();

        return resolve(userUpdated);

      } catch (err) {
        reject(err);
      }
    });

  }



  async function getUser(userID) {
    return new Promise(async function (resolve, reject) {
      await UserMongo.findOne({
        _id: userID
      }, async function (err, res) {
        if (err) {
          console.log('Error in user.dao getUser', err);
          return reject(err);
        }
        return resolve(res);
      });
    });
  }



  async function getAllUsers() {
    return new Promise(async function (resolve, reject) {
      await UserMongo.find({}, async function (err, res) {
        if (err) {
          console.log('Error in user.dao getAllUsers', err);
          return reject(err);
        }
        return resolve(res);
      });
    });
  }


  async function getUserByEmail(email) {
    return new Promise(async function (resolve, reject) {
      await UserMongo.findOne({
        email: email
      }, async function (err, res) {
        if (err) {
          console.log('Error in user.dao getUserByEmail', err);
          return reject(err);
        }
        return resolve(res);
      });
    });
  }


  async function deleteUser(userID) {
    return new Promise(async function (resolve, reject) {
      await UserMongo.remove({
        _id: userID
      }, async function (err, res) {
        if (err) {
          console.log('Error in user.dao delete', err);
          return reject(err);
        }
        return resolve(res);
      });
    });
  }

})();
