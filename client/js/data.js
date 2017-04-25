import * as requester from 'json-requester';


const USERNAME_CHARS = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890_.",
    USERNAME_MIN_LENGTH = 6,
    USERNAME_MAX_LENGTH = 30;

const COOKIE_TEXT_MIN_LENGTH = 6,
    COOKIE_TEXT_MAX_LENGTH = 30,
    COOKIE_CATEGORY_MIN_LENGTH = 6,
    COOKIE_CATEGORY_MAX_LENGTH = 30;

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

    return requester.post('api/users', {
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
    return requester.put('api/auth', {
        data: {
            username,
            passHash
        }
    });
}



/* NewTickets*/

function sendNewTicket(ticketObj) {
    return requester.post('api/newticket', {
            data: ticketObj
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
    sendNewTicket
}
