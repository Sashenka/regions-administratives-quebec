# Régions administratives du Québec

*Répertoire des régions administratives du Québec et des MRC/TE en format GeoJSON.*

Cette application utilise les données ouvertes de plusieurs ministères du gouvernement du Québec pour fournir un point commun qui permettrait la récupération et l'exploitation des données. 
En ce moment les limites territoriales régions administratives du Québec et les MRCG sont fournis en format .SHP par le MERN, un format difficile à exploiter dans une application web sans plusieurs manipulations. 
Puisque ce sont des données qui ne change pas souvent, j'ai transformé les .SHP en GeoJSON et harmonisé leurs propriétés en plus de fournir un API facilement utilisable.

Les fichiers sont sauvegardés individuellement en format GeoJSON dans le répertoire [data/](data/).

## API

### Regions

#### Structure

```json
{
  "type": "Feature",
  "properties": {
    "type": "Région administrative",
    "code": "01",
    "nom": "Bas-Saint-Laurent",
    "reference": "BDGA5M",
    "version": "V2016-08",
    "population": 201091,
    "superficie": 22405,
    "plusGrandeVille": "Rimouski"
  },
  "geometry": {...}
}
```

#### GET /v1/regions

Retourne toutes les régions administratives dans un ```FeatureCollection```, une propriété ```mrcgs``` est ajouté à chaque ```Feature``` , elle contient une liste des MRCGs appartenant à la région.

```json
...
 "mrcgs": [
    {
      "code": "070",
      "nom": "La Matapédia",
      "href": "http://localhost:4000/v1/regions/01/mrcgs/070"
    }
  ]
...
```

#### GET /v1/regions/{iCodeRegion}

Retourne le ```Feature``` de la région dont le code est passé en paramètre. Les régions administratives sont codé de ```01``` à ```17```.

Exemple:
```
GET /v1/regions/01
```

#### GET /v1/regions/{iCodeRegion}/mrcgs

Retourne un ```FeatureCollection``` de toutes les MRCGs appartenant à la région dont le code est passé en paramètre.

Exemple:
```
GET /v1/regions/01/mrcgs
```

#### GET /v1/regions/{iCodeRegion}/mrcgs/{iCodeMRCG}

Retourne le ```Feature``` de la MRCG le code est passé en paramètre, elle doit appartenir à la région spécifié en paramètre.

Exemple:
```
GET /v1/regions/01/mrcgs/070
```

### Municipalités régionales de comté géographiques (MRCG)

#### Structure

```json
{
"type": "Feature",
"properties": {
    "type": "MRC - Municipalité régionale de comté",
    "code": "070",
    "nom": "La Matapédia",
    "region": {
      "code": "01",
      "nom": "Bas-Saint-Laurent"
    },
    "reference": "BDGA1M",
    "version": "V2016-08"
  },
  "geometry": {...}
}
```

#### GET /v1/mrcgs

Retourne un ```FeatureCollection``` de toutes les MRCGs de l'ensemble du Québec. Chaque ```Feature``` est une MRCG.

#### GET /v1/mrcgs/{iCodeMRCG}

Retourne le ```Feature``` de la MRCG dont le code est passé en paramètre.

Exemple:
```
GET /v1/mrcgs/070
```

## Liens utiles

* Données ouvertes du gouvernement du Québec - [[LIEN]](https://www.donneesquebec.ca/fr/)
* Base de données géographiques et administratives (MERN) - [[LIEN]](http://mern.gouv.qc.ca/territoire/portrait/portrait-donnees-mille.jsp)
* Répertoire des municipalités (MAMOT) - [[LIEN]](http://www.mamot.gouv.qc.ca/repertoire-des-municipalites/)
* Les spécifications du GeoJSON - [[LIEN]](http://geojson.org/geojson-spec.html)
* RFC 7946 - The GeoJSON Format - [[LIEN]](https://tools.ietf.org/html/rfc7946)

## License
The MIT License (MIT)

Copyright (c) 2016

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.