(function () {
  'use strict';

  const mongoose = require('mongoose');

  const UserSchema = new mongoose.Schema({
      email: {
        type: String,
        unique: true,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      username: {
        type: String
      },
      firstName: String,
      lastName: String,
      role: String,
      collections: [{
        type: String
      }]
    }, {
      timestamps: true
    }
    // words: [],
  );

  exports.UserSchema = UserSchema;
})();
