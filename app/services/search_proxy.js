var request = require('request');
var cheerio = require('cheerio');

function getBingResult(query, callback) {
  var bing = "http://www.bing.com";
  var query = "?q=" + query;
  request(bing + query, function(err, response, body) {
    if(response && response.statusCode != 200) {
      callback(err, response, {});
    } else {
      var out = scrapeFirstResultOfBingPage(body);
      callback(err, response, out);
    }
  });
}

function scrapeFirstResultOfBingPage(html) {
  var $ = cheerio.load(html);
  var out = {};
  out.link = $('#b_results .b_algo a').attr('href');
  out.title = $('#b_results .b_algo a').html();
  out.desc = $('#b_results .b_algo .b_caption p').html();

  return out;
}

module.exports.getBingResult = getBingResult;
