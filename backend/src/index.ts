import { IServer } from './types';
// import { addMsgToHistory, getMsgsHistory } from './chat/chatHistory';
import { Server } from './Server';
import { Socket } from './Socket';
import { DbConnection } from './DbConnection';

const dbConnection = new DbConnection();
const db = dbConnection.db;

const serverObj: IServer = new Server();
const server = serverObj.server;

const socket = new Socket(server);
