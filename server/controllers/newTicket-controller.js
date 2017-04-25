module.exports = function (db) {

    function get(req, res) {
        
    }

    function post(req, res) {
        res.status(201)
            .json({
                result: {
                    status: success
                }
            });
    }

    function put(req, res) {
       
    }

    return {
        get: get,
        post: post,
        put: put
    };
};