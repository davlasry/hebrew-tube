(function () {
  'use strict';

  const mongoose = require('mongoose');

  const FavoriteWordSchema = new mongoose.Schema({
    id_word: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'WordSchema',
      required: true
    },
    id_user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  }, {
    timestamps: true
  });

  exports.FavoriteWordSchema = FavoriteWordSchema;

})();
