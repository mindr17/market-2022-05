import React from 'react';
import './header.scss';

const toggleChat = () => {
  
};

export default function Header() {
  return (
    <header className="header">
      <div className="header__logo logo">
        <a href="" className="logo__link">
          Market22
        </a>
      </div>
      {/* <Menu-mobile /> */}
      {/* <nav className="navigation">
        <ul className="navigation-mobile__list">
          li.
        </ul>
      </nav> */}
      <button className="chat-button" onClick={ toggleChat }>
        Open chat
      </button>
    </header>
  );
}
