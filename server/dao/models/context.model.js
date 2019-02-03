(function () {
  'use strict';

    const mongoose = require('mongoose');

    const ContextSchema = new mongoose.Schema({
      id_word: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      id_video: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      subtitleIndex: {
        type: Number,
        required: true
      }
    },
    {
      timestamps: true
    });

    exports.ContextSchema = ContextSchema;

})();

