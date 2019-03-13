(function () {
  'use strict';

  const mongoose = require('mongoose');

  const CollectionSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
  }, {
    timestamps: true
  });

  exports.CollectionSchema = CollectionSchema;

})();
