var watsonAuth = require('./services/watson_auth.js');
var searchProxy = require('./services/search_proxy.js');

module.exports = function(app) {

  // server routes ===========================================================
  // handle things like api calls
  app.get('/api/search', function(req, res) {
    searchProxy.getBingResult(req.query.q, function(err, response, out) {
      if (response && response.statusCode != 200) {
        console.log('Error retrieving results: ', err);
        res.status(500).send('Error retrieving results');
        return;
      }
      res.send(out);
    })
  })

  // authentication routes
  app.get('/api/speech-to-text/token', function(req, res) {
    watsonAuth.getToken(function(err, token) {
      if (err) {
        console.log('Error retrieving token: ', err);
        res.status(500).send('Error retrieving token');
        return;
      }
      res.send(token);
    });
  })

  // frontend routes =========================================================
  // route to handle all angular requests
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
  });

};
