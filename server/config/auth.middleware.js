const jwt = require('jsonwebtoken');

function checkIfUserIsAuthor(req, res, next) {
    const reqRecipeAuthorId = req.body.author;
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, 'MY_SECRET', function(err, decoded) {
        if (err) {
            return next(err);
        } else {
            const reqUserId = decoded._id;
            console.log(reqUserId);
            console.log(reqRecipeAuthorId);
            if (reqUserId === reqRecipeAuthorId || decoded.role === 'admin') {
                return next();
            } else {
                const error = new Error('Not authorized! Go back!');
                error.status = 400;
                return next(error);
            }
        }
    })

}

module.exports = checkIfUserIsAuthor;