import React from 'react';
import './main.scss';
import Catalog from './Catalog/Catalog';
import Chat from './Chat/Chat';

export default function Page() {
  return (
    <main className="main">
      <Catalog />
      <Chat />
    </main>
  );
};
