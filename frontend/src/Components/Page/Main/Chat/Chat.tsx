import React, {useEffect, useState, useRef} from 'react';
import './chat.scss';
import { MySocket } from '../../../../scripts/MySocket';
import ChatMessage from './ChatMessage/ChatMessage';
import ChatForm from './ChatForm/ChatForm';

export default function Chat() {  
  const [messages, setMessages] = useState([]);
  let refContainer = useRef(null);

  useEffect(() => {
    const chatSocket = new MySocket();
    refContainer.current = chatSocket;
    chatSocket.onMessage((event: { data: string; }) => {
      console.log("Получены данные " + event.data);
      setMessages((messagesArg) => {
        return [...messagesArg, event.data]
      });
    });
    return (
      () => {
        chatSocket.destroy();
      }
    );
  }, []);

  useEffect(() => {
    {/* <ChatMessage /> */}
    console.log('Rerendering after message recieved!');
  }, [messages]);
  
  // const update = (isPressedId: number): void => {
  //   this.items[this.listModel.isPressedId].node.classList.add('_pressed');
  // };

  const sendMessage = (msg): void => {
    try {
      console.log('msg: ', msg);
      // const sendMessageJson = JSON.parse(value);
      const sendMessageJson = msg;
      console.log('refContainer.current: ', refContainer.current);
      refContainer.current.sendMessage(sendMessageJson);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="main__chat chat">
      <div className="chat__messages">
        {
          messages.map((msg, index) => {
            return (
              <div key={index}>{msg}</div>
            );
          })
        }
      </div>

      <ChatForm handleChange={sendMessage} />


    </main>
  );
};
