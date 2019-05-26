const router = require('express').Router();

const Auth = require('../../core/auth.core');

const WordController = require('../controller/word.controller');

const searchInMorfix = require('../../scrapping/morfix');

// Définition des routes
router.post(
  '/deleteMany',
  Auth.isConnected,
  Auth.isAdmin,
  WordController.deleteWords
);

// Search Word translation on Morfix
router.get('/search/:word', (req, res, next) => {
  const word = req.params.word;
  console.log(word);
  searchInMorfix(word).then(result => {
    console.log('result: ', result);
    res.status(200).json(result);
  });
});
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

module.exports = router;
