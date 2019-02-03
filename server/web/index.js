

_createRouter(require('../../server').app)

/**
 * @description Méthode permettant d'ajouter une version
 * @param {object} app - L'appli express
 *
 * @return {*} Le router avec tout ajouté
 * @private
 */
function _createRouter(app) {
  const router = require('./routes');
  //require('../core/auth.core')(router);
  app.use('/api/', router);

  // Ajout de route de test
  router.get('/test', function (req, res) {
    return res.status(200).send('back-end is up');
  });

  return router;
}
