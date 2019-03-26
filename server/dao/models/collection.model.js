(function() {
  'use strict';

  const mongoose = require('mongoose');

  const CollectionSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true
      },
      id_user: String,
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
