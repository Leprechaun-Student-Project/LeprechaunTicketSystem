module.exports = function (db) {

    function getTicketsCont(request, response) {
        db.collection('tickets').count().then(function (totalTicketsLength) {
            response.status(201)
                .json({
                    totalTicketsLength: totalTicketsLength
                });
        });
    }

    function getTickets(request, response) {
        const headers = request.headers;
        const page = +headers['page'];
        const numberPerPages = +headers['number-per-page'];
        const sortByList = ['id', 'startdate', 'engineer', 'user', 'status', 'urgency', 'shortDescription'];

        const sortOrder = 1;
        if (!page) {
            response.status(400)
                .json('Invalid page index');
            return;
        }

        if (!numberPerPages) {
            response.status(400)
                .json('Invalid number per page');
            return;
        }


        let sortVar = {};
        sortByList.forEach((key) => {
            if (headers[key]) {
                if (key !== 'startdate') {
                    sortVar[key] = +headers[key];
                } else {
                    sortVar['date'] = +headers[key];
                }
            }
        })

        db.collection('tickets').find().sort(sortVar).toArray(function (e, TicketCollection) {
            const tickets = TicketCollection.slice((page - 1) * numberPerPages, page * numberPerPages);
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