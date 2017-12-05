var watson = require('watson-developer-cloud');
var vcapServices = require('vcap_services');
var watson_conf = require('../../config/watson.js');
var meetingDAO = require('./meetingServices').meetingDAO;
var users = new userDAO();
var meetings = new meetingDAO();
var meetingModel = require('../../models/meeting');

var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
    'username': watson_conf.nlu.username,
    'password': watson_conf.nlu.password,
    'version_date':watson_conf.nlu.version_date
});

function getKeywords(transcript, callback) {
  var parameters = {
  	'text': transcript ,
    'features': {
        'entities': {
            'emotion': true,
            'sentiment': true,
            'limit': 2
        	},
        'keywords': {
            'emotion': true,
            'sentiment': true,
            'limit': 2
    	    }
	    }
	}

	natural_language_understanding.analyze(parameters, function(err, response) {
	    if (err) {
    	    callback(err,response);
	    }
    	else {
            var search_key = "";
    		for(var i=0;i<response.entities.length;i++)
    		{

    			search_key=search_key + response.entities[i].text + " ";
        		
    		}
            callback(err, search_key);
    	}
	});

}

function processTranscript(query, callback) {
    meetings.connect(function(conn_result){
          meetings.findMeeting(meetingModel, query, function(err, result){
            if (err) {
                console.log('Error retrieving meeting: ', err);
                callback(err, result);
            }
              if (result.Transcription != null) {
                  var completeTranscription = "";
                  var transcriptionArray = result.Transcription;
                  transcriptionArray.forEach(function(transcript){
                     completeTranscription += (transcript.Text + " "); 
                  });
                  
                  getKeywords(completeTranscription, function(err, response)) {
                              if (err) {
                      console.log('Error retrieving keyword: ', err);
                      callback(err, response);
                  } else {
                      callback(err, response);
                  }
              } 
          }
        });
      });
    
}
module.exports.processTranscript = processTranscript;
