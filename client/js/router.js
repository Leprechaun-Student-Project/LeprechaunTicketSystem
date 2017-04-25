import * as users from 'users';
import * as tickets from 'tickets';

function initRouter() {
    const router = new Navigo(null, false);

    router
        .on('login', () => users.register())
        .on('NewTicket', () => console.log('here'))
        .on('/', () =>{
            tickets.displayNavBar();
            tickets.displayTickets();
            tickets.displayPagination();
            });
}

export {
    initRouter
};
