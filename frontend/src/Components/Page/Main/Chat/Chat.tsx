import React, {useEffect, useState, useRef} from 'react';
import './chat.scss';
import { MySocket } from '../../../../scripts/MySocket';
import ChatMessage from './ChatMessage/ChatMessage';
import ChatForm from './ChatForm/ChatForm';
import { socketInterface } from '../../../../scripts/interfaces';

export default function Chat(): string {  
  const [messages, setMessages] = useState([]);
  let socketRef = useRef(null);
  let messagesContainerRef = useRef(null);
  
  useEffect(() => {
    const chatSocket: socketInterface = new MySocket();
    socketRef.current = chatSocket;
    chatSocket.onMessage((event: { data: string; }) => {
      const newStr = event.data;
      const newObj = JSON.parse(newStr);
      setMessages((messagesArg: string) => {
        return (
            newObj.history
              ? newObj.file
              : [...messagesArg, newObj]
          )
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
    if (messagesContainerNode) {
      messagesContainerNode.scroll({
        top: messagesContainerNode.scrollHeight,
        left: 0,
      });
    }
  });

  const sendMessage = (nickName, msg): void => {
    try {
      const sendingDate = new Date();
      const sendMessageObj = {
        msg: msg,
        nickName: nickName,
        date: sendingDate,
      };
      const sendMessageJson = JSON.stringify(sendMessageObj);
      const testObj = JSON.parse(sendMessageJson);
      socketRef.current.sendMessage(sendMessageJson);
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
          messages.map((msg, index: number): string => {
            msg.date = msg.date;
            return (
              <div key={index}>
                <div className="chat__messages-item message">
                  <div className="message__date">{msg.date}</div>
                  <div className="message__author">{msg.author}</div>
                  <div className="message__content">{msg.message}</div>
                </div>
              </div>
            );
            return '';
          })
        }
      </div>
      <ChatForm handleSubmit={sendMessage} />
    </div>
  );
};
