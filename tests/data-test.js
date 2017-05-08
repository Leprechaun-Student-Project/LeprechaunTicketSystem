import * as data from 'data';
import * as requester_JSON from 'json-requester';

const USERNAME_LOCAL_STORAGE_KEY = 'signed-in-user-username',
    AUTH_KEY_LOCAL_STORAGE_KEY = 'signed-in-user-auth-key';

const clearLocalStorage = () => {
    localStorage.removeItem(USERNAME_LOCAL_STORAGE_KEY);
    localStorage.removeItem(AUTH_KEY_LOCAL_STORAGE_KEY);
};

describe('Data Layer Tests', () => {
    beforeEach(clearLocalStorage);
    afterEach(clearLocalStorage);
    describe('User Tests', () => {
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
    describe('Utils Tests', () => {
        describe('getPopoverValue Tests', () => {
            it('Expect getPopoverValue to call json requester get', () => {
                const jsonRequesterGetStub = sinon.stub(requester_JSON, 'get');
                data.getPopoverValue('1');
                expect(jsonRequesterGetStub).to.have.been.calledOnce;
                jsonRequesterGetStub.restore();
            });
            it('Expect getPopoverValue to make get request to api/popover', () => {
                const jsonRequesterGetStub = sinon.stub(requester_JSON, 'get');
                data.getPopoverValue('1');
                expect(jsonRequesterGetStub).to.have.been.calledWith('api/popover');
                jsonRequesterGetStub.restore();
            });
            it('Expect getPopoverValue to make get request with headers inputValue', () => {
                const jsonRequesterGetStub = sinon.stub(requester_JSON, 'get');
                data.getPopoverValue('48');
                expect(jsonRequesterGetStub.args[0][1].headers.inputValue).to.be.equal('48');
                jsonRequesterGetStub.restore();
            });
        });
        describe('splitQueryParameters Tests', () => {
            it('Expect splitQueryParameters to return empty object when no parameters are passed', () => {
                expect(data.splitQueryParameters()).to.be.deep.equal({});
            });
            it('Expect splitQueryParameters to return empty object when empty string is passed', () => {
                expect(data.splitQueryParameters("")).to.be.deep.equal({});
            });
            it('Expect splitQueryParameters to return splited parameters in object when valid query string is passed', () => {
                const expected = {
                    page: '1',
                    engineer: '1'
                };
                expect(data.splitQueryParameters("page=1&engineer=1")).to.be.deep.equal(expected);
            });
        });
    });
});

mocha.run();
