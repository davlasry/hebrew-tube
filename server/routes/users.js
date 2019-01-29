const router = require('express').Router();
const User = require('../models/User');

// GET users listing.
router.get('/', function(req, res, next) {
  User.find()
    .exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// GET Current user details
router.get('/current', function(req, res, next) {
  res.send(req.user);
});

// GET Current User details
router.get('/:id', function(req, res, next) {
  res.send(req.user);
});

// PATCH User details
router.patch('/:id', (req, res, next) => {
  // console.log(req.body);
  const id = req.body._id;
  User.update(
    {
      _id: id
    },
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName
      }
    }
  )
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PATCH Add word to favorite
router.patch('/addWord/:userId', (req, res, next) => {
  const userId = req.params.userId;
  const wordId = req.body._id;
  // console.log(wordId);
  User.update(
    {
      _id: userId
    },
    {
      $push: {
        words: wordId
      }
    }
  )
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PATCH Delete word from favorite
router.patch('/deleteWord/:userId', (req, res, next) => {
  const userId = req.params.userId;
  const wordsIds = req.body.wordsIds;
  // console.log(req.body);
  // console.log(wordsIds);
  User.update(
    {
      _id: userId
    },
    { $pull: { words: { $in: wordsIds } } }
  )
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET words for one user
router.get('/words/:userId', (req, res, next) => {
  const id = req.params.userId;
  // console.log(id !== 'undefined');
  if (id !== 'undefined') {
    User.findById(id)
      // .sort('-createdAt')
      .populate('words')
      .exec()
      .then(user => {
        // console.log(user);
        // console.log(user.words);
        res.status(200).json(user.words);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  } else {
    res.status(500).json({
      error: 'err'
    });
  }
});

module.exports = router;
