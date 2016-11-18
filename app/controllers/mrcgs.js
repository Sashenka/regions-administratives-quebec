var _ = require('underscore'),
  fs = require('fs-extra'),
  common = require('../utils/common');

exports.getAllMRCGs = function(req, res, next) {
  var oFileList = _.filter(fs.walkSync(req.app.locals.dataPath), function(item) {
    return item.match(/\/[\d]{3}.geojson/gi);
  });

  var oFeatureCollection = common.buildFeatureCollection(oFileList);

  return res.status(200).json(oFeatureCollection);
};

exports.get = function(req, res, next) {
  var sFilePath;

  if (req.params.iCodeRegion) {
    sFilePath = req.app.locals.dataPath + req.params.iCodeRegion + '/mrcg/' + req.params.iCodeMRCG + '.geojson';
  } else {
    var oRegex = new RegExp("\\/" + req.params.iCodeMRCG + ".geojson", 'i');

    sFilePath = _.filter(fs.walkSync(req.app.locals.dataPath), function(item) {
      return item.match(oRegex);
    })[0];
  }

  if (!fs.existsSync(sFilePath)) {
    return next({
      statusCode: 404,
      parameters: req.params,
      message: 'Aucune région trouvée.'
    });
  }

  return res.status(200).json(fs.readJsonSync(sFilePath));
};