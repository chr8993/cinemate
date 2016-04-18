module.exports = function(app) {
    var users = [];
    app.get('/users', function(req, res) {
        res.send(JSON.stringify(users));
    });
};