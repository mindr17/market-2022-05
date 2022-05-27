import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import Header from './Header/Header';
 
export default function PageTitle() {
  return (
    <div className="page">
      <Header />
      {/* <Main /> */}
      {/* <Footer /> */}
    </div>
  );
}

ReactDOM.render(
  <PageTitle />,
  document.getElementById("app")
);
