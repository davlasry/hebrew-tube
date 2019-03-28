(function() {
  'use strict';

  const mongoose = require('mongoose');

  const VideoSchema = new mongoose.Schema(
    {
      link: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      subtitles: [
        {
          startTime: Number,
          endTime: Number,
          words: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Word'
            }
          ]
        }
      ]
    },
    {
      timestamps: true
    }
  );

  exports.VideoSchema = VideoSchema;
})();
