const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    name: String,
    youtubeLink: String,
    // author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: Date,
    lastEditedAt: Date,
    subtitles: []
});

// sessionSchema.virtual('recipes', {
//     ref: 'Recipe',
//     localField: '_id',
//     foreignField: 'categories'
// })

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;