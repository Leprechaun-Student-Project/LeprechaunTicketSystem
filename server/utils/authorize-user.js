
module.exports = function (express_App, db) {
    /*A route will match any path that follows its path immediately with a “/”. For example: app.use('/apple', ...) will 
         match “/apple”, “/apple/images”, “/apple/images/news”, and so on.*/

    // tell Express to asociate the paths whose roots match with the root param with a funciton
    express_App.use('/api', function(req, res, next) {
        const authKey = req.headers['x-auth-key'];
        req.user = db('users').find({
            authKey: authKey
        });
        // ignore consequent routes
        next();     // empty parameter defaults to "/" path
    });
};
