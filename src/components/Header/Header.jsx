import { NavLink, Link } from 'react_router-dom';
import './Header.css';

export default function Header({ isLoggedIn, onLoginClick, onLogout, currentUser }) {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          Cosmic Log
        </Link>
        <nav className="header__nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `header__link ${isActive ? 'header__link_active' : ''}`
            }
          >
            Inicio
          </NavLink>
          {isLoggedIn ? (
            <>
              <NavLink
                to="/saved-cards"
                className={({ isActive }) =>
                  `header__link ${isActive ? 'header__link_active' : ''}`
                }
              >
                Artículos guardados
              </NavLink>
              <button
                type="button"
                className="header__button header__button_logout"
                onClick={onLogout}
              >
                {currentUser?.name || 'Usuario'}
                <svg className="header__logout-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </button>
            </>
          ) : (
            <button
              type="button"
              className="header__button header__button_login"
              onClick={onLoginClick}
            >
              Iniciar sesión
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}