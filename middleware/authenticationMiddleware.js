'use strict';

const authenticationService = require('../services/authenticationService');

exports.jwtMiddleware = async (req, res, next) => {
    const token = req.headers['access-token'];
    if (!token) next("required token");

    try {
        const decoded = await authenticationService.verifyJwt(token);

        req.user = decoded;
    } catch (e) {
        req.user = null;
    }

    next();
};