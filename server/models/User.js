var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

var userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
    },
    firstName: String,
    lastName: String,
    password: String,
    role: String
});

userSchema.pre('save', function(next) {
    const user = this;
    if (user.isModified('password') || user.isNew) {
        // console.log(user);
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                return next(err);
            }
            // console.log(user.password);
            bcrypt.hash(user.password, salt, null, function(err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

userSchema.methods.validPassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, res) {
        if (err) console.log('error: ', err);
        // console.log('bcrypt compare res: ', res);
        cb(null, res);
    });
};

userSchema.methods.generateJWT = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
            _id: this._id,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            role: this.role,
            exp: parseInt(expiry.getTime() / 1000),
        },
        "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

userSchema.methods.toAuthJSON = function() {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT(),
    };
};

const User = mongoose.model('User', userSchema);

module.exports = User;