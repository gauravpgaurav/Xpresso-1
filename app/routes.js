var watsonAuth = require('./services/watson_auth.js');
var searchProxy = require('./services/search_proxy.js');
var userDAO = require('./services/userServices').userDAO;
var meetingDAO = require('./services/meetingServices').meetingDAO;
var users = new userDAO();
var meetings = new meetingDAO();
var meetingModel = require('./models/meeting');
var userModel = require('./models/user');

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
    
  app.get('/api/db/connection', function(req, res) {
    meetings.connect(function(err, conn_result){
        if (err) {
            console.log('Error establishing connection: ', err);
            res.status(500).send('Error establishing connection');
            return;
        }
        res.send(conn_result);
    });
  })
    
  // user model routes
  app.post('/api/user/', function(req, res) {
    users.connect(function(conn_result){
        var userData = new userModel(req.body);
        users.createUser(userData, function(err, user){
            if (err) {
                console.log('Error creating user: ', err);
                res.status(500).send('Error creating user');
                return;
            }
            res.send(JSON.stringify(user));
        });
    });
  })

  app.get('/api/user/', function(req, res) {
      var query = JSON.parse(req.headers.query);
      users.connect(function(conn_result){
      users.findUser(userModel, query, function(err, user){
            if (err) {
                console.log('Error retrieving user: ', err);
                res.status(500).send('Error retrieving user');
                return;
            }
            res.send(JSON.stringify(user));
        });
    });
  })
    
  app.put('/api/user/', function(req, res) {
    users.connect(function(conn_result){
      users.updateUser(userModel, req.body.query, req.body.newData, function(err, user){
            if (err) {
                console.log('Error updating user: ', err);
                res.status(500).send('Error updating user');
                return;
            }
            res.send(JSON.stringify(user));
        });
    });
  })
    
  app.delete('/api/user/', function(req, res) {
    users.connect(function(conn_result){
      users.deleteUser(userModel, req.body, function(err, user){
            if (err) {
                console.log('Error deleting user: ', err);
                res.status(500).send('Error deleting user');
                return;
            }
            res.send(JSON.stringify(user));
        });
    });
  })
   
  // meeting model routes
  app.post('/api/meeting/', function(req, res) {
      meetings.connect(function(conn_result){
          var meetingData = new meetingModel(req.body);
          meetings.createMeeting(meetingData, function(err, meeting){
            if (err) {
                console.log('Error creating meeting: ', err);
                res.status(500).send('Error creating meeting');
                return;
            }
            res.send(JSON.stringify(meeting));
        });
      });
  })
    
  app.get('/api/meeting/', function(req, res) {
      var query = JSON.parse(req.headers.query);
      meetings.connect(function(conn_result){
          meetings.findMeeting(meetingModel, query, function(err, meeting){
            if (err) {
                console.log('Error retrieving meeting: ', err);
                res.status(500).send('Error retrieving meeting');
                return;
            }
            res.send(JSON.stringify(meeting));
        });
      });
  })
    
  app.put('/api/meeting/', function(req, res) {
    meetings.connect(function(conn_result){
      meetings.updateMeeting(meetingModel, req.body.query, req.body.newData, function(err, meeting){
            if (err) {
                console.log('Error updating meeting: ', err);
                res.status(500).send('Error updating meeting');
                return;
            }
            res.send(JSON.stringify(meeting));
        });
    });
  })
    
  app.delete('/api/meeting/', function(req, res) {
    meetings.connect(function(conn_result){
      meetings.deleteMeeting(meetingModel, req.body, function(err, meeting){
            if (err) {
                console.log('Error deleting meeting: ', err);
                res.status(500).send('Error deleting meetings');
                return;
            }
            res.send(JSON.stringify(meeting));
        });
    });
  })
    
  app.put('/api/meeting/insert', function(req, res) {
      console.log('req.body.field', req.body.field);
    meetings.connect(function(conn_result){
        var field = String(req.body.field);
        console.log('req.body.newData', req.body.newData);
        console.log('JSON req.body.newData', JSON.stringify(req.body.newData));
      meetings.insertMeeting(meetingModel, req.body.query, field, JSON.stringify(req.body.newData), function(err, meeting){
            if (err) {
                console.log('Error updating meeting: ', err);
                res.status(500).send('Error updating meeting');
                return;
            }
            res.send(JSON.stringify(meeting));
        });
    });
  })
    
  // frontend routes =========================================================
  // route to handle all angular requests
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
  });

};
