const router = require('express').Router();
const Video = require('../models/Video');
const Word = require('../models/Word');
const mongoose = require('mongoose');
const async = require('async');

// GET all videos
router.get('/', (req, res, next) => {
  Video
    .find()
    .sort('-createdAt')
    .exec()
    .then(videos => {
      // console.log(videos);
      res.status(200).json(videos);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
});

// GET a video
router.get('/:videoId', (req, res, next) => {
  const id = req.params.videoId;
  // console.log(id);

  Video.findById(id)
    .exec()
    .then(video => {
      console.log(video);
      res.status(200).json(video);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
});

// Create a video
router.post('/', (req, res, next) => {
  console.log(`Add video: ${req.body}`);
  const video = new Video({
    _id: new mongoose.Types.ObjectId(),
    createdAt: new Date(),
    lastEditedAt: new Date(),
    name: req.body.name,
    youtubeLink: req.body.youtubeLink,
    subtitles: req.body.subtitles
  });
  video
    .save()
    .then(result => {
      // console.log(result);
      res.status(201).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// Edit a video
router.patch('/:videoId', (req, res, next) => {
  const videoId = req.body._id;
  // console.log(videoId);
  // console.log(req.body.youtubeLink);
  let index = 0
  async.eachSeries(req.body.subtitles, (subtitle, cb) => {
    console.log("Words Count", subtitle.words.length);
    index = req.body.subtitles.indexOf(subtitle)
    console.log('Sub index', index)
    async.eachSeries(subtitle.words, (word, inCb) => {

      Word.findOne({
        hebrew: word.hebrew
      }, function (err, wordFound) {
        if (wordFound) {
          console.log('Word already exists! Update here');
          console.log(wordFound._id);
          // Video
          //   .update({
          //     _id: videoId
          //   }, {
          //     $set: {
          //       name: req.body.name,
          //       youtubeLink: req.body.youtubeLink,
          //       lastEditedAt: new Date(),
          //       subtitles: req.body.subtitles
          //     }
          //   })
          //   .exec()

          Word.updateOne({
              _id: word._id
            }, {
              $set: {
                lastEditedAt: new Date(),
                french: word.french,
                pronunciation: word.pronunciation,
                type: word.type,
              },
            })
            .exec(() => {
              inCb(null)
            })
        } else {
          console.log('Create new word here');
          console.log(word);
          let wordToAdd = new Word({
            hebrew: word.hebrew,
            french: word.french,
            pronunciation: word.pronunciation,
            type: word.type,
            createdAt: new Date(),
          })
          console.log(wordToAdd._id);
          wordToAdd.videosId.push(videoId);
          wordToAdd.videosId[0].subtitlesId.push(index);
          wordToAdd.save((err, word) => {
            inCb(null)
          });
        }
      })
    }, (err) => {
      cb(null);
    })
  }, (err) => console.log('Done'))

  Video
    .update({
      _id: videoId
    }, {
      $set: {
        name: req.body.name,
        youtubeLink: req.body.youtubeLink,
        lastEditedAt: new Date(),
        subtitles: req.body.subtitles
      }
    })
    .exec()
    .then(result => {
      res.status(200).json(result)

    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete a video
router.delete('/:id', (req, res, next) => {
  const videoId = req.params.id;
  console.log('delete ' + videoId);
  Video.remove({
      _id: videoId
    })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(error);
      res.status(500).json({
        error: err
      })
    });
});

module.exports = router;
