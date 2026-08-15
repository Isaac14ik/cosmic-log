import Card from '../Card/Card';
import './CardsSection.css';

export default function CardsSection({
  cards,
  visibleCount,
  onShowMore,
  onBookmarkClick,
  isLoggedIn
}) {
  return (
    <section className="cards-section">
      <div className="cards-section__container">
        <h2 className="cards-section__title">Resultados de la búsqueda</h2>
        <div className="cards-section__grid">
          {cards.slice(0, visibleCount).map((card) => (
            <Card
              key={card.id}
              card={card}
              onBookmarkClick={onBookmarkClick}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
        {visibleCount < cards.length && (
          <button
            type="button"
            className="cards-section__more-button"
            onClick={onShowMore}
          >
            Mostrar más
          </button>
        )}
      </div>
    </section>
  );
}