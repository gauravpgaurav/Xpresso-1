// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

var watsonnlu = require('./app/services/watson_nlu.js');
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

var text = "Stay Calm, Dont Panic CEO Salil Parekh Takes Over An Infosys In Tumult. Salil Parekh will have to revive growth and restore employee confidence in troubled Infosys. Salil Parekh overcame long odds to become Infosys Ltd.s choice for its next chief executive officer. He now faces at least as challenging a task in getting the iconic Indian outsourcing company back on track.The low-key, 53-year-old from  Capgemini SE was named to the helm of Infosys Saturday, beating out a field of internal candidates and former executives who had originally been considered front runners. Parekh will leave Capgeminis executive board to start his five-year term at Asias second-largest outsourcer in the beginning of 2018.Hes taking over a company in tumult. His predecessor, Vishal Sikka, quit after he came under intense fire from the companys founders who objected to his strategy and compensation. Parekh will have to balance maintaining a genial relationship with strong-willed founders such as N R Narayana Murthy with taking bold steps to revive growth and restore employee confidence. Infosys is struggling to move beyond its traditional low-margin outsourcing business into more profitable markets such as digital services.Salil brings hugely relevant experience to Infosys, Nandan Nilekani, another founder who returned as chairman when Sikka left in August, said in an interview. He will fit into our culture and, at the same time, bing about the required transformation.The spat pitted the former CEO and the companys board against the founders, and took a toll on the 200,000-person, $10 billion-in-revenue company. Sikka quit over what he described as a continuous drumbeat of allegations over management and corporate governance. The share price tumbled, wiping out billions of dollars investor wealth.After the drama that Chairman Nilekani described as reaching reality TV like proportions, the quiet Parekh may be an apt choice. A few years ago, Parekh gave a presentation to the industry trade body Nasscom. His talk, after recapping the sectors challenges, included a slide that read: Stay calm, dont panic.Parekh is unassuming to the point that his LinkedIn profile simply says hes a Business Manager at Capgemini. Still, he has a blend of Ivy League credentials and operational experience that appealed to the board. He earned a degree as an aeronautical engineer from one of Indias premier engineer schools, Indian Institute of Technology in Mumbai --also Nilekanis alma mater-- and has a masters degree in computer science from Cornell University.";

watsonnlu.getKeywords(text,function(err,response){
      if (err) {
        console.log('Error retrieving keyword: ', err);
        return;
      }
      //consol.log("search_key",response);
    });

exports = module.exports = app; 	
					// expose app
