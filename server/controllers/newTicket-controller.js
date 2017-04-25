module.exports = function (db) {

    function get(req, res) {
        console.log('here1');
    }

    function post(req, res) {
      console.log('here2');
        res.status(201)
            .json({
                result: {
                    status: 'success'
                }
            });
    }

    function put(req, res) {
       console.log('here3');
    }

    return {
        get: get,
        post: post,
        put: put
    };
};
