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

    describe('getLoggedInUser Tests', () => {

        it('Expect getLoggedInUser() to return unknown when non user is logged in',
            () => {
                //  const isLoggedInStub = sinon.stub(data, 'isLoggedIn').returns(false);
                expect(data.getLoggedInUser()).to.be.equal('unknown');
                //  isLoggedInStub.restore();
            });
        it('Expect getLoggedInUser() to return the username when user is logged in',
            () => {
                //  const isLoggedInStub = sinon.stub(data, 'isLoggedIn').returns(true);
                localStorage.setItem(AUTH_KEY_LOCAL_STORAGE_KEY, 'valid-auth-key');
                localStorage.setItem(USERNAME_LOCAL_STORAGE_KEY, 'validuser');

                expect(data.getLoggedInUser()).to.be.equal('validuser');
                //  isLoggedInStub.restore();
            });
    });

});

mocha.run();
