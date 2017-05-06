module.exports = function (db) {

    function get(req, res) {
        console.log(req.headers.inputvalue);
        const inputValue = req.headers.inputvalue;

        if (!inputValue) {
            res.status(400)
                .json('Invalid input value');
            return;
        }
        let resu=[];
        let ids = db.collection('tickets').find().toArray(function (e, ticketsList) {
            let tickets=ticketsList.map( (ticket,index)=>{ticket.id;} )
            console.log(tickets.join(", "));
            resu=tickets.slice();
        });
        console.log(resu);
        console.log()
        //console.log(ids);
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