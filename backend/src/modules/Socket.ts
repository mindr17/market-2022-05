import { IMsgObj, ISocket } from "../types";
// import { addMsgToHistory, getMsgsHistory } from './chat/chatHistory';
import { ChatHistory } from '../chat/chatHistory';
import { MsgObj } from '../MsgObj';

const WebSocketServer = require('websocket').server;

export class Socket implements ISocket {
  private _wsServer;
  private _clients: any[];

  constructor(server) {
    this._clients = [];

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
        console.log('Greeting new client!');
        
        const chatHistory = new ChatHistory();
        const chatHistoryArr = await chatHistory.getHistory();
        console.log('chatHistoryArr: ', chatHistoryArr);



        // await getMsgsHistory();

        // const fileStr: any = await getMsgsHistory();
        // const fileTeplateObj = new MsgObj(fileStr);
        // const fileTemplateArr: IMsgObj[] = [
        //   fileTeplateObj
        // ];
        // // const fileObj =
        // try {
        //   fileObj = JSON.parse(fileStr);
        // } catch(err) {
        //   fileObj = fileTemplateArr;
        //   console.log('History cleared due to error!');
        // }
        // const initialResponse = {
        //   file: fileObj,
        //   history: true,
        // };
        // const initialResponseJson = JSON.stringify(initialResponse);
        // connection.send(initialResponseJson);
        connection.send('console greetings!');
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

          console.log('message saved!');

          const fromClientMsgJson = JSON.stringify(fromClientMsgObj);
          // await addMsgToHistory(fromClientMsgObj);
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
