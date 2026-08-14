import React from 'react';
import './SavedCardsHeader.css';

function SavedCardsHeader({ username, count, keywords = [] }) {
  const renderKeywordsText = () => {
    if (keywords.length === 0) return 'Ninguna';
    if (keywords.length === 1) return keywords[0];
    if (keywords.length === 2) return `${keywords[0]} y ${keywords[1]}`;
    return `${keywords[0]}, ${keywords[1]} y ${keywords.length - 2} más`;
  };

  return (
    <header className="saved-cards-header">
      <p className="saved-cards-header__subtitle">Artículos guardados</p>
      <h1 className="saved-cards-header__title">
        {username}, tienes {count} artículo{count === 1 ? '' : 's'} guardado{count === 1 ? '' : 's'}
      </h1>
      <p className="saved-cards-header__keywords">
        Por palabras clave: <span>{renderKeywordsText()}</span>
      </p>
    </header>
  );
}

export default SavedCardsHeader;