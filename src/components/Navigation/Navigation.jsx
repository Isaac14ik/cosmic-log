import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

export default function Navigation({ isLoggedIn, currentUser, onOpenPopup, onLogout }) {
  const location = useLocation();
  const isSavedNews = location.pathname === '/saved-cards';

  const handleAuthClick = () => {
    if (isLoggedIn) {
      onLogout();
    } else {
      onOpenPopup({
        title: 'Iniciar sesión',
        buttonText: 'Iniciar sesión',
        type: 'login'
      });
    }
  };

  return (
    <nav className="navigation">
      <Link
        to="/"
        className={`navigation__link ${
          !isSavedNews ? 'navigation__link_active' : ''
        } ${isSavedNews ? 'navigation__link_theme_light' : ''}`}
      >
        Inicio
      </Link>

      {isLoggedIn && (
        <Link
          to="/saved-cards"
          className={`navigation__link ${
            isSavedNews ? 'navigation__link_active' : ''
          } ${isSavedNews ? 'navigation__link_theme_light' : ''}`}
        >
          Artículos guardados
        </Link>
      )}

      <button
        type="button"
        className={`navigation__button ${
          isSavedNews ? 'navigation__button_theme_light' : ''
        }`}
        onClick={handleAuthClick}
      >
        {isLoggedIn ? currentUser?.name || 'Usuario' : 'Iniciar sesión'}
      </button>
    </nav>
  );
}