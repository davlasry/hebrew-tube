
const router = require('express').Router();


const Auth = require('../../core/auth.core');

const UserController = require('../controller/user.controller');

// Définition des routes
router.post('/', UserController.createUser);
router.post('/:userID', Auth.isConnected, UserController.updateUser);

router.get('/:userID', Auth.isConnected, UserController.getUser);
router.get('/', Auth.isConnected, Auth.isAdmin, UserController.getAllUsers);


router.delete('/:userID', Auth.isConnected, Auth.isAdmin, UserController.deleteUser);




module.exports = router;

