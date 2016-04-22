module.exports = function(app) {
    var path = "../controllers/auth";
    var Auth = require(path);
    app.use(Auth.isAuth);
};