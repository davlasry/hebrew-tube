const router = require('express').Router();
const Word = require('../models/Word');
const mongoose = require('mongoose');
const checkIfUserIsAuthor = require('../config/auth.middleware');
const searchInMorfix = require('../scrapping/morfix');

//require multer for the file uploads
var multer = require('multer');
// set the directory for the uploads to the uploaded to
var DIR = './uploads/';
//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
var upload = multer({ dest: DIR }).single('photo');

// GET all words
router.get('/', (req, res, next) => {
    Word
        .find()
        .populate('definitions.sessions.session', 'name')
        .sort('-createdAt')
        .exec()
        .then(words => {
            // console.log(recipes);
            res.status(200).json(words);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

// Get word by Id
router.get('/:wordId', (req, res, next) => {
    const id = req.params.wordId;
    console.log(id);

    Word.findById(id)
        .exec()
        .then(word => {
            // console.log(word);
            res.status(200).json(word);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

});

// Search Word translation on Morfix
router.get('/search/:word', (req, res, next) => {
    const word = req.params.word;
    console.log(word);
    searchInMorfix(word).then(result => {
        console.log("result: ", result)
        res.status(200).json(result);
    });
});

// Find all words for a specific session
router.get('/session-words/:sessionId', (req, res, next) => {
    const sessionId = req.params.sessionId;
    console.log(sessionId);
    Word.find({ 'definitions.sessions.session': sessionId })
        .exec()
        .then(words => {
            // return only the specific session in word.sessions
            // words = words.map(word => {
            //     word.definitions.sessions = word.sessions.filter(session => {
            //         return session.session == sessionId;
            //     });
            //     return word;
            // })
            res.status(200).json(words);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

// Add new word
router.post('/', (req, res, next) => {
    console.log(`Add word: ${req.body}`);

    // Check if word already exist
    Word.findOne({ hebrew: req.body.hebrew }, function(err, word) {
        if (err) {
            console.log(err);
        }

        //If word was found, that means the word entered matched an existing word
        if (word) {
            console.log('Word already exist in DB');
            // If word already exist in DB, update word
            Word.update({ _id: word._id }, {
                    $set: {
                        lastEditedAt: new Date()
                    },
                    $push: { definitions: req.body.definition }
                })
                .exec()
                .then(result => {
                    res.status(200).json(result)

                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json(err);
                });

        } else {
            // If word is not in DB, create new word
            const word = new Word({
                _id: new mongoose.Types.ObjectId(),
                hebrew: req.body.hebrew,
                source: req.body.source,
                createdAt: new Date(),
                lastEditedAt: new Date(),
            });
            word.definitions.push(...req.body.definitions);
            word
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
        }
    });
});

// Edit a word
router.patch('/:id', checkIfUserIsAuthor, (req, res, next) => {
    console.log(req.body);
    const id = req.body._id;
    Word.update({ _id: id }, {
            $set: {
                name: req.body.name,
                category: req.body.category,
                ingredients: req.body.ingredients,
                steps: req.body.steps,
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

// Delete a word
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    console.log('delete ' + id);
    Word.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

// Delete many words
router.put('/deleteMany', (req, res, next) => {
    const ids = req.body;
    console.log(req.body);
    Word.deleteMany({ _id: { $in: ids } })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
})

// Search a word in Morfix
router.post('/search', (req, res, next) => {
    console.log(req.body);
    const searchQuery = req.body.searchInput;
    console.log(searchQuery);
    Recipe
        .find({ $text: { $search: searchQuery } }, { score: { $meta: "textScore" } })
        .exec(function(err, recipes) {
            if (err) {
                res.status(500).json({
                    error: err
                })
            }
            // console.log(recipes);
            res.status(200).json(recipes);
        });
})

// // GET words for one user
// router.get('/user/:authorId', (req, res, next) => {
//     const id = req.params.authorId;
//     console.log(id);
//     Words
//         .find({ author: id })
//         .sort('-createdAt')
//         .exec()
//         .then(recipes => {
//             // console.log(recipes);
//             res.status(200).json(recipes);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             })
//         });
// });

module.exports = router;