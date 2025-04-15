import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HeaderProps } from '../../types';
import './Header.css';

const Header: React.FC<HeaderProps> = ({ logo, organizationName }) => {
    return (
        <header className="header">
            <div className="header-container">
                <div className="logo-section">
                    <Link to="/">
                        <img src={logo} alt="Organization Logo" className="logo" />
                    </Link>
                    <h1 className="org-name">{organizationName}</h1>
                </div>
                <nav className="nav-menu">
                    <ul>
                        <li><NavLink to="/" end>Home</NavLink></li>
                        <li><NavLink to="/about">About Us</NavLink></li>
                        <li><NavLink to="/programs">Programs</NavLink></li>
                        <li><NavLink to="/events">Events</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;