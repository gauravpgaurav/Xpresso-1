// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');

// configuration ===========================================
// config files
var db = require('../../config/db');

function userDAO() {
    
    this.connect = function(callback) {
        mongoose.connect(db.url);
        mongoose.connection.on('connected', function(err, res){
            if (err) {
                callback(err);
            } else {
                console.log('MongoDb successfully connected !');
                callback(res);
            }
        });
        callback();
    }
    
    this.createUser = function(userData, callback) {
        mongoose.connection.on('connected', function(){
            userData.save(function(err){
                if(err) {
                    callback(err);
                } else {
                    console.log('User successfully created!');
                    callback(null);
                }
            }); 
        });
    }
    
    this.findUser = function(userModel, userQuery, callback) {
        mongoose.connection.on('connected', function(){
            userModel.find(userQuery, function(err, user) {
                if (err) {
                    callback(err); 
                } else {
                    console.log('User successfully found!\n');
                    callback(user);
                }             
            });
        });
    }
    
    this.updateUser = function(userModel, userQuery, newUserData, callback) {
        mongoose.connection.on('connected', function(){
            userModel.findOneAndUpdate(userQuery, newUserData, function(err, user) {
                if (err) {
                    callback(err); 
                } else {
                    console.log('User successfully updated!');  
                    callback(user);
                }             
            });
        });
    }
    
    this.deleteUser = function(userModel, userQuery) {
        mongoose.connection.on('connected', function(){
            userModel.remove(userQuery, function(err) {
                if (err) {
                    callback(err); 
                } else {
                    console.log('User successfully deleted!'); 
                    callback(null);
                }             
            });
        });
    }
}


module.exports.userDAO = userDAO;