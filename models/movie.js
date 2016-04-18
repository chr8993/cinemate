/**
 * 
 * @name Movie 
 * @desc Model to 
 * manage database
 * entries for movie 
 * titles
 * 
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
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
    imdbVotes: String,
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