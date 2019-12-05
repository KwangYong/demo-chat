var express = require('express');
var router = express.Router();
const sequelize = require('../models').sequelize;
const chatRoomService = require('./../services/chatRoomService');

/* GET home page. */
router.get('/', async function (req, res, next) {
  sequelize.transaction( async (_) => {
    const test = await chatRoomService.joinChatRoom([1, 2]);
    res.render('index', {title: test});
  });

});

module.exports = router;
