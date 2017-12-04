var watson = require('watson-developer-cloud');
var vcapServices = require('vcap_services');
var watson_conf = require('../../config/watson.js');

var sttAuthService = new watson.AuthorizationV1(
    Object.assign(
    {
      username: watson_conf.nlu.username,
      password: watson_conf.nlu.password
    },
    vcapServices.getCredentials('nlu')
  )
);

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
    	    callback(err);
	    }
    	else {
    			for(int i=0;i<response.entities.length();i++)
    		{
    			var search_key=search_key.concat(respone.entities.text[i]);
        		callback(err, response);
    		}
    	}
	});

}

