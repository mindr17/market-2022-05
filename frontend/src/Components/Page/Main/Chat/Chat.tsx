import React, {useEffect, useState, useRef} from 'react';
import './chat.scss';
import { MySocket } from '../../../../scripts/MySocket';
import ChatMessage from './ChatMessage/ChatMessage';
import ChatForm from './ChatForm/ChatForm';
import { socketInterface } from '../../../../scripts/interfaces';

export default function Chat(): string {  
  const [messages, setMessages] = useState([]);
  let refContainer = useRef(null);
  let messagesContainerRef = useRef(null);
  
  useEffect(() => {
    const chatSocket: socketInterface = new MySocket();
    refContainer.current = chatSocket;
    chatSocket.onMessage((event: { data: string; }) => {
      setMessages((messagesArg: string) => {
        return [...messagesArg, event.data];
      });
    });
    
    return (
      () => {
        chatSocket.destroy();
      }
    );
  }, []);

  useEffect(() => {
    const messagesContainerNode = messagesContainerRef.current;
    // console.log('messagesContainerRef: ', messagesContainerRef);
    if (messagesContainerNode) {
      messagesContainerNode.scroll({
        top: messagesContainerNode.scrollHeight,
        // bottom: 0,
        left: 0,
        behavior: "smooth"
      });
    }
  });


  const sendMessage = (msg: string): void => {
    try {
      // console.log('msg: ', msg);
      // const sendMessageJson = JSON.parse(msgObj);
      const sendMessageJson = msg;
      // console.log('refContainer.current: ', refContainer.current);
      refContainer.current.sendMessage(sendMessageJson);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="main__chat chat">
      <div className="chat__messages"
        ref={messagesContainerRef}
      >
        {
          messages.map((msg: string, index: number): string => {
            return (
              <div key={index}>{msg}</div>
            );
          })
        }
      </div>
      <ChatForm handleChange={sendMessage} />
    </div>
  );
};
