(function () {
  'use strict';

    const mongoose = require('mongoose');

    const VideoSchema = new mongoose.Schema({
      link: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      subtitles: [{
        start: Number,
        end: Number,
        words: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Word'
        }]
      }]
    },
    {
      timestamps: true
    });

    exports.VideoSchema = VideoSchema;

})();

