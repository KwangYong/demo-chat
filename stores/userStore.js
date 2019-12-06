'use strict';

const models = require('./../models');
const {go} = require("fxjs/Strict");

const getUserByEmail = (email) => new Promise((resolve, reject) =>
    models.user.findOne({where: {email: email}})
        .then(value => value ? resolve(value) : reject(value)));

const saveUser = (userInfo) => new Promise((resolve, reject) =>
    models.user.build({
        email: userInfo.email,
        password: userInfo.password
    }).save().then(value => value ? resolve(value) : reject(value)));

const getUsers = () => new Promise(resolve => models.user.findAll().then(value => resolve(value)));

module.exports.getUserByEmail = getUserByEmail;
module.exports.saveUser = saveUser;
module.exports.getUsers = getUsers;
