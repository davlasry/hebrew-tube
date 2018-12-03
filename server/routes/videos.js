const router = require('express').Router();
const Video = require('../models/Video');
const mongoose = require('mongoose');


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
            // console.log(video);
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
            console.log(result);
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
    console.log(videoId);
    console.log(req.body.youtubeLink);
    Video.update({ _id: videoId }, {
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
    Video.remove({ _id: videoId })
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