module.exports = function(app) {
    
    var path   = "../controllers/movies"; 
    var Movie  = require(path);
    var moment = require('moment');
    var format = "YYYY-MM-DD hh:mm:s";
    
    app.get('/movies', function(req, res) {
        Movie.getMovies()
        .then(function(data) {
            if(data) {
                res.send(data);
            }
        });
    });
    
    app.put('/movies', function() {});
    
    app.get('/movies/:id', function(req, res) {
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
    
    app.post('/movies/:id', function() { });
    
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
    
    app.get('/movies/recent/', function(req, res) {
        
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