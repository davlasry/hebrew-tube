const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

//POST new user route - SIGN UP
router.post('/', (req, res, next) => {
    // console.log(req.body);

    // Create a user
    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    // console.log('newUser: ', newUser);

    return newUser.save()
        .then(() => {
            res.json(newUser.toAuthJSON())
        });
});

// POST login route
router.post('/login', (req, res, next) => {
    console.log(req.body);

    // Check if email is empty
    if (!req.body.email) {
        return res.status(422).json({
            success: false,
            msg: 'Email is required',
        });
    }
    // Check if password is empty
    if (!req.body.password) {
        return res.status(422).json({
            success: false,
            msg: 'Password is required',
        });
    }

    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            // console.log('User not found.');
            res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
        } else {
            // console.log(user);
            // check if password matches
            user.validPassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    user.token = user.generateJWT();
                    // return the information including token as JSON
                    return res.json(user.toAuthJSON());
                } else {
                    res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
                }
            });
        }
    });
});

module.exports = router;