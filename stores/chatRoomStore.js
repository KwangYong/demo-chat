'use strict';

const models = require('./../models');

module.exports.getChatRoomsByUserNo = (userNo) =>  {
    return new Promise(resolve => {
        models.chatRoom.findAll({
            include: [{
                model: models.chatMember,
                where: { userNo: userNo }
            }]
        }).then(res => resolve(res));
    });
};

module.exports.saveChatRoom = () =>  {
    return new Promise( resolve => {
        models.chatRoom.build().save().then(res => resolve(res));
    });
};

