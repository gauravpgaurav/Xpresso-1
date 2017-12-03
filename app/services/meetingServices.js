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
                callback(err);
            } else {
                console.log('MongoDb successfully connected !');
                callback(res);
            }
        });
        callback(null);
    }
    
    this.createMeeting = function(meetingData, callback) {
        mongoose.connection.on('connected', function(){
            meetingData.save(function(err, meeting){
                if(err) {
                    callback(err);
                } else {
                    console.log('Meeting successfully created!');
                    callback(meeting);
                }
            }); 
        });
    }
    
    this.findMeeting = function(meetingModel, meetingQuery, callback) {
        mongoose.connection.on('connected', function(){
            meetingModel.find(meetingQuery, function(err, meeting) {
                if (err) {
                    callback(err); 
                } else {
                    console.log('Meeting successfully found!\n');
                    callback(meeting);
                }             
            });
        });
    }
    
    this.updateMeeting = function(meetingModel, meetingQuery, newMeetingData, callback) {
        mongoose.connection.on('connected', function(){
            meetingModel.findOneAndUpdate(meetingQuery, newMeetingData, function(err, meeting) {
                if (err) {
                    callback(err); 
                } else {
                    console.log('Meeting successfully updated!'); 
                    callback(meeting);
                }             
            });
        });
    }
    
    this.deleteMeeting = function(meetingModel, meetingQuery, callback) {
        mongoose.connection.on('connected', function(){
            meetingModel.remove(meetingQuery, function(err, meeting) {
                if (err) {
                    callback(err);
                } else {
                    console.log('Meeting successfully deleted!');
                    callback(meeting);
                }             
            });
        });
    }
}


module.exports.meetingDAO = meetingDAO;