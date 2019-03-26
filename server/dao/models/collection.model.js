(function() {
  'use strict';

  const mongoose = require('mongoose');

  const CollectionSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true
      },
      words: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'WordSchema',
          required: true
        }
      ]
    },
    {
      timestamps: true
    }
  );

  exports.CollectionSchema = CollectionSchema;
})();
