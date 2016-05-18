var db      = require('../models');
var $q      = require('q');
var moment  = require('moment');
var Review  = db.reviewModel;
var Movie   = db.movieModel;
var strip   = require('striptags');

/**
 * 
 * @function getReviews
 * @memberof Review
 * @ngdoc Controllers
 * @desc Will fetch all
 * movie reviews by movieId
 * @param {ObjectId} movieId
 * 
 */
exports.getReviews = function(movieId) {
    var d = $q.defer();
    if(movieId) {
        Review
        .find({ _movie: movieId, deleted: 0 })
        .sort({ lastUpdated: -1 })
        .populate('_creator')
        .exec(function(err, r) {
            if(r) {
               d.resolve(r);
            }
        });
    } else {
        d.resolve(false);
    }
    return d.promise;
};

/**
 * 
 * @function getAll
 * @memberof Review
 * @ngdoc Controllers
 * @desc Will fetch all
 * movies reviews 
 * 
 */
exports.getAll = function() {
    var d = $q.defer();
    Review
    .find({ deleted: 0 })
    .sort({ lastUpdated: -1 })
    .exec(function(err, r) {
        if(r) {
           d.resolve(r);
        }
    });
    return d.promise;
};

/**
 * 
 * @function getReview
 * @memberof Review
 * @ngdoc Controllers
 * @desc Will fetch only
 * a single review
 * @param {ObjectId} id
 * 
 */
exports.getReview = function(id) {
    var d = $q.defer();
    if(id) {
        Review
        .findById(id)
        .populate('_movie')
        .populate('_creator')
        .exec(function(err, r) {
            d.resolve(r);
        });           
    } else {
        d.resolve(false);
    }
    return d.promise;
};

/**
 * 
 * @function getUser
 * @memberof Review
 * @ngdoc Controllers
 * @desc Will fetch users
 * reviews
 * @param {ObjectId} userId
 * 
 */
exports.getUser = function(userId) {
    var d = $q.defer();
    if(userId) {
        Review
        .find({ _userId: userId })
        .populate('_movie')
        .populate('_creator')
        .sort({ lastUpdated: -1 })
        .exec(function(err, r) {
            if(r) {
               d.resolve(r);
            }
        });
    } else {
        d.resolve(false);
    }
    return d.promise;
};

/**
 * 
 * @function addReview
 * @memberof Review
 * @ngdoc Controllers
 * @desc Will fetch add
 * movie reviews
 * @param {Object} review
 * 
 */
exports.addReview = function(review) {
    var d = $q.defer();
    if(review) {
       if(review._userId 
       && review._movieId 
       && review.content) {
            var t = {};
            t._creator = review._userId;
            t._movie = review._movieId;
            //strip html tags
            t.content = strip(review.content);
            Review.create(t, function(err, res) {
                if(res) {
                    d.resolve(res);
                }
            });
            // d.resolve(r);
       } 
       else {
          d.resolve(false);       
       } 
    } else {
        d.resolve(false);
    }
    return d.promise;
};

/**
 * 
 * @function editReview
 * @memberof Review
 * @ngdoc Controllers
 * @desc Will update an
 * existing review
 * @param {Object} review
 * 
 */
exports.editReview = function(review) {
    var d = $q.defer();
    if(review) {
        if(review._userId 
        && review._movieId 
        && review.content
        && review._id) {
            Review
            .findById(review._id)
            .exec()
            .then(function(r) {
                var rId = r._creator;
                var mId = review._userId;
                if(rId == mId) {
                    var t = {};
                    t._creator = review._userId;
                    t._movie = review._movieId;
                    t._id = review._id;
                    //strip html tags
                    t.content = strip(review.content);
                    Review
                    .update(t)
                    .exec(function(err) {
                        if(!err) {
                            var i = {};
                            i._status = "success";
                            d.resolve(i);
                        }
                    });
                }
                else {
                    d.resolve(false);
                }
            });
        } 
        else {
           d.resolve(false);       
        } 
    } 
    else {
        d.resolve(false);
    }
    return d.promise;
};

/**
 * 
 * @function removeReview
 * @memberof Review
 * @ngdoc Controllers
 * @desc Will remove a
 * specific review
 * @param {ObjectId} userId
 * @param {ObjectId} id
 * 
 */
exports.removeReview = function(userId, id) {
    var d = $q.defer();
    var s = {};
    if(id && userId) {
        Review
        .findById(id)
        .exec()
        .then(function(r) {
            var uId = r._creator;
            var mId = userId;
            if(uId == mId) {
                Review.update({ _id: id, 
                deleted: 1 }, 
                function(err) {
                   if(!err) {
                       s._status = "success";
                       d.resolve(s);
                   } 
                });
            }
            else {
                d.resolve(false);
            }
        });
    } else {
        d.resolve(false);    
    }
    return d.promise;
};