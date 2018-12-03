const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    name: String,
    youtubeLink: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: Date,
    lastEditedAt: Date,
});

sessionSchema.virtual('recipes', {
    ref: 'Recipe',
    localField: '_id',
    foreignField: 'categories'
})

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;