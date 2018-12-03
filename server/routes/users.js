const router = require('express').Router();
const User = require('../models/User');

// GET users listing.
router.get('/', function(req, res, next) {
    User
        .find()
        .exec()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
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
    console.log(req.body);
    const id = req.body._id;
    User.update({ _id: id }, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
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

module.exports = router;