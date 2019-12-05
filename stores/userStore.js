'use strict';

const models = require('./../models');
const {go} = require("fxjs/Strict");

const getUserByEmail = (email) => new Promise((resolve, reject) =>
    models.user.findOne({ where:{email: email}})
        .then(res => res? resolve(res) : reject(res) ));

const saveUser = (userInfo) => new Promise((resolve, reject) =>
    models.user.build({email: userInfo.email, password: userInfo.password}).save().then(res => res ? resolve(res) : reject(res)));

module.exports.getUserByEmail = getUserByEmail;
module.exports.saveUser = saveUser;