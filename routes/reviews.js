module.exports = function(app) {
    
    var path   = "../controllers/reviews"; 
    var Review  = require(path);
    var moment = require('moment');
    var format = "YYYY-MM-DD hh:mm:s";
    
    app.get('/reviews', function(req, res) {
        Review.getAll()
        .then(function(reviews) {
            if(reviews) {
                res.send(reviews);
            }
        });
    });
    
    app.get('/user/reviews', function(req, res) {
        var session = req.session;
        if(session) {
            var uid = session.passport.user;
            Review.getUser(uid)
            .then(function(reviews) {
                if(reviews) {
                    res.send(reviews);
                }
            });
        }
    });
    
    app.post('/reviews', function(req, res) {
        var session = req.session;
        if(session) {
            var uid = session.passport.user;
            var body = req.body;
            body._userId = uid;
            Review.addReview(body)
            .then(function(status) {
                if(status) {
                    res.send(status);
                }
            });
        }
    });
    
    app.get('/reviews/:id', function(req, res) {
        if(req.params.id) {
            var id = req.params.id;
            Review.getReview(id)
            .then(function(review) {
                if(review){
                    res.send(review);
                }
            });
        }
    });
    
    app.post('/reviews/:id', function(req, res) {
        var session = req.session;
        if(session) {
            var uid = session.passport.user;
            var body = req.body;
            body._userId = uid;
            body._id = req.params.id;
            Review.editReview(body)
            .then(function(status) {
                if(status) {
                    res.send(status);
                }
            });
        }
    });
    
    app.delete('/reviews/:id', function(req, res) {
        var session = req.session;
        if(session) {
            var uid = session.passport.user;
            Review.removeReview(uid, req.params.id)
            .then(function(status) {
                if(status) {
                    res.send(status);
                }
            });
        }
    });
};