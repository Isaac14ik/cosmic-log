import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">© {new Date().getFullYear()} CosmicLog - Proyecto Final Tripleten</p>
    </footer>
  );
}

export default Footer;