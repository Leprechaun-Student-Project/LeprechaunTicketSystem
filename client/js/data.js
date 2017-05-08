import * as requester_JSON from 'json-requester';

const USERNAME_LOCAL_STORAGE_KEY = 'signed-in-user-username',
    AUTH_KEY_LOCAL_STORAGE_KEY = 'signed-in-user-auth-key',
    NUMBER_PER_PAGE_HEADER = 'number-per-page',
    MAX_TICKET_PER_PAGE = 5,
    QUERY_PARAMS_HEADER = 'query-params';
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
        .then(function (resp) {
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

function getLoggedInUser() {
    if (isLoggedIn()) {
        return localStorage.getItem(USERNAME_LOCAL_STORAGE_KEY)
    } else {
        return 'unknown';
    }
}

function isLoggedIn() {
    if (localStorage.getItem(AUTH_KEY_LOCAL_STORAGE_KEY)) {
        return true;
    } else {
        return false;
    }
}
/* NewTickets*/

function sendNewTicket(ticketObj) {
    return requester_JSON.post('api/newticket', {
            data: ticketObj
        })
        .then(function (resp) {
            return {
                result: resp.result
            }
        });

}

function updateTicket(ticket) {
    const options = {
        headers: {
            'x-auth-key': localStorage.getItem(AUTH_KEY_LOCAL_STORAGE_KEY)
        },
        data: ticket
    };
    return requester_JSON.put('api/updateTicket', options)
        .then(function (resp) {
            return {
                result: resp.result
            }
        });
}

function getTicketsRange(queryParams) {
    const headers = {};
    headers[NUMBER_PER_PAGE_HEADER] = MAX_TICKET_PER_PAGE;
    for (const key in queryParams) {
        if (key === 'date') {
            headers['startDate'] = queryParams[key];
        } else {
            headers[key] = queryParams[key];
        }
    }
    const options = {
        headers: headers
    };
    return requester_JSON.get('api/tickets', options);
}

function getTicketsCount() {
    return requester_JSON.get('api/ticketsCount', {})
        .then(function (resp) {
            return {
                result: resp.totalTicketsLength,
                maxTicketsPerPage: MAX_TICKET_PER_PAGE
            }
        });
}

function getTicket(ticketId) {
    const options = {
        headers: {
            'x-auth-key': localStorage.getItem(AUTH_KEY_LOCAL_STORAGE_KEY),
            'ticket': ticketId
        }
    };
    return requester_JSON.get('api/ticket', options)
}

function getPopoverValue(inputValue) {
    const options = {
        headers: {
            inputValue: inputValue
        }
    };
    return requester_JSON.get('api/popover', options)
}

function splitQueryParameters(query) {
    const keyValPairs = [];
    const params = {};

    if (query.length) {
        const keyValPairs = query.split('&');
        for (const pairNum in keyValPairs) {
            const key = keyValPairs[pairNum].split('=')[0];
            if (!key.length) continue;
            if (typeof params[key] === 'undefined')
                params[key] = [];
            params[key] = keyValPairs[pairNum].split('=')[1];
        }
    }
    return params;
}
export {
    register,
    login,
    getUsers,
    isLoggedIn,
    getLoggedInUser,
    sendNewTicket,
    updateTicket,
    getTicketsRange,
    getTicketsCount,
    getTicket,
    getPopoverValue,
    splitQueryParameters
}