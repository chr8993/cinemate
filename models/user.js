/**
 * 
 * @name User
 * @ngdoc Models
 * @desc Model to 
 * manage database
 * entries for users
 * @property {ObjectID} _id
 * @property {String} firstName
 * @property {String} lastName
 * @property {String} email
 * @property {String} image
 * @property {Number} deleted
 * @property {Date} lastUpdated
 * 
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var userSchema = new Schema({
    firstName:  String,
    lastName: String,
    _facebookId: String,
    _googleId: String,
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