import * as data from 'data';

const USERNAME_LOCAL_STORAGE_KEY = 'signed-in-user-username',
    AUTH_KEY_LOCAL_STORAGE_KEY = 'signed-in-user-auth-key';

const clearLocalStorage = () => {
    localStorage.removeItem(USERNAME_LOCAL_STORAGE_KEY);
    localStorage.removeItem(AUTH_KEY_LOCAL_STORAGE_KEY);
};

describe('Data Layer Tests', () => {
    beforeEach(clearLocalStorage);
    afterEach(clearLocalStorage);
    describe('isLoggedIn Tests', () => {
        it('Expect isLoggedIn() to return false when AUTH_KEY_LOCAL_STORAGE_KEY is not stored on localhost',
            () => {
                expect(data.isLoggedIn()).to.be.false;
            });
        it('Expect isLoggedIn() to return true when AUTH_KEY_LOCAL_STORAGE_KEY is stored on localhost',
            () => {
                localStorage.setItem(AUTH_KEY_LOCAL_STORAGE_KEY, "valid auth key");
                expect(data.isLoggedIn()).to.be.true;
            });
    });

});

mocha.run();
