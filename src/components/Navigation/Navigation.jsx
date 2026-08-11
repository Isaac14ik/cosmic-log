import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? "navigation__link navigation__link_active" : "navigation__link"
            }
          >
            Inicio
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink 
            to="/saved-cards" 
            className={({ isActive }) => 
              isActive ? "navigation__link navigation__link_active" : "navigation__link"
            }
          >
            Guardados
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;