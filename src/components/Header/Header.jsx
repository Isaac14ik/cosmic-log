import React from 'react';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header({ onLoginClick }) {
  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__logo">CosmicLog</h1>
        <Navigation onLoginClick={onLoginClick} />
      </div>
    </header>
  );
}

export default Header;