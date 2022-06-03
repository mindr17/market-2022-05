import { IDbConnection, IServer, ISocket } from './types';
// import { addMsgToHistory, getMsgsHistory } from './chat/chatHistory';
import { Server } from './modules/Server';
import { Socket } from './modules/Socket';
import { dbConnection } from './modules/DbConnection';

dbConnection.init().then((): void => {
  const serverObj: IServer = new Server();
  const server = serverObj.server;
  console.log('index.ts 1');
  const socket: ISocket = new Socket(server);
})
