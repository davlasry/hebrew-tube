// Création d'un router pour la partie /analytics
const router = require('express').Router();

const Auth = require('../../core/auth.core');



const AuthController = require('../controller/auth.controller');

// Définition des routes
router.post('/login', AuthController.login);

router.get('/logout', AuthController.logout);


module.exports = router;

