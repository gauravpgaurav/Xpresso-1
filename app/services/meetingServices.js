// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');

// configuration ===========================================
// config files
var db = require('../../config/db');

function meetingDAO() {
    
    this.connect = function(callback) {
        if (mongoose.connection.readyState == 0) {
            mongoose.connect(db.url);
        }
        mongoose.connection.on('connected', function(err, res){
            if (err) {
                callback(err, res);
            } else {
                console.log('MongoDb successfully connected !');
                callback(err, res);
            }
        });
        callback(null);
    }
    
    this.createMeeting = function(meetingData, callback) {
        meetingData._id = generateID();
        if(mongoose.connection.readyState == 1) {
            meetingData.save(function(err, meeting){
                if(err) {
                    callback(err, meeting);
                } else {
                    console.log('Meeting successfully created!');
                    callback(err, meeting);
                }
            }); 
        }
    }
    
    this.findMeeting = function(meetingModel, meetingQuery, callback) {
        if(mongoose.connection.readyState == 1) {
            meetingModel.find(meetingQuery, function(err, meeting) {
                if (err) {
                    callback(err, meeting); 
                } else {
                    console.log('Meeting successfully found!\n');
                    callback(err, meeting);
                }             
            });
        }
    }
    
    this.updateMeeting = function(meetingModel, meetingQuery, newMeetingData, callback) {
        if(mongoose.connection.readyState == 1) {
            meetingModel.findOneAndUpdate(meetingQuery, newMeetingData, function(err, meeting) {
                if (err) {
                    callback(err, meeting); 
                } else {
                    console.log('Meeting successfully updated!'); 
                    callback(err, meeting);
                }             
            });
        }
    }
    
    this.deleteMeeting = function(meetingModel, meetingQuery, callback) {
        if(mongoose.connection.readyState == 1) {
            meetingModel.remove(meetingQuery, function(err, meeting) {
                if (err) {
                    callback(err, meeting);
                } else {
                    console.log('Meeting successfully deleted!');
                    callback(err, meeting);
                }             
            });
        }
    }
}

function generateID() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (var i = 0; i < 6; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

module.exports.meetingDAO = meetingDAO;