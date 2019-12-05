const assert = require('assert');
const sinon = require('sinon');
const userStore = require('../../stores/userStore');
const authenticationService = require('../../services/authenticationService.js');

it('should be ok', async () => {
    const password = 'password';
    const email = 'email';
    const userNo = 1;
    sinon.stub(userStore, 'getUserByEmail').returns(Promise.resolve(
        {userNo: userNo, email: email, password: password}
    ));
    const userInfo = await authenticationService.login(email, password);

});

it('should be ok', async () => {
    const password = 'password';
    const email = 'email';
    const userNo = 1;

    const userInfo = await authenticationService.login(email, password);

    assert.equal(email, userInfo.email);
    assert.equal(password, userInfo.password);
    assert.equal(userNo, userInfo.userNo);
});

afterEach(() => {
    sinon.restore();
});
