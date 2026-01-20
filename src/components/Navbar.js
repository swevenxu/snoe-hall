import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left - Branding */}
        <div className="navbar-brand">
          {/* Logo removed for now */}
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Center - Navigation Links */}
        <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMenu}>Home</Link></li>
          <li><Link to="/script" className={location.pathname === '/script' ? 'active' : ''} onClick={closeMenu}>Script</Link></li>
          <li><Link to="/contributors" className={location.pathname === '/contributors' ? 'active' : ''} onClick={closeMenu}>Contributors</Link></li>
          <li><a href="https://discord.gg/cQmCTTnW" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>Discord</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
