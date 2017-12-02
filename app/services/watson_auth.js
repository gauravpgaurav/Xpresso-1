var watson = require('watson-developer-cloud');
var vcapServices = require('vcap_services');
var watson_conf = require('../../config/watson.js');

var sttAuthService = new watson.AuthorizationV1(
    Object.assign(
    {
      username: watson_conf.speech_to_text.username,
      password: watson_conf.speech_to_text.password
    },
    vcapServices.getCredentials('speech_to_text')
  )
);

function getToken(callback) {
  sttAuthService.getToken(
    {
      url: watson.SpeechToTextV1.URL
    },
    function (err, token) {
      callback(err, token);
    }
  );
};

module.exports.getToken = getToken;
