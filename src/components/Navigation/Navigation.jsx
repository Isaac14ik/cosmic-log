import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation({ onLoginClick }) {
  const location = useLocation();

  return (
    <nav className="navigation">
      <Link 
        to="/" 
        className={`navigation__link ${location.pathname === '/' ? 'navigation__link_active' : ''}`}
      >
        Inicio
      </Link>
      <Link 
        to="/saved-cards" 
        className={`navigation__link ${location.pathname === '/saved-cards' ? 'navigation__link_active' : ''}`}
      >
        Bitácora
      </Link>
      <button 
        type="button" 
        className="navigation__button" 
        onClick={onLoginClick}
      >
        Inicia sesión
      </button>
    </nav>
  );
}

export default Navigation;