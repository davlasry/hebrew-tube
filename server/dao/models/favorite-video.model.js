(function () {
  'use strict';

    const mongoose = require('mongoose');

    const FavoriteVideoSchema = new mongoose.Schema({
      id_video: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      id_user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      }
    },
    {
      timestamps: true
    });

    exports.FavoriteVideoSchema = FavoriteVideoSchema;

})();

