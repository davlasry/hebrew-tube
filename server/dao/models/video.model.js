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
      subtitles: mongoose.Schema.Types.Mixed
    },
    {
      timestamps: true
    });

    exports.VideoSchema = VideoSchema;

})();

