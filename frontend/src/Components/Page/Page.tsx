import React from 'react';
import ReactDOM from "react-dom/client";
import Header from './Header/Header';
import Main from './Main/Main';
// import Footer from './Footer/Footer';
 
export default function Page() {
  return (
    <div className="page">
      <Header />
      <Main />
      {/* <Footer /> */}
    </div>
  );
}

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);
root.render(<Page />);
