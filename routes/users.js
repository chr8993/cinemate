module.exports = function(app) {
    
    var passport = require('passport');
    var path   = "../controllers/users"; 
    var User   = require(path);
    
    var users = [];
    
    app.get('/users', function(req, res) {
        User.getAll().then(function(r) {
            if(r) {
                res.send(r);
            };
        })
    });
    
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
        res.send({_status: "success"});
    });
    
};