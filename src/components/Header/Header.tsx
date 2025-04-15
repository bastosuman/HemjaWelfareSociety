import React from 'react';
import { HeaderProps } from '../../types';
import './Header.css';

const Header: React.FC<HeaderProps> = ({ logo, organizationName }) => {
    return (
        <header className="header">
            <div className="header-container">
                <div className="logo-section">
                    <img src={logo} alt="Organization Logo" className="logo" />
                    <h1 className="org-name">{organizationName}</h1>
                </div>
                <nav className="nav-menu">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/programs">Programs</a></li>
                        <li><a href="/events">Events</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;