import React from 'react';
import './SavedCardsHeader.css';

function SavedCardsHeader({ savedCount = 3, keywords = ['Marte', 'Andrómeda', 'Nebulosa'] }) {
  // Formatear las palabras clave
  const formattedKeywords = keywords.length > 2
    ? `${keywords.slice(0, 2).join(', ')} y ${keywords.length - 2} más`
    : keywords.join(', ');

  return (
    <section className="saved-header">
      <div className="saved-header__container">
        <p className="saved-header__subtitle">Artículos guardados</p>
        <h1 className="saved-header__title">
          Explorador, tienes {savedCount} artículos guardados
        </h1>
        <p className="saved-header__keywords">
          Por palabras clave: <span className="saved-header__keywords-bold">{formattedKeywords}</span>
        </p>
      </div>
    </section>
  );
}

export default SavedCardsHeader;