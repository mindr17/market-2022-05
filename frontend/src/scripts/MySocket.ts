export class MySocket {
  private _socket;
  // private _onMessage;

  constructor() {
    const URL = 'ws://localhost:3000/';

    this._socket = new WebSocket(URL, 'echo-protocol');
  
    this._socket.onopen = function() {
      console.log("Соединение установлено.");
    };
    
    this._socket.onclose = function(event) {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }
      console.log('Код: ' + event.code + ' причина: ' + event.reason);
    };
    
    this._socket.onerror = function(error: any) {
      console.log("Ошибка " + error.message);
    };
  }
  
  public onMessage(callback) {
    this._socket.onmessage = callback;
  }

  public sendMessage(socketMsgJson: string) {
    this._socket.send(socketMsgJson);
  }

  destroy() {
    this._socket.disconnect();
  }
}
