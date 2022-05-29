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
  clients.push({
    connection: connection,
    id: 1,
  });
  console.log((new Date()) + ' Connection accepted.');
  const msgHistoryObj: any = await getMsgsHistory();

  connection.on('message', async (message: { type: string; utf8Data: string; }) => {
    if (message.type === 'utf8') {
      const fromClientMsgStr = message.utf8Data;
      const fromClientMsgObj = {
        message: fromClientMsgStr,
        date: new Date(),
        author: 'Author',
      }
      await addMsgToHistory(msgHistoryObj.writeStream, fromClientMsgObj);
      console.log('Received Message: ' + message.utf8Data);
      // connection.sendUTF(message.utf8Data);
      const dataToSend = fromClientMsgStr;
      clients.forEach(function(client) {
        client.connection.send(dataToSend);
        // connection.sendUTF(message.utf8Data);
      });
    }
    // else if (message.type === 'binary') {
    //     console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
    //     connection.sendBytes(message.binaryData);
    // }
  });
  connection.on('close', function(reasonCode, description) {
      console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });
});
