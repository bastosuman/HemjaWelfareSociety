import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Hemja Welfare Society. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 