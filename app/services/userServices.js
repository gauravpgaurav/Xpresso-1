// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');

// configuration ===========================================
// config files
var db = require('../../config/db');

function userDAO() {
    
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
    
    this.createUser = function(userData, callback) {
        if(mongoose.connection.readyState == 1) {
            userData.save(function(err, user){
                if(err) {
                    callback(err, user);
                } else {
                    console.log('User successfully created!');
                    callback(err, user);
                }
            }); 
        }
    }
    
    this.findUser = function(userModel, userQuery, callback) {
        if(mongoose.connection.readyState == 1) {
            userModel.find(userQuery, function(err, user) {
                if (err) {
                    callback(err, user); 
                } else {
                    console.log('User successfully found!\n');
                    callback(err, user);
                }             
            });
        }
    }
    
    this.updateUser = function(userModel, userQuery, newUserData, callback) {
        if(mongoose.connection.readyState == 1) {
            userModel.findOneAndUpdate(userQuery, newUserData, function(err, user) {
                if (err) {
                    callback(err, user); 
                } else {
                    console.log('User successfully updated!');  
                    callback(err, user);
                }             
            });
        }
    }
    
    this.deleteUser = function(userModel, userQuery, callback) {
        if(mongoose.connection.readyState == 1) {
            userModel.remove(userQuery, function(err, user) {
                if (err) {
                    callback(err, user); 
                } else {
                    console.log('User successfully deleted!'); 
                    callback(err, user);
                }             
            });
        }
    }
}


module.exports.userDAO = userDAO;