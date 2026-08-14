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
  // Estados para modales
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Estados para la API y búsquedas
  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  // Cargar datos de localStorage al montar el componente App
  useEffect(() => {
    const savedArticles = localStorage.getItem('searchedArticles');
    const savedKeyword = localStorage.getItem('searchKeyword');

    if (savedArticles) {
      try {
        const parsedArticles = JSON.parse(savedArticles);
        setArticles(parsedArticles);
        if (parsedArticles.length === 0) {
          setIsNotFound(true);
        }
      } catch (e) {
        console.error('Error al leer de localStorage:', e);
      }
    }

    if (savedKeyword) {
      setSearchKeyword(savedKeyword);
    }
  }, []);

  // Función para manejar la búsqueda mediante la API de terceros
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
        // La API devuelve un objeto con la propiedad 'results'
        const results = data.results || [];
        
        // Mapeamos los datos al formato que esperan nuestros componentes Card
        const formattedArticles = results.map((item) => ({
          id: item.id,
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
        }));

        setArticles(formattedArticles);

        // Guardar resultados y palabra clave en localStorage
        localStorage.setItem('searchedArticles', JSON.stringify(formattedArticles));
        localStorage.setItem('searchKeyword', keyword);

        if (formattedArticles.length === 0) {
          setIsNotFound(true);
        }
      })
      .catch((err) => {
        console.error('Error al realizar la búsqueda:', err);
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Función para cargar 3 tarjetas más
  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  // Control de modales
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

  return (
    <div className="page">
      <Header onLoginClick={handleOpenLogin} />

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
            />
          }
        />
        <Route path="/saved-cards" element={<SavedCards />} />
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
        onSubmit={(e) => {
          e.preventDefault();
          closeAllPopups();
        }}
      >
        <div className="popup__input-group">
          <label className="popup__label">Correo electrónico</label>
          <input
            type="email"
            className="popup__input"
            placeholder="Introduce tu correo electrónico"
            required
          />
        </div>
        <div className="popup__input-group">
          <label className="popup__label">Contraseña</label>
          <input
            type="password"
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
        onSubmit={(e) => {
          e.preventDefault();
          closeAllPopups();
        }}
      >
        <div className="popup__input-group">
          <label className="popup__label">Correo electrónico</label>
          <input
            type="email"
            className="popup__input"
            placeholder="Introduce tu correo electrónico"
            required
          />
        </div>
        <div className="popup__input-group">
          <label className="popup__label">Contraseña</label>
          <input
            type="password"
            className="popup__input"
            placeholder="Introduce tu contraseña"
            required
          />
        </div>
        <div className="popup__input-group">
          <label className="popup__label">Nombre de usuario</label>
          <input
            type="text"
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