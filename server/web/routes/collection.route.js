const router = require('express').Router();

const Auth = require('../../core/auth.core');

const Collectionontroller = require('../controller/collection.controller');

// Définition des routes
router.put(
  '/:collectionID',
  Auth.isConnected,
  Auth.isAdmin,
  Collectionontroller.addWordToCollection
);

router.post(
  '/',
  Auth.isConnected,
  Auth.isAdmin,
  Collectionontroller.createCollection
);
router.post(
  '/:collectionID',
  Auth.isConnected,
  Auth.isAdmin,
  Collectionontroller.updateCollection
);

router.get(
  '/:collectionID',
  Auth.isConnected,
  Collectionontroller.getCollection
);
router.get(
  '/',
  Auth.isConnected,
  Auth.isAdmin,
  Collectionontroller.getAllCollections
);

router.delete(
  '/:collectionID',
  Auth.isConnected,
  Auth.isAdmin,
  Collectionontroller.deleteCollection
);
router.delete(
  '/',
  Auth.isConnected,
  Auth.isAdmin,
  Collectionontroller.deleteCollection
);

module.exports = router;
