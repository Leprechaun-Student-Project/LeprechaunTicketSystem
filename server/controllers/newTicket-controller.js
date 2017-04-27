module.exports = function(db) {

    function get(req, res) {
        console.log('here1');
    }

    function post(req, res) {
      console.log('hereeeee');
        let ticket = req.body;

        for (let k in ticket) {
            if (ticket[k].match(/([<>&])./gm)) {
                res.status(401)
                    .json("You can't symbols like < > and & in tickets!");
                return;
            }
        }
        db.collection('tickets').insert(ticket);
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
