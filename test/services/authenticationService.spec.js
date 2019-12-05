const assert = require('chai');
const should = require('chai').should();
const sinon = require('sinon');
const userStore = require('../../stores/userStore');
const authenticationService = require('../../services/authenticationService.js');
const cryptoService = require('../../services/cryptoService');

describe('Test suite',  () => {
    it('login', async () => {
        const password = 'password';
        const email = 'email';
        const userNo = 1;
        sinon.stub(userStore, 'getUserByEmail').returns(Promise.resolve(
            {userNo: userNo, email: email, password: password}
        ));
        sinon.stub( cryptoService, 'verifyHash').returns(true);
        const userInfo = await authenticationService.login(email, password);
        should.exist(userInfo);
    });

    it('login_not_exist_a_user', async () => {
        const password = 'password';
        const email = 'email';

        sinon.stub(userStore, 'getUserByEmail').returns(Promise.reject(new Error('no data')));

        authenticationService.login(email, password)
            .then(
                () => Promise.reject(),
                err =>  assert.instanceOf(err, Error)
            )
    });

    afterEach(() => {
        sinon.restore();
    });
});

