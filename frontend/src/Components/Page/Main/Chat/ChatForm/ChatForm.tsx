import React, { useState } from 'react';
import './chat-form.scss';

export default function ChatForm({ handleSubmit }) {
  const [nickName, setNickName] = useState('Name');
  const [inputValue, setInputValue] = useState('Message');
  const handleNicknameChange = (e: { target: { value: string; }; }) => {
    setNickName(e.target.value);
  };
  const handleInputValueChange = (e: { target: { value: string; }; }) => {
    setInputValue(e.target.value);
  };

  return (
    <form 
      className="chat__form"
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit(nickName, inputValue);
      }}
    >
      <div className="chat__texts">
        <input
          size="1"
          className="chat__input-name"
          onChange={handleNicknameChange}
          value={nickName}
        />
        <input
          size="1"
          className="chat__input-message"
          onChange={handleInputValueChange}
          value={inputValue}
        />
        <button className="chat__submit">
          Send
        </button>
      </div>
    </form>
  );
};
