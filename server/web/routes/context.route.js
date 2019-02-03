
const router = require('express').Router();


const Auth = require('../../core/auth.core');

const ContextController = require('../controller/context.controller');

// Définition des routes
router.get('/:wordID', Auth.isConnected, ContextController.getAllContextsForWord);



module.exports = router;

