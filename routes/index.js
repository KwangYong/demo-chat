var express = require('express');
var router = express.Router();
const chatRoomService = require('./../services/chatRoomService');

/* GET home page. */
router.get('/', async function (req, res, next) {
  const test = await chatRoomService.joinChatRoom([1, 2]);
  res.render('index', {title: test});
});

module.exports = router;
