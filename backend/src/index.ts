import http from 'http';
import { ISocket } from './types';
import { httpServer } from './modules/Server';
import { Socket } from './modules/Socket';
import { dbConnection } from './modules/DbConnection';

dbConnection.init().then((): void => {
  const myHttpServer: http.Server = httpServer.instance;
  const socket: ISocket = new Socket(myHttpServer);

  const handleMsg = (argument): void => {
    console.log(`${argument} emitted!`);
  };  
  socket.on('msgEvent', handleMsg);
  socket.on('msgEvent', handleMsg);
});
