import { useEffect } from 'react';
import './PopupWithForm.css';

export default function PopupWithForm({
  isOpen,
  onClose,
  title,
  children,
  buttonText,
  onSubmit,
  redirectText,
  onRedirect
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="popup" onClick={onClose}>
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          &times;
        </button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__submit">
            {buttonText}
          </button>
        </form>
        {redirectText && (
          <p className="popup__redirect">
            o{' '}
            <button
              type="button"
              className="popup__redirect-button"
              onClick={onRedirect}
            >
              {redirectText}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}