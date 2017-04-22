module.exports = function(app, db) {
    app.use('/api', function(req, res, next) {
        const authKey = req.headers['x-auth-key'];
        req.user = db('users').find({
            authKey: authKey
        });
        next();
    });
};
