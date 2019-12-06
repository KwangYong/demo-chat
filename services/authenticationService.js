'use strict';
const jwt = require('jsonwebtoken');
const {go, goS} = require("fxjs/Strict");
const userStore = require('../stores/userStore');
const cryptoService = require('../services/cryptoService');

const login = async (email, password) => goS(
    email,
    cryptoService.encrypt,
    userStore.getUserByEmail,
    a => cryptoService.verifyHash(password, a.password) ? a : Promise.reject(),
    createJwt,
);

const join = async (email, password) => go(
    email,
    cryptoService.encrypt,
    userStore.getUserByEmail,
    a => a ? Promise.reject(new Error("Exist email")) : Promise.resolve(a),
    {email: cryptoService.encrypt(email), password: cryptoService.hash(password)},
    userStore.saveUser,
    createJwt
);

const createJwt = (user) => {
    const token = jwt.sign(
        {
            email: user.email,
            name: user.name,
            userNo: user.userNo,
        },
        'test',
        {
            expiresIn: '100000m'
        });
    return Promise.resolve(token);
};

const verifyJwt = (token) => new Promise(
    (resolve, reject) => {
        jwt.verify(token, 'test', (error, decoded) => {
            if (error) reject(error);
            resolve(decoded);
        });
    }
);

module.exports.login = login;
module.exports.join = join;
module.exports.verifyJwt = verifyJwt;
