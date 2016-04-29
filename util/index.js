var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuthStrategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var db               = require('../models');
var User             = db.userModel;
var md5              = require('js-md5');

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

passport.use(new FacebookStrategy({
    clientID: "1738202996451280",
    clientSecret: "2e2c3070ac806f8fc1862b509e1e8832",
    callbackURL: "http://107.170.8.238/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User
    .findOne({ _facebookId: profile.id }, 
    function(err, user) {
        if(user) {
          done(null, user);
        } else {
          var t = {};
          var name = profile.displayName.split(' ');
          t.firstName = name[0];
          t.lastName = name[1];
          var i = "https://graph.facebook.com";
          i += "/" + profile.id + "/picture";
          i += "?type=large";
          t.image = i;
          t._facebookId = profile.id;
          User.create(t, function(err, u) {
              done(null, u);
          });
        }
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
    // console.log(req.path);
    if(req.session.passport 
    || (req.url == '/users') 
    || (req.url == '/login')
    || (req.path == '/auth/facebook')
    || (req.path == '/auth/facebook/callback')) {
        next();
    } else {
       res.statusCode = 401;
       res.send({_status: "Error: Unauthorized"});
       return;
    }
};

