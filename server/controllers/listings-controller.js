
module.exports = function (db) {
    
    function post_For_Length(request, response) {
        let page_Index = request.params.page_Index;

        let total_Tickets_Length = db.get('tickets')
            .size()
            .value()

        console.log('Node says: post for length: ' + total_Tickets_Length);

        response.status(201)
            .send(total_Tickets_Length);
    }

    function post_For_Tickets(request, response) {
        let page_Index = request.params.page_Index;
        let number_Of_Pages = request.params.number_Of_Pages;

        let array_Of_Tickets = (db.get('tickets')
            .slice(page_Index * number_Of_Pages, number_Of_Pages + 1)
            .value()); 

        console.log('Node says: post for Tickets');

        response.status(201)
            .send(array_Of_Tickets);
    }

    return {
        post_For_Tickets: post_For_Tickets,
        post_For_Length: post_For_Length
    };
};
