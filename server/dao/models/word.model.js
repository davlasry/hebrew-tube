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
      type: String,
      required: true
    },
    pronunciation: String,
    type: String
  }, {
    timestamps: true
  });

  exports.WordSchema = WordSchema;

})();
