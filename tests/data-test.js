import * as data from 'data';
import * as requester_JSON from 'json-requester';

const USERNAME_LOCAL_STORAGE_KEY = 'signed-in-user-username',
    AUTH_KEY_LOCAL_STORAGE_KEY = 'signed-in-user-auth-key',
    MAX_TICKET_PER_PAGE = 5;

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
    describe('Tickets tests', () => {
        describe('getTicket tests', () => {
            it('Expect getTicket to call json requester get', () => {
                const jsonRequesterGetStub = sinon.stub(requester_JSON, 'get');
                data.getTicket('1');
                expect(jsonRequesterGetStub).to.have.been.calledOnce;
                jsonRequesterGetStub.restore();
            });
            it('Expect getTicket to make get request to api/ticket', () => {
                const jsonRequesterGetStub = sinon.stub(requester_JSON, 'get');
                data.getTicket('1');
                expect(jsonRequesterGetStub).to.have.been.calledWith('api/ticket');
                jsonRequesterGetStub.restore();
            });
            it('Expect getTicket to make get request with headers ticket', () => {
                const jsonRequesterGetStub = sinon.stub(requester_JSON, 'get');
                data.getTicket('1');
                expect(jsonRequesterGetStub.args[0][1].headers.ticket).to.be.equal('1');
                jsonRequesterGetStub.restore();
            });
            it('Expect getTicket to make get request with headers ticket', () => {
                const jsonRequesterGetStub = sinon.stub(requester_JSON, 'get');
                localStorage.setItem(AUTH_KEY_LOCAL_STORAGE_KEY, 'valid-auth-key');
                data.getTicket('1');
                expect(jsonRequesterGetStub.args[0][1].headers['x-auth-key']).to.be.equal('valid-auth-key');
                jsonRequesterGetStub.restore();
            });
        });
        describe('getTicketsCount tests', () => {
            it('Expect getTicketsCount to call json requester get', () => {
                const jsonRequesterGetStub = sinon.stub(requester_JSON, 'get');
                const response = {
                    totalTicketsLength: 10
                };
                jsonRequesterGetStub.returns(Promise.resolve(response));
                data.getTicketsCount();
                expect(jsonRequesterGetStub).to.have.been.calledOnce;
                jsonRequesterGetStub.restore();
            });
            it('Expect getTicketsCount to make get request to api/ticketsCount', () => {
                const jsonRequesterGetStub = sinon.stub(requester_JSON, 'get');
                const response = {
                    totalTicketsLength: 10
                };
                jsonRequesterGetStub.returns(Promise.resolve(response));
                data.getTicketsCount();
                expect(jsonRequesterGetStub).to.have.been.calledWith('api/ticketsCount');
                jsonRequesterGetStub.restore();
            });
            it('Expect getTicketsCount to return totalTicketsLength in result property', (done) => {
                const jsonRequesterGetStub = sinon.stub(requester_JSON, 'get');
                const response = {
                    totalTicketsLength: 10
                };
                jsonRequesterGetStub.returns(Promise.resolve(response));
                data.getTicketsCount().then((res) => {
                        expect(res.result).to.be.equal(response.totalTicketsLength);
                    })
                    .then(done, done);
                jsonRequesterGetStub.restore();
            });
            it('Expect getTicketsCount to return maxTicketsPerPage in result property', (done) => {
                const jsonRequesterGetStub = sinon.stub(requester_JSON, 'get');
                const response = {
                    totalTicketsLength: 10
                };
                jsonRequesterGetStub.returns(Promise.resolve(response));
                data.getTicketsCount().then((res) => {
                        expect(res.maxTicketsPerPage).to.be.equal(MAX_TICKET_PER_PAGE);
                    })
                    .then(done, done);
                jsonRequesterGetStub.restore();
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
