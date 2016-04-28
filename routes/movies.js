module.exports = function(app) {
    
    var path   = "../controllers/movies";
    var rpath  = "../controllers/reviews";
    var Movie  = require(path);
    var Review = require(rpath);
    var moment = require('moment');
    var format = "YYYY-MM-DD hh:mm:s";
    
    app.get('/movies/', function(req, res) {
        Movie.getMovies()
        .then(function(data) {
            if(data) {
                res.send(data);
            }
        });
    });

    
    app.get('/movies/:id/', function(req, res) {
        if(req.params.id) {
            var id = req.params.id;
            Movie.getMovie(id)
            .then(function(data) {
                if(data) {
                    res.send(data);
                }
            });
        }
    });
    
    app.get('/movies/:id/reviews', function(req, res) {
        if(req.params.id) {
            var id = req.params.id;
            Review.getReviews(id)
            .then(function(data) {
                if(data) {
                    res.send(data);
                }
            });
        }
    });
    
    app.post('/movies/:id/', function(req, res) {
        if(req.params.id) {
            var id = req.params.id;
            var data = req.body;
            Movie.updateMovie(data)
            .then(function(r) {
                if(r) {
                    res.send(r);
                }
            });
        }
    });
    
    app.delete('/movies/:id', function(req, res) {
        if(req.params.id) {
            var id = req.params.id;
            Movie.removeMovie(id)
            .then(function(data) {
                if(data) {
                    res.send(data);
                }
            }); 
        }
    });

    
    app.get('/movies/search/all/?', function(req, res) {
        if(req.query.q) {
            var query = req.query.q;
            Movie.searchMovie(query)
            .then(function(data) {
                if(data) {
                    res.send(data);
                }
            });
        }
    });
    

    app.get('/movies/top/:count', 
        function(req, res) {
            if(req.params.count) {
                var count = req.params.count;
                Movie.getTop(count)
                .then(function(data) {
                    if(data) {
                        res.send(data);
                    }
                });
            }    
    });
};