import { useState } from 'react';
import './PopupWithForm.css';

export default function PopupWithForm({
  isOpen,
  onClose,
  title,
  children,
  buttonText,
  onSubmit,
  onToggleForm,
  type,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviamos los datos capturados al handler de App
    onSubmit({ email, password, name });
  };

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" onSubmit={handleSubmit}>
          {children || (
            <>
              <label className="popup__label">
                Correo electrónico
                <input
                  type="email"
                  className="popup__input"
                  placeholder="Introduce tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label className="popup__label">
                Contraseña
                <input
                  type="password"
                  className="popup__input"
                  placeholder="Introduce tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
              {type === 'register' && (
                <label className="popup__label">
                  Nombre
                  <input
                    type="text"
                    className="popup__input"
                    placeholder="Introduce tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </label>
              )}
            </>
          )}
          <button type="submit" className="popup__submit-button">
            {buttonText || 'Guardar'}
          </button>
        </form>
        <p className="popup__redirect">
          o{' '}
          <span className="popup__redirect-link" onClick={onToggleForm}>
            {type === 'login' ? 'Inscribirse' : 'Iniciar sesión'}
          </span>
        </p>
      </div>
    </div>
  );
}