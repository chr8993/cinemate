/**
 * @name Movie
 * @ngdoc Models
 * @desc Model to 
 * manage database
 * entries for movie 
 * titles
 * @property {ObjectID} _id
 * @property {String} imdbID
 * @property {String} title
 * @property {String} year
 * @property {String} rating
 * @property {String} runtime
 * @property {String} genre
 * @property {String} released
 * @property {String} director
 * @property {String} writer
 * @property {String} cast
 * @property {String} metacritic
 * @property {String} imdbRating
 * @property {Number} imdbVotes
 * @property {String} poster
 * @property {String} cover
 * @property {String} plot
 * @property {String} fullPlot
 * @property {Date} lastUpdated
 * 
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var movieSchema = new Schema({
    imdbID: String,
    title:  String,
    year: String,
    rating:   String,
    runtime: String,
    genre: String,
    released: String,
    director: String,
    writer: String,
    cast: String,
    metacritic: String,
    imdbRating: String,
    imdbVotes: Number,
    poster: String,
    cover: String,
    plot: String,
    fullPlot: String,
    lastUpdated: { 
        type: Date, 
        default: Date.now
    }
});

var Movie = mongoose.model('Movie', movieSchema);
exports.movieModel = Movie;