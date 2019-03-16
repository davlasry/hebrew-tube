(function () {
  'use strict';

  // External dependencies
  const jwt = require('jsonwebtoken');
  const bcrypt = require('bcryptjs');
  const lodash = require('lodash');

  // Internal dependencies
  const Config = require('../config/config.js');

  const UserSvc = require('../services/user.service');

  exports.hashPassword = hashPassword;
  exports.comparePassword = comparePassword;
  exports.generateToken = generateToken;
  exports.isConnected = isConnected;
  exports.isAdmin = isAdmin;
  exports.getUserID = getUserID;



  function getUserID() {
    console.log('getUserID');
    return async (req, res, next) => {
      try {
        let userID = null;
        const token = lodash.get(req, 'headers.x-access-token');
        if (token) {
          const decoded = await verifyToken(token);
          userID = decoded.id;
        }

        lodash.set(req, 'userID', userID);
        return next();
      } catch (err) {
        return res.status(401).send({
          auth: false,
          message: 'User not connected.',
          text: 'NOTTTTT CONECT'
        });
      }
    };
  }



  function hashPassword(password) {
    // console.log('hashpassword', password);

    return bcrypt.hashSync(password, 8);
  }

  function comparePassword(userPassword, existingPassword) {
    return bcrypt.compareSync(userPassword, existingPassword);
  }


  function generateToken(userID) {

    return jwt.sign({
      id: userID
    }, Config.mySecret, {
      expiresIn: 1000000 // expires in ...
    });
  }

  async function verifyToken(token) {
    return new Promise(function (resolve, reject) {
      return jwt.verify(token, Config.mySecret, function (err, decoded) {
        if (err) {
          console.log('verifyToken error', err)
          return reject(err);
        }
        return resolve(decoded);
      });
    });
  }


  // On vérifie qu'un user est bien connecté, sinon on le jette
  async function isConnected(req, res, next) {
    try {
      const token = lodash.get(req, 'headers.x-access-token');
      if (!token) {
        return res.status(401).send({
          auth: false,
          message: 'No token provided.'
        });
      }

      if (!lodash.get(req, 'userID')) {
        return res.status(500).send({
          auth: false,
          message: 'Failed to authenticate token.'
        });
      }

      return next();

    } catch (error) {
      return res.status(500).send({
        auth: false,
        message: 'Failed to authenticate token.'
      });
    }
  }

  // On vérifie qu'un user est bien Admin, sinon on le jette
  async function isAdmin(req, res, next) {
    // console.log('isAdmin', req.body);
    try {

      if (!req.userID) {
        return res.status(401).send({
          auth: false,
          message: 'User not connected.'
        });
      }

      const userData = await UserSvc.getUser(req.userID);

      if (lodash.get(userData, 'role') !== 'admin') {
        return res.status(401).send({
          auth: false,
          message: 'User not allowed.'
        });
      }

      return next();

    } catch (error) {
      return res.status(500).send({
        auth: false,
        message: 'Operation not allowed.'
      });
    }
  }

})();
