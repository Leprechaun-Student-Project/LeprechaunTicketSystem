import * as data from 'data';
import * as requester_JSON from 'json-requester';

const USERNAME_LOCAL_STORAGE_KEY = 'signed-in-user-username',
    AUTH_KEY_LOCAL_STORAGE_KEY = 'signed-in-user-auth-key',
    MAX_TICKET_PER_PAGE = 5,
    NUMBER_PER_PAGE_HEADER = 'number-per-page';

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
        describe('getUsers tests', () => {
            it('Expect getUsers to call json requester get', () => {
                const jsonRequesterGetStub = sinon.stub(requester_JSON, 'get');
                data.getUsers();
                expect(jsonRequesterGetStub).to.have.been.calledOnce;
                jsonRequesterGetStub.restore();
            });
            it('Expect getUsers to make get request to api/users', () => {
                const jsonRequesterGetStub = sinon.stub(requester_JSON, 'get');
                data.getUsers();
                expect(jsonRequesterGetStub).to.have.been.calledWith('api/users');
                jsonRequesterGetStub.restore();
            });
        });
        describe('Login Tests', () => {
            it('Expect login to call json requester put', () => {
                const jsonRequesterPUTStub = sinon.stub(requester_JSON, 'put');
                const passHash = "passHash";
                const CryptoJSStub = sinon.stub(CryptoJS, 'SHA256').returns(passHash);
                const username = 'validUser';
                const pass = "validPass";

                data.login(username, pass);
                expect(jsonRequesterPUTStub).to.have.been.calledOnce;
                jsonRequesterPUTStub.restore();
                CryptoJSStub.restore();
            });
            it('Expect login to make put request to api/auth', () => {
                const jsonRequesterPUTStub = sinon.stub(requester_JSON, 'put');
                const passHash = "passHash";
                const CryptoJSStub = sinon.stub(CryptoJS, 'SHA256').returns(passHash);
                const username = 'validUser';
                const pass = "validPass";

                data.login(username, pass);
                expect(jsonRequesterPUTStub).to.have.been.calledWith('api/auth');
                jsonRequesterPUTStub.restore();
                CryptoJSStub.restore();
            });
            it('Expect CryptoJS.SHA256 to be called', () => {
                const jsonRequesterPUTStub = sinon.stub(requester_JSON, 'put');
                const passHash = "passHash";
                const CryptoJSStub = sinon.stub(CryptoJS, 'SHA256').returns(passHash);
                const username = 'validUser';
                const pass = "validPass";

                data.login(username, pass);
                expect(CryptoJSStub).to.have.been.calledOnce;
                jsonRequesterPUTStub.restore();
                CryptoJSStub.restore();
            });
            it('Expect CryptoJS.SHA256 to be called with the password parameter', () => {
                const jsonRequesterPUTStub = sinon.stub(requester_JSON, 'put');
                const passHash = "passHash";
                const CryptoJSStub = sinon.stub(CryptoJS, 'SHA256').returns(passHash);
                const username = 'validUser';
                const pass = "validPass";

                data.login(username, pass);
                expect(CryptoJSStub).to.have.been.calledWith(pass);
                jsonRequesterPUTStub.restore();
                CryptoJSStub.restore();
            });
            it('Expect login to make put request to api/auth with parameter username', () => {
                const jsonRequesterPUTStub = sinon.stub(requester_JSON, 'put');
                const passHash = "passHash";
                const CryptoJSStub = sinon.stub(CryptoJS, 'SHA256').returns(passHash);
                const username = 'validUser';
                const pass = "validPass";

                data.login(username, pass);
                expect(jsonRequesterPUTStub.args[0][1].data.username).to.be.equal(username);
                jsonRequesterPUTStub.restore();
                CryptoJSStub.restore();
            });
            it('Expect login to make put request to api/auth with parameter passHash crypted by CryptoJS', () => {
                const jsonRequesterPUTStub = sinon.stub(requester_JSON, 'put');
                const passHash = "passHash";
                const CryptoJSStub = sinon.stub(CryptoJS, 'SHA256').returns(passHash);
                const username = 'validUser';
                const pass = "validPass";

                data.login(username, pass);
                expect(jsonRequesterPUTStub.args[0][1].data.passHash).to.be.equal(passHash);
                jsonRequesterPUTStub.restore();
                CryptoJSStub.restore();
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
        describe('getTicketsRange tests', () => {
            it('Expect getTicketsRange to call json requester get', () => {
                const jsonRequesterGetStub = sinon.stub(requester_JSON, 'get');
                jsonRequesterGetStub.returns(Promise.resolve());
                data.getTicketsRange();
                expect(jsonRequesterGetStub).to.have.been.calledOnce;
                jsonRequesterGetStub.restore();
            });
            it('Expect getTicketsRange to make get request to api/tickets', () => {
                const jsonRequesterGetStub = sinon.stub(requester_JSON, 'get');
                jsonRequesterGetStub.returns(Promise.resolve());
                data.getTicketsRange();
                expect(jsonRequesterGetStub).to.have.been.calledWith('api/tickets');
                jsonRequesterGetStub.restore();
            });
            it('Expect getTicketsRange to make get request with headers number-per-page', () => {
                const jsonRequesterGetStub = sinon.stub(requester_JSON, 'get');
                data.getTicketsRange({});
                expect(jsonRequesterGetStub.args[0][1].headers[NUMBER_PER_PAGE_HEADER]).to.be.equal(MAX_TICKET_PER_PAGE);
                jsonRequesterGetStub.restore();
            });
            it('Expect getTicketsRange to make get request with headers passed as parameter', () => {
                const jsonRequesterGetStub = sinon.stub(requester_JSON, 'get');
                const queryParams = {
                    page: 1,
                    engineer: 1
                };
                data.getTicketsRange(queryParams);
                for (const key in queryParams) {
                    expect(jsonRequesterGetStub.args[0][1].headers[key]).to.be.equal(queryParams[key]);
                };
                jsonRequesterGetStub.restore();
            });
            it('Expect getTicketsRange to make get request with headers startDate when date is passed as parameter', () => {
                const jsonRequesterGetStub = sinon.stub(requester_JSON, 'get');
                const queryParams = {
                    date: 1
                };
                data.getTicketsRange(queryParams);
                expect(jsonRequesterGetStub.args[0][1].headers['startDate']).to.be.equal(queryParams['date']);
                jsonRequesterGetStub.restore();
            });
        });
        describe('updateTicket Tests', () => {
            it('Expect updateTicket to call json requester put', () => {
                const jsonRequesterPUTStub = sinon.stub(requester_JSON, 'put');
                const response = {
                    result: "some result"
                };
                jsonRequesterPUTStub.returns(Promise.resolve(response));
                data.updateTicket();
                expect(jsonRequesterPUTStub).to.have.been.calledOnce;
                jsonRequesterPUTStub.restore();
            });
            it('Expect updateTicket to make put request to api/updateTicket', () => {
                const jsonRequesterPUTStub = sinon.stub(requester_JSON, 'put');
                const response = {
                    result: "some result"
                };
                jsonRequesterPUTStub.returns(Promise.resolve(response));
                data.updateTicket();
                expect(jsonRequesterPUTStub).to.have.been.calledWith('api/updateTicket');
                jsonRequesterPUTStub.restore();
            });
            it('Expect updateTicket to make put request with headers x-auth-key', () => {
                const jsonRequesterPUTStub = sinon.stub(requester_JSON, 'put');
                const response = {
                    result: "some result"
                };
                jsonRequesterPUTStub.returns(Promise.resolve(response));
                localStorage.setItem(AUTH_KEY_LOCAL_STORAGE_KEY, 'valid-auth-key');
                data.updateTicket();
                expect(jsonRequesterPUTStub.args[0][1].headers['x-auth-key']).to.be.equal('valid-auth-key');
                jsonRequesterPUTStub.restore();
            });
            it('Expect updateTicket to make put request with data passed as parameter', () => {
                const jsonRequesterPUTStub = sinon.stub(requester_JSON, 'put');
                const response = {
                    result: "some result"
                };
                jsonRequesterPUTStub.returns(Promise.resolve(response));
                localStorage.setItem(AUTH_KEY_LOCAL_STORAGE_KEY, 'valid-auth-key');
                const ticket = {
                    id: 10
                };
                data.updateTicket(ticket);
                expect(jsonRequesterPUTStub.args[0][1].data).to.be.equal(ticket);
                jsonRequesterPUTStub.restore();
            });
            it('Expect updateTicket to return ticket in result property', (done) => {
                const jsonRequesterPUTStub = sinon.stub(requester_JSON, 'put');
                const response = {
                    result: "put-result"
                };
                jsonRequesterPUTStub.returns(Promise.resolve(response));
                data.updateTicket().then((res) => {
                        expect(res.result).to.be.equal(response.result);
                    })
                    .then(done, done);
                jsonRequesterPUTStub.restore();
            });
        });
        describe('sendNewTicket tests', () => {
            it('Expect sendNewTicket to call json requester post', () => {
                const jsonRequesterPOSTStub = sinon.stub(requester_JSON, 'post');
                const resp = {
                    result: "some result"
                }
                jsonRequesterPOSTStub.returns(Promise.resolve(resp));
                data.sendNewTicket();
                expect(jsonRequesterPOSTStub).to.have.been.calledOnce;
                jsonRequesterPOSTStub.restore();
            });
            it('Expect sendNewTicket to make post request to api/newticket', () => {
                const jsonRequesterPOSTStub = sinon.stub(requester_JSON, 'post');
                const resp = {
                    result: "some result"
                }
                jsonRequesterPOSTStub.returns(Promise.resolve(resp));
                data.sendNewTicket();
                expect(jsonRequesterPOSTStub).to.have.been.calledWith('api/newticket');
                jsonRequesterPOSTStub.restore();
            });
            it('Expect sendNewTicket to make post request with data passed as parameter', () => {
                const jsonRequesterPOSTStub = sinon.stub(requester_JSON, 'post');
                const resp = {
                    result: "some result"
                }
                jsonRequesterPOSTStub.returns(Promise.resolve(resp));
                const ticket = {
                    id: 10
                };
                data.sendNewTicket(ticket);
                expect(jsonRequesterPOSTStub.args[0][1].data).to.be.equal(ticket);
                jsonRequesterPOSTStub.restore();
            });
            it('Expect sendNewTicket to return result property in responce', (done) => {
                const jsonRequesterPOSTStub = sinon.stub(requester_JSON, 'post');
                const response = {
                    result: "post-result"
                };
                jsonRequesterPOSTStub.returns(Promise.resolve(response));
                data.sendNewTicket().then((res) => {
                        expect(res.result).to.be.equal(response.result);
                    })
                    .then(done, done);
                jsonRequesterPOSTStub.restore();
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
