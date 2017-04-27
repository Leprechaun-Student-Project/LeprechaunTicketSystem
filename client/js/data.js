import * as requester_JSON from 'json-requester'; // './js/json-requester_JSON.js'

/* Users */

function register(user) {
    const reqUser = {
        username: user.username,
        //passHash: CryptoJS.SHA1(user.username + user.password).toString()
        passHash: user.pass,
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

function login(username, passHash) {
    return requester_JSON.put('api/auth', {
        data: {
            username,
            passHash
        }
    });
}

/* NewTickets*/

function send_New_Ticket(ticketObj) {
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
    send_New_Ticket,
    get_Tickets_Range,
    get_Tickets_Numb
}
