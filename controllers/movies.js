var db     = require('../models');
var client = require('../config/redis');
var $q     = require('q');
var moment = require('moment');
var Movie  = db.movieModel;
var f      = "YYYY-MM-DD hh:mm:ss";

/**
 *
 * @function getMovies
 * @memberof Movie
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
    Movie
    .find()
    .sort({ lastUpdated: -1 })
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
 * @memberof Movie
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
 * @memberof Movie
 * @desc Will update a
 * movie with given post
 * data
 * @param {object} data
 * 
 */
exports.updateMovie = function(data) {
    var d = $q.defer();
    if(data) {
        if(data._id) {
            Movie
            .save(data)
            .exec(function(err) {
                if(!err) {
                    var i = {};
                    i._status = "success";
                    d.resolve(i);
                }
            });
        }
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
 * @function getTop
 * @memberof Movie
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
    top = parseInt(top);
    var path = "/movies/";
    path += "top/" + top;
    if(top) {
        client.get(path, 
            function(err, c) {
            if(c != null) {
                var data = JSON.parse(c);
                res._data = data;
                d.resolve(res);
            } 
            else {
                Movie
                .find()
                .sort({imdbVotes: -1})
                .limit(top)
                .exec(function(err, r) {
                    if(err) { console.log(err); }
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

/**
 * 
 * @function searchMovie
 * @memberof Movie
 * @param {String} query
 * @desc Will search 
 * for a specific movie
 * 
 */
exports.searchMovie = function(query) {
    var d = $q.defer();
    var m = moment().format(f);
    if(query) {
        var res = {};
        res._timestamp = m;
        res._data = false;
        var q = query.toLowerCase();
        Movie
        .find({ $text: { $search: q }})
        .sort({imdbVotes: -1})
        .limit(20)
        .exec(function(err, r) {
            if(r) {
                res._data = r;
                d.resolve(res);
            }
        });
    } else {
        d.resolve(false);
    }
    return d.promise;
};