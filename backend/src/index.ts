import http from 'http';
import fs from 'fs';
import path from 'path';
import { addMsgToHistory, getMsgsHistory } from './chat/chatHistory';
// import WebSocketServer from 'websocket/server';
const WebSocketServer = require('websocket').server;

let clients = [];

const server = http.createServer(function(request, response) {
  console.log((new Date()) + ' Received request for ' + request.url);
  response.writeHead(404);
  response.end();
});
server.listen(3000, function() {
  console.log((new Date()) + ' Server is listening on port 3000');
});

const wsServer = new WebSocketServer({
  httpServer: server,
  // You should not use autoAcceptConnections for production
  // applications, as it defeats all standard cross-origin protection
  // facilities built into the protocol and the browser.  You should
  // *always* verify the connection's origin and decide whether or not
  // to accept it.
  autoAcceptConnections: false,
});

const originIsAllowed = (origin) =>{
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

wsServer.on('request', async (request) => {
  if (!originIsAllowed(request.origin)) {
    // Make sure we only accept requests from an allowed origin
    request.reject();
    console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
    return;
  }
  let connection = request.accept('echo-protocol', request.origin);
  
  const greetNewClient = async () => {
    clients.push({
      connection: connection,
      id: 1,
    });
    console.log((new Date()) + ' Connection accepted.');
    const fileStr: any = await getMsgsHistory();
    let fileTemplateArr = [
      {
        message: 'initial template msg',
        date: new Date(),
        author: 'Author',
      }
    ];
    let fileObj = {};
    try {
      fileObj = JSON.parse(fileStr);
    } catch(err) {
      fileObj = fileTemplateArr;
      console.log('History cleared due to error!');
    }
    const initialResponse = {
      file: fileObj,
      history: true
    };
    const initialResponseJson = JSON.stringify(initialResponse);
    connection.send(initialResponseJson);
  };
  await greetNewClient();

  connection.on('message', async (message: { type: string; utf8Data: string; }) => {
    if (message.type === 'utf8') {
      const fromClientMsgStr = message.utf8Data;
      const fromClientMsgData = JSON.parse(fromClientMsgStr);
      const fromClientMsgObj = {
        message: fromClientMsgData.msg,
        date: new Date(),
        author: fromClientMsgData.nickName,
        history: false,
      }
      const fromClientMsgJson = JSON.stringify(fromClientMsgObj);
      await addMsgToHistory(fromClientMsgObj);
      const dataToSend = fromClientMsgJson;
      clients.forEach((client) => {
        client.connection.send(dataToSend);
      });
    }
  });
  connection.on('close', function(reasonCode, description) {
      console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });
});
