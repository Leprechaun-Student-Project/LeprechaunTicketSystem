module.exports = function (db) {

    function get(req, res) {
        console.log(req.headers.inputvalue);
        const inputValue = req.headers.inputvalue;

        if (!inputValue) {
            res.status(400)
                .json('Invalid input value');
            return;
        }
        let ids=db.collection('tickets').find().map((ticket)=>{
            return ticket.Cursor.topology.server.id
        })
        console.log(typeof ids);
        console.log(Object.keys(ids));
        console.log(ids);
        res.status(201)
            .json({
                result: {
                    status: 'success'
                }
            });

    }

    return {
        get: get,
    }

}