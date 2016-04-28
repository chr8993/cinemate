module.exports = function(app) {
    app.get('/', function(req, res) {
        var stat = {};
        res.send(JSON.stringify(stat));
    });
    
    /**
     *
     * Define other routes
     * and nest them under 
     * the main index file
     * 
     */
    require('./movies')(app);
    require('./reviews')(app);
    require('./users')(app);
};