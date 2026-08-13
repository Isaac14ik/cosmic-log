import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedCards from '../SavedCards/SavedCards';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './App.css';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

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
      
      {/* Definición de Rutas */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/saved-cards" element={<SavedCards />} />
      </Routes>

      <Footer />

      {/* Modal de Iniciar Sesión */}
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

      {/* Modal de Registro */}
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