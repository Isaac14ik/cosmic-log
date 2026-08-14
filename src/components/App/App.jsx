import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedCards from '../SavedCards/SavedCards';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import thirdPartyApi from '../../utils/ThirdPartyApi';
import './App.css';

function App() {
  // Modales
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Autenticación simulada
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '' });

  // API y búsqueda
  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  // Tarjetas guardadas en la bitácora
  const [savedArticles, setSavedArticles] = useState([]);

  // Cargar estado inicial desde localStorage al montar App
  useEffect(() => {
    // Restaurar sesión guardada
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
        setIsLoggedIn(true);
      } catch (e) {
        console.error('Error al leer currentUser de localStorage:', e);
      }
    }

    // Restaurar búsquedas previas
    const storedArticles = localStorage.getItem('searchedArticles');
    const storedKeyword = localStorage.getItem('searchKeyword');

    if (storedArticles) {
      try {
        const parsed = JSON.parse(storedArticles);
        setArticles(parsed);
        if (parsed.length === 0) setIsNotFound(true);
      } catch (e) {
        console.error('Error al leer searchedArticles:', e);
      }
    }

    if (storedKeyword) setSearchKeyword(storedKeyword);

    // Restaurar tarjetas guardadas en la bitácora
    const storedSaved = localStorage.getItem('savedArticles');
    if (storedSaved) {
      try {
        setSavedArticles(JSON.parse(storedSaved));
      } catch (e) {
        console.error('Error al leer savedArticles:', e);
      }
    }
  }, []);

  // Manejo de Búsqueda en la API
  const handleSearchSubmit = (keyword) => {
    if (!keyword.trim()) return;

    setIsLoading(true);
    setIsNotFound(false);
    setHasError(false);
    setArticles([]);
    setVisibleCount(3);
    setSearchKeyword(keyword);

    thirdPartyApi
      .searchArticles(keyword)
      .then((data) => {
        const results = data.results || [];
        const formatted = results.map((item) => ({
          id: String(item.id),
          title: item.title,
          date: new Date(item.published_at).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          explanation: item.summary || 'Sin descripción disponible.',
          url: item.image_url || 'https://via.placeholder.com/400x200?text=No+Image',
          link: item.url,
          keyword: keyword,
          source: item.news_site || 'CosmicNews',
        }));

        setArticles(formatted);
        localStorage.setItem('searchedArticles', JSON.stringify(formatted));
        localStorage.setItem('searchKeyword', keyword);

        if (formatted.length === 0) setIsNotFound(true);
      })
      .catch((err) => {
        console.error('Error en búsqueda:', err);
        setHasError(true);
      })
      .finally(() => setIsLoading(false));
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  // Control de Modales
  const closeAllPopups = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  const handleOpenLogin = () => {
    closeAllPopups();
    setIsLoginOpen(true);
  };

  const handleOpenRegister = () => {
    closeAllPopups();
    setIsRegisterOpen(true);
  };

  // Simulación de Login (se extrae el nombre correctamente del correo)
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email') || '';

    // Extraer nombre del correo; si no hay arroba o son solo números, asignar 'Explorador'
    let username = email.includes('@') ? email.split('@')[0] : 'Explorador';
    if (!username || /^\d+$/.test(username)) {
      username = 'Explorador';
    }

    const user = { name: username, email: email };
    setCurrentUser(user);
    setIsLoggedIn(true);
    localStorage.setItem('currentUser', JSON.stringify(user));
    closeAllPopups();
  };

  // Simulación de Registro
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username') || 'Explorador';
    const email = formData.get('email') || '';

    const user = { name: username, email: email };
    setCurrentUser(user);
    setIsLoggedIn(true);
    localStorage.setItem('currentUser', JSON.stringify(user));
    closeAllPopups();
  };

  // Simulación de Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({ name: '' });
    localStorage.removeItem('currentUser');
  };

  // Guardar o eliminar tarjeta de la bitácora
  const handleBookmarkToggle = (card) => {
    if (!isLoggedIn) return;

    const isAlreadySaved = savedArticles.some((item) => item.id === card.id);
    let updatedSaved;

    if (isAlreadySaved) {
      updatedSaved = savedArticles.filter((item) => item.id !== card.id);
    } else {
      updatedSaved = [card, ...savedArticles];
    }

    setSavedArticles(updatedSaved);
    localStorage.setItem('savedArticles', JSON.stringify(updatedSaved));
  };

  // Eliminar tarjeta directamente desde la página /saved-cards
  const handleDeleteSavedCard = (cardId) => {
    const updated = savedArticles.filter((item) => item.id !== cardId);
    setSavedArticles(updated);
    localStorage.setItem('savedArticles', JSON.stringify(updated));
  };

  return (
    <div className="page">
      <Header
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLoginClick={handleOpenLogin}
        onLogoutClick={handleLogout}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Main
              onSearchSubmit={handleSearchSubmit}
              articles={articles.slice(0, visibleCount)}
              totalArticlesCount={articles.length}
              visibleCount={visibleCount}
              onShowMore={handleShowMore}
              isLoading={isLoading}
              isNotFound={isNotFound}
              hasError={hasError}
              isLoggedIn={isLoggedIn}
              savedArticles={savedArticles}
              onBookmarkToggle={handleBookmarkToggle}
            />
          }
        />
        <Route
          path="/saved-cards"
          element={
            <SavedCards
              currentUser={currentUser}
              savedArticles={savedArticles}
              onDeleteCard={handleDeleteSavedCard}
            />
          }
        />
      </Routes>

      <Footer />

      {/* Popup de Iniciar Sesión */}
      <PopupWithForm
        isOpen={isLoginOpen}
        onClose={closeAllPopups}
        title="Iniciar sesión"
        name="login"
        buttonText="Inicia sesión"
        redirectText="Regístrate"
        onRedirectClick={handleOpenRegister}
        onSubmit={handleLoginSubmit}
      >
        <div className="popup__input-group">
          <label className="popup__label">Correo electrónico</label>
          <input
            type="email"
            name="email"
            className="popup__input"
            placeholder="Introduce tu correo electrónico"
            required
          />
        </div>
        <div className="popup__input-group">
          <label className="popup__label">Contraseña</label>
          <input
            type="password"
            name="password"
            className="popup__input"
            placeholder="Introduce tu contraseña"
            required
          />
        </div>
      </PopupWithForm>

      {/* Popup de Registro */}
      <PopupWithForm
        isOpen={isRegisterOpen}
        onClose={closeAllPopups}
        title="Inscribirse"
        name="register"
        buttonText="Inscribirse"
        redirectText="Iniciar sesión"
        onRedirectClick={handleOpenLogin}
        onSubmit={handleRegisterSubmit}
      >
        <div className="popup__input-group">
          <label className="popup__label">Correo electrónico</label>
          <input
            type="email"
            name="email"
            className="popup__input"
            placeholder="Introduce tu correo electrónico"
            required
          />
        </div>
        <div className="popup__input-group">
          <label className="popup__label">Contraseña</label>
          <input
            type="password"
            name="password"
            className="popup__input"
            placeholder="Introduce tu contraseña"
            required
          />
        </div>
        <div className="popup__input-group">
          <label className="popup__label">Nombre de usuario</label>
          <input
            type="text"
            name="username"
            className="popup__input"
            placeholder="Introduce tu nombre de usuario"
            required
          />
        </div>
      </PopupWithForm>
    </div>
  );
}

export default App;