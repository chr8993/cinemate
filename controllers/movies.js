var db     = require('../models');
var Movie  = db.movieModel;
var f      = "YYYY-MM-DD hh:mm:ss";
var $q     = require('q');
var moment = require('moment');
var redis  = require('redis');
var client = redis.createClient();

/**
 *
 * @function getMovies
 * @desc Fetch movies
 * from database limited
 * to first 20
 * 
 */
exports.getMovies = function() {
    var d = $q.defer();
    var t = moment().format(f);
    var res = {};
    res._timestamp = t;
    Movie.find()
    .limit(20)
    .exec(function(err, r) {
        if(r) {
           res._data = r;
           d.resolve(res);
        }
    });
    return d.promise;
};

/**
 * 
 * @function getMovie 
 * @desc Will fetch a 
 * single movie by id
 * @param {objectId} id
 * 
 */
exports.getMovie = function(id) {
    var d = $q.defer();
    var t = moment().format(f);
    var res = {};
    res._timestamp = t;
    res._data = false;
    if(id) {
        Movie.findById(id, 
            function(err, r) {
                res._data = r;
                d.resolve(res);
            }
        );           
    } else {
        d.resolve(res);
    }
    return d.promise;
};

/**
 * 
 * @function updateMovie
 * @desc Will update a
 * movie with given post
 * data
 * @param {object} data
 * 
 */
exports.updateMovie = function(data) {
    var d = $q.defer();
    if(data) {
        
    }
    return d.promise;
};


/**
 * 
 * @function removeMovie
 * @desc Will remove a 
 * specific movie
 * @param {objectId} id
 * 
 */
exports.removeMovie = function(id) {
    var d = $q.defer();
    var s = {};
    if(id) {
        Movie.remove({ _id: id }, 
        function(err) {
           if(!err) {
               s._status = "success";
               d.resolve(s);
           } 
        });
    } else {
        d.resolve(false);    
    }
    return d.promise;
};

/**
 * 
 * @function loadAll
 * @desc Load all posts
 * that include a poster
 * image
 * 
 */
// >= 8000
exports.loadAll = function() {
    var d = $q.defer();
    Movie.find({
        poster: { $not: { $size: 0 }}, 
        title: {$not: { $size: 0 }},
        $where: "parseInt(this.imdbVotes) >= 8000"
    }, 
    function(err, res) {
        if(res) {
            d.resolve(res);
        }
    });
    return d.promise;
};

/**
 * 
 * @function getTop 
 * @desc Will fetch
 * top movies based
 * off of imdb votes
 * 
 */
exports.getTop = function(top) {
    var d = $q.defer();
    var t = moment().format(f);
    var res = {};
    res._timestamp = t;
    res._data = false;
    var path = "/movies/";
    path += "top/" + top;
    if(top) {
        client.get(path, 
            function(err, c) {
            if(c != null) {
                var data = JSON.parse(c)
                res._data = data;
                d.resolve(res);
            } 
            else {
                Movie
                .find({ $where : "parseInt(this.imdbVotes) >= 60000"})
                .sort({ imdbRating: -1 })
                .limit(top)
                .exec(function(err, r) {
                    if(r) {
                        res._data = r;
                        client.set(path, 
                        JSON.stringify(r));
                        d.resolve(res);
                    }
                });    
            }
        });
    }
    else {
        d.resolve(false);
    }
    return d.promise;
};