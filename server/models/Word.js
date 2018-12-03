const mongoose = require('mongoose');

// const definitionSchema = new mongoose.Schema({
//     french: String,
//     english: String,
//     notes: String,
//     phonetic: String,
//     source: String,
//     image: {
//         type: String,
//         default: ''
//     },
//     category: String,
//     difficulty: String,
//     sessions: [{
//         _id: false,
//         location: { type: String, default: '0' },
//         session: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Session'
//         }
//     }],
//     author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
// });

const wordSchema = new mongoose.Schema({
    hebrew: String,
    definition: String,
    createdAt: Date,
    lastEditedAt: Date,
});

wordSchema.index({
        hebrew: 'text',
        // english: 'text',
        // french: 'text',
    },
    // {
    //     weights: {
    //         name: 5,
    //     },
    // }
);

const Word = mongoose.model('Word', wordSchema);

module.exports = Word;