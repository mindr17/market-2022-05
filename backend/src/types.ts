import http from 'http';

export interface IServer {
  server: http.Server;
}

export interface ISocket {

}

export interface IDbConnection {
  db: any;
}

export interface IMsgObj {
  message: string,
  date: Date,
  author: string,
}
