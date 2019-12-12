const WebSocketServer = require("ws").Server;
const wss = new WebSocketServer({ port: 3001 });
const authenticationService = require('../services/authenticationService');
const chatRoomService = require('../services/chatRoomService');
const clients = new Map();
const {go, tap, map, each} = require("fxjs/Strict");

wss.on("connection", function(ws) {
    ws.on("message", async function(msgString) {
            const msg = JSON.parse(msgString);
            if(msg.type === 'TOKEN') {
                try {
                    go(
                        msg.token,
                        authenticationService.verifyJwt,
                        tap(
                            a => clients.set(a.userNo, ws),
                        )
                    )
                } catch(e) {
                    ws.send(JSON.stringify({type: 'ERROR', msg: 'invalid token'}));
                }
            }  else if(msg.type == 'MESSAGE') {
                if(ws.user === undefined) {
                   return;
                }
                go(
                    [ws.user.userNo, msg.targetUserNo],
                    tap(
                        map(p => clients.get(p)),
                        each(a => a.send(msgString))
                    ),
                    chatRoomService.joinChatRoom,

                )



            } else {
                throw new Error('unknown type');
            }

        console.log("Received: %s", msgString);
    });
    ws.on('error', (error) => {
       console.error(error);
    });
    ws.on('close', (message) => {
        clients.delete(ws.user.userNo);
    });
});


module.exports = wss;