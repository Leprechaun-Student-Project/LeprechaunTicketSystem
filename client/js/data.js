import * as requester_JSON from 'json-requester';  // './js/json-requester_JSON.js'


const USERNAME_CHARS = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890_.",
    USERNAME_MIN_LENGTH = 6,
    USERNAME_MAX_LENGTH = 30;

const COOKIE_TEXT_MIN_LENGTH = 6,
    COOKIE_TEXT_MAX_LENGTH = 30,
    COOKIE_CATEGORY_MIN_LENGTH = 6,
    COOKIE_CATEGORY_MAX_LENGTH = 30;

/* Users */

function register_New_User(user) {
    
    const reqUser = {
        display_Name: user.display_Name,
        // TODO:
        //passHash: CryptoJS.SHA1(user.display_Name + user.password).toString()
        passHash: user.pass,
        first_Name: user.first_Name,
        last_Name: user.last_Name,
        email: user.email
    };

    // call controller on server 
    return requester_JSON.post('api/users', {
            data: reqUser
        })
        .then(function(resp) {
            //const user = resp.result;
            return {
                display_Name: resp.result.display_Name
            };
        });
}

function login(display_Name, pass_Hash) {
    return requester_JSON.put('api/auth', {
        data: {
            display_Name,
            pass_Hash
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
    return requester_JSON.post('/listing/page' + page_Index + '/amount' + number_Of_tickets_Per_Page,
        {

        })
        .then(function (resp) {
            return {
                result: resp.result
            }
        });
}

// get the total amount of tickets
function get_Tickets_Numb() {
    return requester_JSON.post('/listlength',
        {

        })
        .then(function (resp) {
            return {
                result: resp.result
            }
        });
}

export {
    register_New_User,
    login,
    send_New_Ticket,
    get_Tickets_Range,
    get_Tickets_Numb
}
