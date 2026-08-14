import React, { useState } from 'react';
import './Card.css';

function Card({
  card,
  isLoggedIn = false,
  isSaved = false,
  onBookmarkToggle,
  isSavedCardsRoute = false,
  onDeleteCard,
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleBookmarkClick = () => {
    if (!isLoggedIn) return;
    if (onBookmarkToggle) onBookmarkToggle(card);
  };

  const handleDeleteClick = () => {
    if (onDeleteCard) onDeleteCard(card.id);
  };

  return (
    <article className="card">
      <div className="card__image-container">
        <img src={card.url} alt={card.title} className="card__image" />

        {/* Etiqueta del tema (keyword) en la Bitácora */}
        {isSavedCardsRoute && card.keyword && (
          <span className="card__keyword-tag">{card.keyword}</span>
        )}

        {/* Tooltip si no ha iniciado sesión */}
        {!isLoggedIn && !isSavedCardsRoute && showTooltip && (
          <div className="card__tooltip">Inicia sesión para guardar artículos</div>
        )}

        {/* Botón de Guardar en Inicio / Eliminar en Bitácora */}
        {isSavedCardsRoute ? (
          <button
            type="button"
            className="card__tag card__tag_delete"
            onClick={handleDeleteClick}
            aria-label="Eliminar artículo"
            title="Eliminar de la bitácora"
          >
            🗑️
          </button>
        ) : (
          <button
            type="button"
            className={`card__tag ${isSaved ? 'card__tag_active' : ''}`}
            onClick={handleBookmarkClick}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            aria-label="Guardar artículo"
          >
            🔖
          </button>
        )}
      </div>

      <div className="card__content">
        <p className="card__date">{card.date}</p>
        <h3 className="card__title">{card.title}</h3>
        <p className="card__text">{card.explanation}</p>
        {card.source && <span className="card__source">{card.source}</span>}
        {card.link && (
          <a
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            className="card__link"
          >
            Leer artículo completo →
          </a>
        )}
      </div>
    </article>
  );
}

export default Card;