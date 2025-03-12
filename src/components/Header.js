import React from 'react';
import './App.css';
// import School from '../images/SchoolLogo1.png'

const Header = () => {
  return (
    <header className="header">
      {/* <img src={School} alt="Polymathia Logo" /> */}
      <h1>
        <a href="/" className="large-text" >
      
          Polymathia, Multidisciplinary Journal
        </a>
      </h1>
      {/* <small className="small-text">Faculty of Science</small> */}
    </header>
  );
};

export default Header;
