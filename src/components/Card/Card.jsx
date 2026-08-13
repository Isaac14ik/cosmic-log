import React, { useState } from 'react';
import './Card.css';

function Card({ card }) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveClick = () => {
    setIsSaved(!isSaved);
  };

  return (
    <article className="card">
      <div className="card__image-container">
        <img src={card.url} alt={card.title} className="card__image" />
        
        {/* Botón interactivo para guardar */}
        <button
          type="button"
          className={`card__save-button ${isSaved ? 'card__save-button_active' : ''}`}
          onClick={handleSaveClick}
          aria-label="Guardar tarjeta"
        >
          {isSaved ? '🔖' : '🏷️'}
        </button>
      </div>

      <div className="card__content">
        <p className="card__date">{card.date}</p>
        <h3 className="card__title">{card.title}</h3>
        <p className="card__description">{card.explanation}</p>
        <span className="card__source">{card.copyright || 'NASA APOD'}</span>
      </div>
    </article>
  );
}

export default Card;