import { IServer } from "./types";
import { addMsgToHistory, getMsgsHistory } from './chat/chatHistory';

const WebSocketServer = require('websocket').server;

export class Socket {
  private _wsServer;

  constructor(server) {
    let clients = [];

    const wsServer = new WebSocketServer({
      httpServer: server,
      autoAcceptConnections: false,
    });
    
    const originIsAllowed = (origin) =>{
      return true;
    }
    
    wsServer.on('request', async (request) => {
      console.log((new Date()) + ' Connection accepted.');
      if (!originIsAllowed(request.origin)) {
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
      }
      const connection = request.accept('echo-protocol', request.origin);
      
      const greetNewClient = async () => {
        clients.push({
          connection: connection,
          id: 1,
        });
        console.log((new Date()) + ' Connection accepted.');
        const fileStr: any = await getMsgsHistory();
        const fileTemplateArr = [
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
            date: fromClientMsgData.date,
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
  }

  // public onMessage(callback): void {
  //   this._socket.onmessage = callback;
  // }
}
