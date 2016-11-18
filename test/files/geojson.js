var should = require('chai').should(),
  _ = require('underscore'),
  fs = require('fs-extra');
  

var oFilesPath = fs.walkSync('./data');

describe('Fichiers GeoJSON', function() {
_.each(oFilesPath, function(sFilePath){
  var oGeoJson = fs.readJsonSync(sFilePath);
  
  describe('Test du fichier GeoJSON: ' + sFilePath, function() {
    
    it('devrait avoir les propriétés [type, properties, geomety] ', function() {
      oGeoJson.should.have.all.keys('type', 'properties', 'geometry');
    });
    
    it('devrait être du type "Feature"', function() {
      oGeoJson.type.should.be.equal('Feature');
    });
    
    if(oGeoJson.properties.type == 'Région administrative'){
      
      it('Région - Le membre "properties" devrait avoir les propriétés [type, code, nom, reference, version, population, superficie, plusGrandeVille]', function() {
        oGeoJson.properties.should.have.all.keys('type', 'code', 'nom','reference','version', 'superficie', 'population', 'plusGrandeVille');
      });
      
    } else {
      
      it('MRCG - Le membre "properties" devrait avoir les propriétés [type, code, nom, reference, region , version]', function() {
        oGeoJson.properties.should.have.all.keys('type', 'code', 'nom','reference', 'region', 'version');
      });
      
    }
    
  });
});
});