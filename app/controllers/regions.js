var _ = require('underscore'),
  fs = require('fs-extra'),
  common = require('../utils/common');

/*
function buildListe(sPath) {
  var oRegex = new RegExp("\\/[\\d]{2}.geojson", 'i');
  var oFileList = _.filter(fs.walkSync(sPath), function(item) {
    return item.match(oRegex);
  });

  var oListe = [];

  _.each(oFileList, function(sRegionFilePath) {
    var sMRCGDir = sRegionFilePath.replace(oRegex, '/mrcg/');

    var oRegionGeoJson = fs.readJsonSync(sRegionFilePath);
    var oProperties = oRegionGeoJson.properties || oRegionGeoJson.features[0].properties;

    oProperties.MRCG = [];

    _.each(fs.walkSync(sMRCGDir), function(sMRCGFilePath) {
      var oMRCGGeoJson = fs.readJsonSync(sMRCGFilePath);

      oProperties.MRCG.push(oMRCGGeoJson.properties || oMRCGGeoJson.features[0].properties);
    });

    oListe.push(oProperties);
  });

  return oListe;
}
*/

exports.getAllRegions = function(req, res, next) {
  var oFileList = _.filter(fs.walkSync(req.app.locals.dataPath), function(item) {
    return item.match(/\/[\d]{2}.geojson/gi);
  });

  var oFeatureCollection = common.buildFeatureCollection(oFileList);

  _.each(oFeatureCollection.features, function(oFeature) {
    var oProperties = oFeature.properties;
    var sPath = req.app.locals.dataPath + oProperties.code + '/mrcg';
    var oMRCGList = _.map(fs.walkSync(sPath), function(sFilePath) {
      var oMCGRProperties = fs.readJsonSync(sFilePath).properties;

      return {
        code: oMCGRProperties.code,
        nom: oMCGRProperties.nom,
        href: req.protocol + '://' + req.get('host') + req.baseUrl + '/regions/' + oProperties.code + '/mrcgs/' + sFilePath.match(/[\d]{3}/i)[0]
      };
    });

    oProperties.mrcgs = oMRCGList;
  });

  return res.status(200).json(oFeatureCollection);
};

exports.get = function(req, res, next) {
  var sPath = req.app.locals.dataPath + req.params.iCodeRegion + '/' + req.params.iCodeRegion + '.geojson';
  var sMRCGDirPath = req.app.locals.dataPath + req.params.iCodeRegion + '/mrcg';

  if (!fs.existsSync(sPath)) {
    return next({
      statusCode: 404,
      parameters: req.params,
      message: 'Aucune région trouvée.'
    });
  }

  var oGeoJson = fs.readJsonSync(sPath);
  var oMRCGList = _.map(fs.walkSync(sMRCGDirPath), function(sFilePath) {
    var oProperties = fs.readJsonSync(sFilePath).properties;

    return {
      code: oProperties.code,
      nom: oProperties.nom,
      href: req.protocol + '://' + req.get('host') + req.baseUrl + '/regions/' + req.params.iCodeRegion + '/mrcgs/' + sFilePath.match(/[\d]{3}/i)[0]
    };
  });

  oGeoJson.properties.mrcgs = oMRCGList;

  return res.status(200).json(oGeoJson);
};


exports.getWithMRCGs = function(req, res, next) {
  var sPath = req.app.locals.dataPath + req.params.iCodeRegion + '/' + req.params.iCodeRegion + '.geojson';
  var sMRCGDirPath = req.app.locals.dataPath + req.params.iCodeRegion + '/mrcg/';

  if (!fs.existsSync(sPath)) {
    return next({
      statusCode: 404,
      parameters: req.params,
      message: 'Aucune région trouvée.'
    });
  }

  var oFeatureCollection = common.buildFeatureCollection(fs.walkSync(sMRCGDirPath));

  return res.status(200).send(oFeatureCollection);
};