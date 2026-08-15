import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation({ isLoggedIn, currentUser, onLoginClick, onLogoutClick }) {
  return (
    <nav className="navigation">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `navigation__link ${isActive ? 'navigation__link_active' : ''}`
        }
      >
        Inicio
      </NavLink>

      {isLoggedIn && (
        <NavLink
          to="/saved-cards"
          className={({ isActive }) =>
            `navigation__link ${isActive ? 'navigation__link_active' : ''}`
          }
        >
          Bitácora
        </NavLink>
      )}

      {isLoggedIn ? (
        <button
          type="button"
          className="navigation__button navigation__button_user"
          onClick={onLogoutClick}
        >
          <span>{currentUser.name}</span>
          <span className="navigation__logout-icon">🚪</span>
        </button>
      ) : (
        <button
          type="button"
          className="navigation__button"
          onClick={onLoginClick}
        >
          Iniciar sesión
        </button>
      )}
    </nav>
  );
}

export default Navigation;