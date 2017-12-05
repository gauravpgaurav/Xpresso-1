var watson = require('watson-developer-cloud');
var vcapServices = require('vcap_services');
var watson_conf = require('../../config/watson.js');

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
module.exports.getKeywords = getKeywords;
