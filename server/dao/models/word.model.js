(function () {
  'use strict';

  const mongoose = require('mongoose');

  const WordSchema = new mongoose.Schema({
    hebrew: {
      type: String,
      unique: true,
      required: true
    },
    french: {
      type: String
      // required: true
    },
    pronunciation: String,
    type: String,
    genre: String,
    number: String,
    forme: String,
    time: String,
  }, {
    timestamps: true
  });

  WordSchema.index({
    hebrew: 'text',
    french: 'text'
  });

  exports.WordSchema = WordSchema;
})();
