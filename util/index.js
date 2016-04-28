var passport       = require('passport');
var LocalStrategy  = require('passport-local').Strategy;
var db             = require('../models');
var User           = db.userModel;
var md5            = require('js-md5');

passport.use(new LocalStrategy({
     usernameField: 'email',
     passwordField: 'password'
  }, function(email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      var salt = "!Cin3m4t3";
      var p = salt + password;
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user.password != md5(p)) { 
          return done(null, false); 
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(user, done) {
  done(null, user._id);
});

exports.isAuth = function(req, res, next) {
    if(req.session.passport 
    || (req.url == '/users') 
    || (req.url == '/login')) {
        next();
    } else {
       res.statusCode = 401;
       res.send({_status: "Error: Unauthorized"});
       return;
    }
};

