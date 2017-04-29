import * as requester_JSON from 'json-requester';

/* Users */

function register(user) {
    const reqUser = {
        username: user.username,
        passHash: CryptoJS.SHA256(user.pass).toString(),
        frstname: user.frstname,
        lsname: user.lsname,
        email: user.email
    };

    return requester_JSON.post('api/users', {
            data: reqUser
        })
        .then(function(resp) {
            const user = resp.result;
            return {
                username: resp.result.username
            };
        });
}

function login(username, pass) {
    const passHash = CryptoJS.SHA256(pass).toString();
    return requester_JSON.put('api/auth', {
        data: {
            username,
            passHash
        }
    });
}

function getUsers() {
    return requester_JSON.get('/api/users', {});
}

/* NewTickets*/

function sendNewTicket(ticketObj) {
    return requester_JSON.post('api/newticket', {
            data: ticketObj
        })
        .then(function(resp) {
            return {
                result: resp.result
            }
        });

}

// get the tickets from <-> to
function get_Tickets_Range(page_Index, number_Of_tickets_Per_Page) {
    return requester_JSON.post('/listing/page' + page_Index + '/amount' + number_Of_tickets_Per_Page, {

        })
        .then(function(resp) {
            return {
                result: resp.result
            }
        });
}

// get the total amount of tickets
function get_Tickets_Numb() {
    return requester_JSON.post('/listlength', {

        })
        .then(function(resp) {
            return {
                result: resp.result
            }
        });
}

export {
    register,
    login,
    getUsers,
    sendNewTicket,
    get_Tickets_Range,
    get_Tickets_Numb
}
