import { IDbConnection, IServer, ISocket } from './types';
// import { addMsgToHistory, getMsgsHistory } from './chat/chatHistory';
import { Server } from './Server';
import { Socket } from './Socket';
import { dbConnection } from './DbConnection';

dbConnection.init().then((): void => {
  const serverObj: IServer = new Server();
  const server = serverObj.server;
  console.log(123);
  const socket: ISocket = new Socket(server);
})
