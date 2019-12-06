'use strict';

const models = require('./../models');
const {go, forEach} = require("fxjs/Strict");
module.exports.getChatRoomsByUserNo = (userNo) =>
    new Promise(resolve => {
        models.chatRoom.findAll({
            include: [{
                model: models.chatMember,
                where: {userNo: userNo}
            }]
        }).then(res => resolve(res));
    });

module.exports.saveMembers = async (userNos, roomNo) =>
    await go(
        userNos,
        forEach(a => new Promise(resolve => {
            models.chatMember.build({userNo: a, roomNo: roomNo}).save().then(res => resolve(res))
        })),
    );
