// server.js

// BASE SETUP
// =============================================================================

var express = require('express'),
  compression = require('compression');

var port = process.env.PORT || 8080,
  server = express();

// ROUTING
// =============================================================================

var router = express.Router();
require('./app/routes/regions')(router);
require('./app/routes/mrcgs')(router);

// MIDDLEWARES
// =============================================================================

server.set('json spaces', 2);
server.set('etag', 'strong');

server.locals.dataPath = __dirname + '/data/';

server.use(compression({
  threshold: 0
}));

server.get('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

server.use('/v1', router);

server.use(function(err, req, res, next) {
  res.status(err.statusCode || 500).json({
    statusCode: err.statusCode || 500,
    message: err.message,
    parameters: err.parameters,
    details: err.error
  });
});


// LISTENING
// =============================================================================
server.listen(port, function() {
  console.log('Server running on port %d', port);
});

module.exports = server;