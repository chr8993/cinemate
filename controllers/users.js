var db             = require('../models');
var q              = require('q');
var User           = db.userModel;
var md5            = require('js-md5');

/**
 *  
 * @function register
 * @memberof User
 * @ngdoc Controllers
 * @desc Will check
 * to see if user is
 * authenticated
 * 
 */
exports.register = function(user) {
    var d = q.defer();
    var s = {};
    s._status = "Error";
    if(user) {
        if(user.email) {
            User.findOne({ 
                email: user.email 
            }, function(err, u) {
                if(err) { d.resolve(s); }
                if(u) {
                    var m = "Error: ";
                    m += "User exists.";
                    s._status = m;
                    d.resolve(s);
                } 
                else {
                   if(user.firstName 
                   && user.password
                   && user.lastName) {
                       var salt = "!Cin3m4t3";
                       var p = salt + user.password;
                       user.password = md5(p);
                       User.create(user, function(err, user) {
                          s._status = "success";   
                          s.data = user;
                          d.resolve(s);
                       });
                   }
                   else {
                       d.resolve(false);
                   }
                }
            });
        }
    } else {
        s._status = "Error";
        d.resolve(s);
    }
    return d.promise;
};

/**
 * 
 * @function remove 
 * @memberof User
 * @ngdoc Controllers
 * @desc Will remove a 
 * user from the database
 * 
 */
exports.remove = function(id) {
    if(id) {
        
    }
};
