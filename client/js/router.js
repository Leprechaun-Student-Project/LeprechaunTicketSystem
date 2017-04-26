import * as users from 'users';
import * as tickets from 'tickets';
import * as newTicket from 'newticket';

function initRouter() {
    const router = new Navigo(null, false);

    router
        .on('register', () => users.register())
        .on('login', () => users.loginForm())
        .on('logout', () => users.logout())
        .on('NewTicket', () => {
            newTicket.displayForm()
        })
        .on('/', () => {
            tickets.displayTickets();
            tickets.displayPagination();
        });
}

export {
    initRouter
};