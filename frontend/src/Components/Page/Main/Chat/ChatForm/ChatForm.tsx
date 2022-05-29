import React, { useState } from 'react';
import './chat-form.scss';

export default function ChatForm(props) {
  const { handleChange } = props;
  const [inputValue, setInputValue] = useState('Input your msg');

  const onInputChange = () => {

  }

  return (
    <form 
      className="chat__form"
      onSubmit={(e) => {
        e.preventDefault();
        handleChange(inputValue)
      }}
    >
      <input
        className="chat__input"
        onChange={(e) => {setInputValue(e.target.value)}}
        value={inputValue}
      />
      <button className="chat__submit">
        Send
      </button>
    </form>
  );
};
