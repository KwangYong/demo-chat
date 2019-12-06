const express = require('express');
const router = express.Router();

const authenticationService = require('./../services/authenticationService');
const authenticationMiddleware = require('../middleware/authenticationMiddleware');
const userService = require('../services/userService');
const chatRoomService = require('../services/chatRoomService');
const {go, filter, map} = require("fxjs/Strict");
const sequelize = require('../models').sequelize;

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

router.get('/members', authenticationMiddleware.jwtMiddleware, async (req, res, next) => {

    const members = await go(
        userService.getUsers,
        filter(a => req.user.userNo !== a.userNo),
        map(a => {
            return {userNo: a.userNo, userName: a.name}
        })
    );
    res.json(members);
});

router.post('/chats/:userNo', authenticationMiddleware.jwtMiddleware, async (req, res, next) => {

    sequelize.transaction(async (_) => {
        const room = await go(
            [req.user.userNo, Number(req.params.userNo)],
            chatRoomService.joinChatRoom
        );
        res.json({roomNo: room.chatRoomNo});
    });
});

module.exports = router;
