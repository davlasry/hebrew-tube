const router = require('express').Router();

const Auth = require('../../core/auth.core');

const WordController = require('../controller/word.controller');

// Définition des routes
router.post('/', Auth.isConnected, Auth.isAdmin, WordController.createWord);
router.post(
  '/:wordID',
  Auth.isConnected,
  Auth.isAdmin,
  WordController.updateWord
);

router.get('/:wordID', Auth.isConnected, WordController.getWord);
router.get('/', Auth.isConnected, Auth.isAdmin, WordController.getAllWords);
router.get(
  '/search/:searchString',
  Auth.isConnected,
  Auth.isAdmin,
  WordController.searchWord
);

router.delete(
  '/:wordID',
  Auth.isConnected,
  Auth.isAdmin,
  WordController.deleteWord
);
router.delete('/', Auth.isConnected, Auth.isAdmin, WordController.deleteWords);

module.exports = router;
