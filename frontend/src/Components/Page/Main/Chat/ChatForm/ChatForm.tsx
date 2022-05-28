import React, { useState } from 'react';
import './chat-form.scss';

export default function ChatForm(props) {
  const { handleChange } = props;
  const [inputValue, setInputValue] = useState('Input your msg');

  const onInputChange = () => {

  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleChange(inputValue)
    }}>
      <input
        onChange={(e) => {setInputValue(e.target.value)}}
        value={inputValue}
      />
      <button>
        Добавить
      </button>
    </form>
  );
};
