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
      role: String
    },
    {
      timestamps: true
    });

    exports.UserSchema = UserSchema;
})();
