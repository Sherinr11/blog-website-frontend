// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './assets/Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">The Blog</Link>
        <div className="navbar-links">
          <Link to="/posts" className="navbar-link">Read Blogs</Link>
          <Link to="/addpost" className="navbar-link">Add Blog</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
