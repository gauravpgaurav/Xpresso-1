var watsonAuth = require('./services/watson_auth.js');

module.exports = function(app) {

  // server routes ===========================================================
  // handle things like api calls
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