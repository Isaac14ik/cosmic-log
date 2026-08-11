import React from 'react';
import './SavedCards.css';

function SavedCards() {
  return (
    <div className="saved-cards">
      <h2 className="saved-cards__title">Tus Tarjetas Guardadas</h2>
      <p className="saved-cards__subtitle">
        Aquí aparecerán las publicaciones o elementos astronómicos que hayas guardado.
      </p>
    </div>
  );
}

export default SavedCards;