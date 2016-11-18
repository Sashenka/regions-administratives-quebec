var _ = require('underscore'),
  fs = require('fs-extra');

exports.buildFeatureCollection = function(oFileList) {
  var oFeatureCollection = {
    "type": "FeatureCollection",
    "features": []
  };

  _.each(oFileList, function(sFilePath) {
    var oGeoJson = fs.readJsonSync(sFilePath);
    oFeatureCollection.features.push(oGeoJson);
  });

  return oFeatureCollection;
};