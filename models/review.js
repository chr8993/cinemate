/**
 * 
 * @name Review
 * @ngdoc Models
 * @desc Model to 
 * manage database
 * entries for reviews
 * @property {ObjectID} _id
 * @property {ObjectID} _movieId
 * @property {ObjectID} _userId
 * @property {String} content
 * @property {Number} deleted
 * @property {Date} lastUpdated
 * 
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var reviewSchema = new Schema({
    _movieId: ObjectId,
    _userId: ObjectId,
    content: String,
    deleted: {
        type: Number,
        default: 0
    },
    lastUpdated: { 
        type: Date, 
        default: Date.now
    }
});

var Review = mongoose.model('Review', reviewSchema);
exports.reviewModel = Review;