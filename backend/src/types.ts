import EventEmitter from 'events';
import http from 'http';

export interface IServer {
  // instance: http.Server;
}

export interface ISocket extends EventEmitter{
  // on(arg0: string, arg1: () => void);

}

export interface IDbConnection {
  db: any;
}

export interface IMsgObj {
  message: string,
  date: Date | number,
  author: string,
}
