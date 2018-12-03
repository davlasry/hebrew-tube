const router = require('express').Router();
const Session = require('../models/Session');
const mongoose = require('mongoose');


// GET all sessions
router.get('/', (req, res, next) => {
    Session
        .find()
        .sort('-createdAt')
        .exec()
        .then(sessions => {
            // console.log(sessions);
            res.status(200).json(sessions);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

// GET a session
router.get('/:sessionId', (req, res, next) => {
    const id = req.params.sessionId;
    // console.log(id);

    Session.findById(id)
        .exec()
        .then(session => {
            // console.log(session);
            res.status(200).json(session);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

});

// Create a session
router.post('/', (req, res, next) => {
    console.log(`Add session: ${req.body}`);
    const session = new Session({
        _id: new mongoose.Types.ObjectId(),
        createdAt: new Date(),
        lastEditedAt: new Date(),
        name: req.body.name,
        youtubeLink: req.body.youtubeLink,
    });
    session
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

// Edit a session
router.patch('/:sessionId', (req, res, next) => {
    const sessionId = req.body._id;
    console.log(req.body);
    console.log(req.body.youtubeLink);
    Session.update({ _id: sessionId }, {
            $set: {
                name: req.body.name,
                youtubeLink: req.body.youtubeLink,
                lastEditedAt: new Date()
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

// Delete a session
router.delete('/:id', (req, res, next) => {
    const sessionId = req.params.id;
    console.log('delete ' + sessionId);
    Session.remove({ _id: sessionId })
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