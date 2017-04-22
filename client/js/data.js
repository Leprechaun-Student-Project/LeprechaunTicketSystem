import * as requester from 'json-requester';

const USERNAME_LOCAL_STORAGE_KEY = 'signed-in-user-username',
    AUTH_KEY_LOCAL_STORAGE_KEY = 'signed-in-user-auth-key';

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
        passHash: user.password
    };

    return requester.post('http://localhost:3000/api/users', {
            data: reqUser
        })
        .then(function(resp) {
            const user = resp.result;
            return {
                username: resp.result.username
            };
        });
}

export {
    register
}
