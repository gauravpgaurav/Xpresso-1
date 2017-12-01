// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');

// configuration ===========================================
// config files
var db = require('../../config/db');

function userDAO() {
    
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
    
    this.createUser = function(userData) {
        this.connect();
        mongoose.connection.on('connected', function(){
            userData.save(function(err){
                if(err) {
                    throw err;
                } else {
                    console.log('User successfully created!');
                }
            }); 
        });
    }
    
    this.findUser = function(userModel, userQuery) {
        this.connect();
        mongoose.connection.on('connected', function(){
            userModel.find(userQuery, function(err, user) {
                if (err) {
                    throw err; 
                } else {
                    console.log('User successfully found!\n', user); 
                }             
            });
        });
    }
    
    this.updateUser = function(userModel, userQuery, newUserData) {
        this.connect();
        mongoose.connection.on('connected', function(){
            userModel.findOneAndUpdate(userQuery, newUserData, function(err) {
                if (err) {
                    throw err; 
                } else {
                    console.log('User successfully updated!');   
                }             
            });
        });
    }
    
    this.deleteUser = function(userModel, userQuery) {
        this.connect();
        mongoose.connection.on('connected', function(){
            userModel.remove(userQuery, function(err) {
                if (err) {
                    throw err; 
                } else {
                    console.log('User successfully deleted!');   
                }             
            });
        });
    }
}


module.exports.userDAO = userDAO;