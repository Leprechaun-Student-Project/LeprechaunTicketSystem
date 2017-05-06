module.exports = function(db) {

    function get(req, res) {
        console.log(req.headers.inputvalue);
        const inputValue = req.headers.inputvalue;

        if (!inputValue) {
            res.status(400)
                .json('Invalid input value');
            return;
        }

        db.collection('tickets').find().toArray(function(e, ticketsList) {
            const tickets = ticketsList.map(t => t.id);
            res.status(201)
                .json({
                    result: {
                        tickets: tickets
                    }
                });
        });
    }

    return {
        get: get,
    }

}
