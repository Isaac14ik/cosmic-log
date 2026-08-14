import React from 'react';
import Card from '../Card/Card';
import './CardsSection.css';

function CardsSection({
  articles,
  totalArticlesCount,
  visibleCount,
  onShowMore,
  isLoggedIn,
  savedArticles = [],
  onBookmarkToggle,
}) {
  const showMoreButton = visibleCount < totalArticlesCount;

  return (
    <section className="cards-section">
      <h2 className="cards-section__title">Resultados de la búsqueda</h2>
      <div className="cards-section__grid">
        {articles.map((card) => {
          const isSaved = savedArticles.some((item) => item.id === card.id);
          return (
            <Card
              key={card.id}
              card={card}
              isLoggedIn={isLoggedIn}
              isSaved={isSaved}
              onBookmarkToggle={onBookmarkToggle}
            />
          );
        })}
      </div>
      {showMoreButton && (
        <button className="cards-section__more-button" onClick={onShowMore}>
          Mostrar más
        </button>
      )}
    </section>
  );
}

export default CardsSection;