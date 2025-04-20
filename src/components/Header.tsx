import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <a href="/" className="logo-container">
          <img src="/assets/images/logo.png" alt="Hemja Welfare Society Logo" className="logo" />
          <div className="logo-text">
            <h1 className="organization-name">Hemja Welfare Society</h1>
          </div>
        </a>

        <button 
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

        <nav className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <a href="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</a>
          <a href="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>About</a>
          <a href="/updates" className={`nav-link ${isActive('/updates') ? 'active' : ''}`}>Updates</a>
          <a href="/events" className={`nav-link ${isActive('/events') ? 'active' : ''}`}>Events</a>
          <a href="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header; 