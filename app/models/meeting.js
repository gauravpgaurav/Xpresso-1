// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Meeting', {
    _id: {type: String, unique: true},
	Date : {type : String, default: ''},
	Start_time: {type: String},
	End_time: {type: String},
	Duration: {type:String},
	Topics: [
        { Serial_No: String,
				Topic_Name: String }
    ],Undiscussed_Topics: [
        { type: String}
    ],Discussed_Topics: [
        { type: String}
    ],
    Transcription: [{
        Timestamps:[{type: Number}, {type: Number}],
        Text: {type: String},
        Result_Index: {type: Number}
    }],
    Speakers: [{
        Timestamps:[{type: Number}, {type: Number}],
        Speaker_Index: {type: Number}
    }]
});