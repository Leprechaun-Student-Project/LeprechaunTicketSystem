import * as users from 'users';
import * as tickets from 'tickets';
import * as ticket from 'ticket';

function initRouter() {

    const router = new Navigo(null, false);

    router
        .on('register', () => users.register())
        .on('login', () => users.loginForm())
        .on('logout', () => users.logout())
        .on('NewTicket', () => ticket.displayCreateTicketForm())
        .on('ticket/:id', (params) => ticket.displayUpdateTicketForm(params))
        .on('tickets', (params, query) => tickets.displayTickets(params, query))
        .on('/', () => tickets.displayTickets());
}

export {
    initRouter
};
