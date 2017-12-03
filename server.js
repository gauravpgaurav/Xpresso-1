// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================
	
// config files
var db = require('./config/db');

var port = process.env.PORT || 8080; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app
console.log(db.url);

var userDAO = require('./app/services/userServices').userDAO;
var users = new userDAO();
var meetingDAO = require('./app/services/meetingServices').meetingDAO;
var meetings = new meetingDAO();

var model = require('./app/models/User');
var data = new model({"firstName": "Gaurav", "lastName":"Pant", "empId":"12345", "password": "qwerty", "meetingIds":["M121", "M123"]});

var query = {"empId":"12345"};
var newData = {"password":"abcd"};

//users.createUser(data);
//users.connect(function(conn_result){
//      users.findUser(model, query, function(result){
//            console.log(result);
//        });
//});
//users.connect(function(conn_result){
//    users.deleteUser(model, query, function(result){
//           console.log(result);
//           console.log(query);
//        });
//});
//users.updateUser(model, query, newData);

var meetingmodel = require('./app/models/meeting');
var meetingdata = new meetingmodel({
	"Date" : "hh:mm am",
	"Start_time": "10:00 am",
	"End_time": "12:00 pm",
	"Duration": "2 Hours",
	"Topics": [
        { "Serial_No": "1",
				"Topic_Name": "Tesla" },
        { "Serial_No": "2",
				"Topic_Name": "Porsche" },
        { "Serial_No": "3",
				"Topic_Name": "Ford" }
    ],
    "Undiscussed_Topics": ["1","2","3"],
    "Transcription": [{
        "Timestamps":[12.24, 13.32],
        "Text": "one two three",
        "Result_Index": 2
    }, {
        "Timestamps":[19.1, 19.59],
        "Text": "testing",
        "Result_Index": 3
    }],
    "Speakers": [{
        "Timestamps":[12.24, 13.32],
        "Speaker_Index": 0
    }]
});

console.log(meetingdata);

meetings.connect(function(conn_result){
    meetings.createMeeting(meetingdata, function(result){
       console.log(result);
    });
});

//var query2 = {"Start_time" : "10:00 am"};
//meetings.connect(function(conn_result){
//    meetings.deleteMeeting(meetingmodel, query2, function(result){
//       console.log(result);
//       console.log(query2);
//    });
//});
