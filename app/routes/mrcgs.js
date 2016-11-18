var Mrcgs = require('../controllers/mrcgs');

module.exports = function(router) {

  router
    .route('/mrcgs')
    .get(Mrcgs.getAllMRCGs);

  router
    .route('/mrcgs/:iCodeMRCG')
    .get(Mrcgs.get);

};