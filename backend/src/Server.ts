import http from 'http';
import IServer from './types';

export class Server implements IServer {
  static _instance: IServer;
  private _server: http.Server;
  
  constructor() {
    if (Server._instance){
      throw new Error("Trying to make a second instance of server!");
    }
    Server._instance = this;
    
    this._server = http.createServer(function(request, response) {
      console.log((new Date()) + ' Received request for ' + request.url);
      response.writeHead(404);
      response.end();
    });
    this._server.listen(3000, () => {
      console.log((new Date()) + ' Server is listening on port 3000');
    });
  }

  public get server() {
    return this._server;
  }
}
