/**
 * 
 * @name Review 
 * @desc Model to 
 * manage database
 * entries for reviews
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