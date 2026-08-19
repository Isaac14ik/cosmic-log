import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';

export default function Header({ isLoggedIn, currentUser, onOpenPopup, onLogout }) {
  const location = useLocation();
  const isSavedNews = location.pathname === '/saved-cards';

  return (
    <header className={`header ${isSavedNews ? 'header_theme_light' : ''}`}>
      <div className="header__container">
        <Link
          to="/"
          className={`header__logo ${isSavedNews ? 'header__logo_theme_light' : ''}`}
        >
          Cosmic Log
        </Link>
        <Navigation
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          onOpenPopup={onOpenPopup}
          onLogout={onLogout}
        />
      </div>
    </header>
  );
}