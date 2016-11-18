var Regions = require('../controllers/regions'),
  Mrcgs = require('../controllers/mrcgs');

module.exports = function(router) {
  /*
  router
    .route('/regions/liste')
    .get(Regions.getListe);
  */

  router
    .route('/regions')
    .get(Regions.getAllRegions);

  router
    .route('/regions/:iCodeRegion')
    .get(Regions.get);

  router
    .route('/regions/:iCodeRegion/mrcgs')
    .get(Regions.getWithMRCGs);

  router
    .route('/regions/:iCodeRegion/mrcgs/:iCodeMRCG')
    .get(Mrcgs.get);

};