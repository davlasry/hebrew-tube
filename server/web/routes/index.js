// On créé un router
const router = require('express').Router();

// On y ajoute les route
router.use('/user', require('./user.route'));
router.use('/auth', require('./auth.route'));
router.use('/word', require('./word.route'));
router.use('/video', require('./video.route'));
router.use('/favorite', require('./favorite.route'));
router.use('/context', require('./context.route'));


// On export le router pour l'ajouter à l'app
module.exports = router;