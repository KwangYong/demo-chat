const express = require('express');
const router = express.Router();

const authenticationService = require('./../services/authenticationService');
const authenticationMiddleware = require('../middleware/authenticationMiddleware');

router.post('/login', async (req, res, next) => {

  const token = await authenticationService.login(req.body.email, req.body.password);
  res.json({token: token});
});

router.post('/join', async (req, res, next) => {
  try {
    const token = await authenticationService.join(req.body.email, req.body.password);
    res.json({token: token});
  } catch (e) {
    res.status(409).json({error: e.message});
  }
});

router.get('/login-check', (req, res, next) => {
  res.status(200);
});

module.exports = router;
