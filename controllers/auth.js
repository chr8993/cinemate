/**
 *  
 * @function isAuth
 * @memberof Auth
 * @desc Will check
 * to see if user is
 * authenticated
 * 
 */
exports.isAuth = function(req, res, next) {
    // var e = new Error('Un-authorized');
    // if(req.session) {
    //     if(req.session.auth) {
    //         console.log("logged in");
    //         next();
    //     } 
    //     else {
    //         res.statusCode = 401;
    //         next(e);
    //     }
    // } 
    // else {
    //     res.statusCode = 401;
    //     next(e);
    // }
    next();
};

/**
 * 
 * @function logout
 * @memberof Auth
 * @desc Will log
 * current user out
 * 
 */
exports.logout = function() {};

/**
 * 
 * @function login
 * @memberof Auth
 * @desc Will sign
 * user in
 * 
 */
exports.login  = function() {};