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
        .on('list/:page_Index', function(params) {
            // on calling the rooth directory on server
            // render the template listing the tickets and ..
            tickets.display_Tickets(params.page_Index);
            // .. display the naigavion through the pages
            tickets.display_Pagination(params.page_Index);
        })
        .on('/', () => {
            tickets.display_Tickets(+window.sessionStorage.getItem('current_page_index'));
            tickets.display_Pagination(+window.sessionStorage.getItem('current_page_index'));
        });
}

export {
    initRouter
};
