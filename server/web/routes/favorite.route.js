
const router = require('express').Router();


const Auth = require('../../core/auth.core');

const FavoriteController = require('../controller/favorite.controller');

// Définition des routes
router.post('/word', Auth.isConnected, FavoriteController.createFavoriteWord);
router.get('/word', Auth.isConnected, FavoriteController.getAllFavoriteWordsForUser);
router.delete('/word/:favoriteWordID', Auth.isConnected, FavoriteController.deleteFavoriteWord);
router.delete('/word/', Auth.isConnected, FavoriteController.deleteMultipleFavoriteWords);


router.post('/video', Auth.isConnected, FavoriteController.createFavoriteVideo);
router.get('/video', Auth.isConnected, FavoriteController.getAllFavoriteVideosForUser);
router.delete('/video/', Auth.isConnected, FavoriteController.deleteMultipleFavoriteVideos);


module.exports = router;

