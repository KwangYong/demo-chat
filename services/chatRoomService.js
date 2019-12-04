'use strict';

const chatRoomStore = require('../stores/chatRoomStore');
const chatMemberStore = require('../stores/chatMemberStore');
const {go, find, every, filter, stopIf, goS} = require("fxjs/Strict");

const getTargetChatRooms = async (userNos) => {

    const res = await go(
        userNos,
        chatRoomStore.getChatRoomsByUserNo,
        filter(a => a.chatMembers.length == 2),
        find(a => every(b => userNos.includes(b.userNo), a.chatMembers))
    );

    return res;
};

const joinChatRoom = async (userNos) => {

    const res = await goS(
        userNos,
        getTargetChatRooms,
        stopIf(a => a),
        chatRoomStore.saveChatRoom,
        a => chatMemberStore.saveMembers(userNos, a.chatRoomNo)
    );

    return res;
};

module.exports.joinChatRoom = joinChatRoom;
