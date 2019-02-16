(function () {
  'use strict';

  // External dependencies
  const lodash = require('lodash');

  // Internal dependencies
  const AuthCore = require('../../core/auth.core');

  const UserSvc = require('../../services/user.service');

  module.exports = {
    login: login,
    logout: logout
  };


  async function login(req, res) {

    console.log('login');
    console.log(req.body);

    const email = lodash.get(req, 'body.email');
    const password = lodash.get(req, 'body.password');

    const existingUser = await UserSvc.getUserByEmail(email);
    if (!existingUser) {
      console.log('no user');
      return res.status(404).send('No user found.');
    }


    const passwordIsValid = AuthCore.comparePassword(password, existingUser.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        auth: false,
        token: null,
        text: 'wrong password'
      });
    }

    const token = AuthCore.generateToken(lodash.get(existingUser, '_id'));

    return res.status(200).send({
      auth: true,
      token: token,
      user: {
        firstName: lodash.get(existingUser, 'firstName'),
        lastName: lodash.get(existingUser, 'lastName'),
        email: lodash.get(existingUser, 'email'),
        id: lodash.get(existingUser, 'id')
      }
    });

  }

  async function logout(req, res) {

    return res.status(200).send({
      auth: false,
      token: null
    });

  }
})();
