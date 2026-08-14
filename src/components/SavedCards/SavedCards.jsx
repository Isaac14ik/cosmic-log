import React from 'react';
import SavedCardsHeader from '../SavedCardsHeader/SavedCardsHeader';
import Card from '../Card/Card';
import './SavedCards.css';

function SavedCards({ currentUser, savedArticles = [], onDeleteCard }) {
  // Extraer las palabras clave únicas de los artículos guardados
  const keywords = [...new Set(savedArticles.map((art) => art.keyword))].filter(Boolean);

  return (
    <div className="saved-cards-page">
      <SavedCardsHeader
        username={currentUser.name}
        count={savedArticles.length}
        keywords={keywords}
      />

      <section className="saved-cards__content">
        {savedArticles.length === 0 ? (
          <div className="saved-cards__empty">
            <p>Aún no has guardado ningún artículo en tu bitácora cósmica.</p>
          </div>
        ) : (
          <div className="cards-section__grid">
            {savedArticles.map((card) => (
              <Card
                key={card.id}
                card={card}
                isLoggedIn={true}
                isSavedCardsRoute={true}
                onDeleteCard={onDeleteCard}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default SavedCards;