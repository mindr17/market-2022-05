import React from 'react';
import Goods from './Goods/Goods';
import MenusMobile from './MenusMobile/MenusMobile';
 
export default function Page() {
  return (
    <main className="main">
      <MenusMobile />
      <Goods />
    </main>
  );
}
