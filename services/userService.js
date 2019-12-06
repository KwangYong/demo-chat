'use strict';

const userStore = require("../stores/userStore");

const getUsers = userStore.getUsers();

module.exports.getUsers = getUsers;