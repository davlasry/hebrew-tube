const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  hebrew: String,
  french: String,
  pronunciation: String,
  type: String,
  createdAt: Date,
  lastEditedAt: Date,
  videosId: [{
    id: String,
    subtitlesId: []
  }]
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

// wordSchema.pre('save', async function () {
//   const self = this;
//   // console.log(self.hebrew);
//   await Word.count({
//     hebrew: self.hebrew
//   }, function (err, count) {
//     // console.log(count);
//     if (count == 0) {
//       // console.log('Word does not exist', self.hebrew)
//     } else {
//       console.log('word exists: ', self.hebrew);
//     }
//   });
// });

const Word = mongoose.model('Word', wordSchema);

module.exports = Word;
