// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');

// configuration ===========================================
// config files
var db = require('../../config/db');

function meetingDAO() {
    
    this.connect = function() {
        mongoose.connect(db.url);
        mongoose.connection.on('connected', function(){
            console.log('MongoDb successfully connected !');
        });
    }
    
    this.disconnect = function() {
        mongoose.disconnect(db.url);
        mongoose.connection.off('connected', function(){
            console.log('MongoDb successfully disconnected !');
        });
    }
    
    this.createMeeting = function(meetingData) {
        this.connect();
        mongoose.connection.on('connected', function(){
            meetingData.save(function(err){
                if(err) {
                    throw err;
                } else {
                    console.log('Meeting successfully created!');
                }
            }); 
        });
    }
    
    this.findMeeting = function(meetingModel, meetingQuery) {
        this.connect();
        mongoose.connection.on('connected', function(){
            meetingModel.find(meetingQuery, function(err, Meeting) {
                if (err) {
                    throw err; 
                } else {
                    console.log('Meeting successfully found!\n', Meeting); 
                }             
            });
        });
    }
    
    this.updateMeeting = function(meetingModel, meetingQuery, newMeetingData) {
        this.connect();
        mongoose.connection.on('connected', function(){
            meetingModel.findOneAndUpdate(meetingQuery, newMeetingData, function(err) {
                if (err) {
                    throw err; 
                } else {
                    console.log('Meeting successfully updated!');   
                }             
            });
        });
    }
    
    this.deleteMeeting = function(meetingModel, meetingQuery) {
        this.connect();
        mongoose.connection.on('connected', function(){
            meetingModel.remove(meetingQuery, function(err) {
                if (err) {
                    throw err; 
                } else {
                    console.log('Meeting successfully deleted!');   
                }             
            });
        });
    }
}


module.exports.meetingDAO = meetingDAO;