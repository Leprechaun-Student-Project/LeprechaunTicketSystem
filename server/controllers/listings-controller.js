module.exports = function(db) {

    function getTicketsCont(request, response) {
        db.collection('tickets').count().then(function(totalTicketsLength) {
            response.status(201)
                .json({
                    totalTicketsLength: totalTicketsLength
                });
        });
    }

    function getTickets(request, response) {
        const pageIndex = request.headers['page'];
        const numberPerPages = request.headers['number-per-page'];

        if (!pageIndex) {
            response.status(400)
                .json('Invalid page index');
            return;
        }

        if (!numberPerPages) {
            response.status(400)
                .json('Invalid number per page');
            return;
        }
        
        db.collection('tickets').find().toArray(function(e, TicketCollection) {
            const tickets = TicketCollection.slice((pageIndex - 1) * numberPerPages, pageIndex * numberPerPages);
            response.status(201)
                .json({
                    tickets: tickets
                });
        });
    }

    return {
        getTicketsCont: getTicketsCont,
        getTickets: getTickets
    };
};
