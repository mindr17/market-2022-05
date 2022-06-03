import { IMsgObj, ISocket } from "../types";
// import { addMsgToHistory, getMsgsHistory } from './chat/chatHistory';
import { ChatHistoryController } from '../chat/ChatHistoryController';
import { MsgObj } from '../MsgObj';

const WebSocketServer = require('websocket').server;

export class Socket implements ISocket {
  private _clients: any[];
  private _chatHistoryController: ChatHistoryController;

  constructor(server) {
    this._clients = [];
    this._chatHistoryController = new ChatHistoryController();

    const wsServer = new WebSocketServer({
      httpServer: server,
      autoAcceptConnections: false,
    });
    
    const originIsAllowed = (origin) =>{
      return true;
    }

    wsServer.on('request', async (request: { origin: string; reject: () => void; accept: (arg0: string, arg1: any) => any; }) => {
      console.log((new Date()) + ' Connection accepted.');
      if (!originIsAllowed(request.origin)) {
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
      }
      const connection = request.accept('echo-protocol', request.origin);
      
      const greetNewClient = async () => {
        this._clients.push({
          connection: connection,
          id: 1,
        });
        console.log(`Greeting new client from ${request.origin}!`);
        
        const chatHistoryArr = await this._chatHistoryController.getHistory();

        const initialResponse = {
          file: chatHistoryArr,
          history: true,
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
          };

          await this._chatHistoryController.saveMessage(fromClientMsgObj);

          console.log('message saved!');

          const fromClientMsgJson = JSON.stringify(fromClientMsgObj);
          const dataToSend = fromClientMsgJson;
          this._clients.forEach((client) => {
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
