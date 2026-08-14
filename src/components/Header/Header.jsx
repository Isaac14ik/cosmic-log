import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header({ isLoggedIn, currentUser, onLoginClick, onLogoutClick }) {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          CosmicLog
        </Link>
        <Navigation
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          onLoginClick={onLoginClick}
          onLogoutClick={onLogoutClick}
        />
      </div>
    </header>
  );
}

export default Header;