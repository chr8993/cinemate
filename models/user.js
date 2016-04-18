/**
 * 
 * @name User 
 * @desc Model to 
 * manage database
 * entries for users
 * 
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    firstName:  String,
    lastName: String,
    email:   String,
    image: String,
    password: String,
    deleted: {
        type: Number,
        default: 0
    },
    lastUpdated: { 
        type: Date, 
        default: Date.now
    }
});

var User = mongoose.model('User', userSchema);
exports.userModel = User;