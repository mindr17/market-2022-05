import React, {useEffect} from 'react';
import './chat-message.scss';

export default function Chat() {
  return (
    <>
    <div className="chat__messages-item message">
      <div className="message__time"></div>
      <div className="message__author"></div>
      <div className="message__content"></div>
    </div>
    </>
  );
};
