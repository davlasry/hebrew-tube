const passport = require('passport');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require('../models/User');

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'MY_SECRET'
    },
    (jwtPayload, cb) => {
        console.log('jwtPayload: ', jwtPayload);

        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return User.findById(jwtPayload._id)
            .exec()
            .then(user => {
                console.log(user);
                return cb(null, user);
            })
            .catch(err => {
                console.log(err);
                return cb(err);
            });
    }
));