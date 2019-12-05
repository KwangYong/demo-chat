'use strict';

const chatRoomStore = require('../stores/chatRoomStore');
const chatMemberStore = require('../stores/chatMemberStore');
const {go, find, every, filter, stopIf, goS} = require("fxjs/Strict");

const getTargetChatRooms = (userNos) =>  goS (
        userNos,
        chatRoomStore.getChatRoomsByUserNo,
        filter(a => a.chatMembers.length == 2),
        find(a => every(b => userNos.includes(b.userNo), a.chatMembers))
);

const joinChatRoom = (userNos) => goS (
        userNos,
        getTargetChatRooms,
        stopIf(a => a),
        chatRoomStore.saveChatRoom,
        a => chatMemberStore.saveMembers(userNos, a.chatRoomNo)
);

module.exports.joinChatRoom = joinChatRoom;
