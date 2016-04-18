module.exports = function(app) {
    var movies = [];
    app.get('/reviews', function(req, res) {
        res.send(JSON.stringify(movies));
    });
};