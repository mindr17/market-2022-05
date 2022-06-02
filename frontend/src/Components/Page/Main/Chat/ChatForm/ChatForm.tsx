import React, { useState } from 'react';
import './chat-form.scss';

export default function ChatForm(props) {
  const { handleSubmit } = props;
  const [nickName, setNickName] = useState('Name');
  const [inputValue, setInputValue] = useState('Message');

  return (
    <form 
      className="chat__form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(nickName, inputValue);
      }}
    >
      <div className="chat__texts">
        <input
          size="1"
          className="chat__input-name"
          onChange={(e) => {setNickName(e.target.value)}}
          value={nickName}
        />
        <input
          size="1"
          className="chat__input-message"
          onChange={(e) => {setInputValue(e.target.value)}}
          value={inputValue}
        />
        <button className="chat__submit">
          Send
        </button>
      </div>
    </form>
  );
};
