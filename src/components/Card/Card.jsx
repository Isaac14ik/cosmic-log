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
        <button
          type="button"
          className={`card__tag ${isSaved ? 'card__tag_active' : ''}`}
          onClick={handleSaveClick}
          aria-label="Guardar artículo"
        >
          🔖
        </button>
      </div>
      <div className="card__content">
        <p className="card__date">{card.date}</p>
        <h3 className="card__title">{card.title}</h3>
        <p className="card__text">{card.explanation}</p>
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