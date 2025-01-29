import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/" data-icon="🏠"><span>Home</span></Link>
        </li>
        <li>
          <Link to="/general-policy" data-icon="📄"><span>General Policy</span></Link>
        </li>
        <li>
          <Link to="/editorial-board" data-icon="👥"><span>Editorial Board</span></Link>
        </li>
        <li>
          <Link to="/info-for-authors" data-icon="ℹ️"><span>Info for Authors</span></Link>
        </li>
        <li>
          <Link to="/all-issues" data-icon="📚"><span>All Issues</span></Link>
        </li>
        <li>
          <Link to="/accepted-papers" data-icon="✔️"><span>Accepted Papers</span></Link>
        </li>
        <li>
          <Link to="/online-submission" data-icon="📤"><span>Online Submission</span></Link>
        </li>
        <li>
          <Link to="/contact" data-icon="✉️"><span>Contact</span></Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
