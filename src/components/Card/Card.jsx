import { useState } from 'react';
import './Card.css';

export default function Card({
  card,
  savedCards = [],
  isLoggedIn,
  isSavedNewsPage = false,
  onSaveCard,
  onDeleteCard,
  onOpenPopup,
}) {
  const [isHovered, setIsHovered] = useState(false);

  
  const cardTitle = card.title || 'Sin título';
  const cardText = card.description || card.text || 'Sin descripción';
  const cardDate = card.publishedAt || card.date || new Date().toISOString();
  const cardImage =
    card.urlToImage || card.image || 'https://via.placeholder.com/400x225?text=No+Image';
  const cardSource = card.source?.name || card.source || 'Desconocido';
  const cardLink = card.url || card.link || '#';

  const isSaved = savedCards.some(
    (item) => item.link === cardLink || item.url === cardLink || item.id === card.id
  );

  const formatDate = (dateString) => {
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('es-ES', options);
    } catch {
      return dateString;
    }
  };

  const handleBookmarkClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      if (onOpenPopup) {
        onOpenPopup({
          title: 'Iniciar sesión',
          buttonText: 'Iniciar sesión',
          type: 'login',
        });
      }
      return;
    }

    if (isSavedNewsPage) {
      if (onDeleteCard) onDeleteCard(card);
    } else {
      if (onSaveCard) onSaveCard(card);
    }
  };

  return (
    <article className="card">
      <div className="card__image-container">
        <img src={cardImage} alt={cardTitle} className="card__image" />

        {/* Botón flotante para guardar o eliminar */}
        <button
          type="button"
          className={`card__action-button ${
            isSavedNewsPage
              ? 'card__action-button_type_delete'
              : isSaved
              ? 'card__action-button_type_saved'
              : 'card__action-button_type_save'
          }`}
          onClick={handleBookmarkClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={isSavedNewsPage ? 'Eliminar tarjeta' : 'Guardar tarjeta'}
        >
          <svg
            width="14"
            height="19"
            viewBox="0 0 14 19"
            fill={isSaved && !isSavedNewsPage ? '#2F71E5' : 'none'}
            stroke={isSaved && !isSavedNewsPage ? '#2F71E5' : '#B6BCBF'}
            strokeWidth="2"
          >
            {isSavedNewsPage ? (
              <path
                d="M1 1L13 17M13 1L1 17"
                stroke="#1A1B22"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path d="M6.38218 12.7137L1 16.9425V1H13V16.9425L7.61782 12.7137L7 12.2283L6.38218 12.7137Z" />
            )}
          </svg>
        </button>

        {/* Tooltip cuando no ha iniciado sesión o en la página de guardados */}
        {(!isLoggedIn || isSavedNewsPage) && isHovered && (
          <div className="card__tooltip">
            {!isLoggedIn
              ? 'Inicia sesión para guardar artículos'
              : 'Eliminar de guardados'}
          </div>
        )}
      </div>

      {/* Enlace en el contenido de la tarjeta */}
      <a
        href={cardLink}
        target="_blank"
        rel="noopener noreferrer"
        className="card__link"
      >
        <div className="card__content">
          <p className="card__date">{formatDate(cardDate)}</p>
          <h3 className="card__title">{cardTitle}</h3>
          <p className="card__text">{cardText}</p>
          <p className="card__source">{cardSource}</p>
        </div>
      </a>
    </article>
  );
}