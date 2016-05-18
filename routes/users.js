module.exports = function(app) {
    
    var passport = require('passport');
    var path   = "../controllers/users"; 
    var User   = require(path);
    
    var users = [];
    
    app.post('/users', function(req, res) {
        if(req.body) {
            var user = req.body;
            User.register(user)
            .then(function(r) {
               if(r) {
                   res.send(r);
               } 
            });
        }
    });
    
    app.post('/login', 
    passport.authenticate('local'), 
    function(req, res) {
        var url = "http://107.170.8.238";
        res.redirect(url + "/#/movies/");
    });
    
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: [ 'email', 'public_profile'],
        profileFields: ['id', 'displayName', 'photos', 'emails', 'birthday']
    }));
    
    app.get('/auth/facebook/callback', 
    passport.authenticate('facebook'),
      function(req, res) {
        var url = "http://107.170.8.238:8100";
        res.redirect(url + "/#/movies/");
    });
    
};