import React, { useEffect } from 'react';
import './PopupWithForm.css';

function PopupWithForm({
  isOpen,
  onClose,
  title,
  name,
  buttonText,
  children,
  onSubmit,
  redirectText,
  onRedirectClick
}) {
  // Manejo de la tecla Escape para cerrar el popup
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Cierre al hacer clic en el overlay oscuro (fuera del modal)
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('popup_opened')) {
      onClose();
    }
  };

  return (
    <div className={`popup popup_type_${name} popup_opened`} onClick={handleOverlayClick}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          &times;
        </button>
        <h3 className="popup__title">{title}</h3>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__submit-button">
            {buttonText}
          </button>
        </form>
        {redirectText && (
          <p className="popup__redirect">
            o{' '}
            <span className="popup__redirect-link" onClick={onRedirectClick}>
              {redirectText}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default PopupWithForm;