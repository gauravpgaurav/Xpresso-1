// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Meeting', {
	Date : {type : String, default: ''},
	Start_time: {type: String},
	End_time: {type: String},
	Duration: {type:String},
	Topics: [{ Serial_No: String,
				Topic_Name: String }]
});