import SavedCardsHeader from '../SavedCardsHeader/SavedCardsHeader';
import Card from '../Card/Card';
import './SavedCards.css';

export default function SavedCards({
  savedCards = [],
  isLoggedIn,
  onDeleteCard,
}) {
  return (
    <section className="saved-cards">
      <SavedCardsHeader savedCards={savedCards} />

      <div className="saved-cards__container">
        {savedCards.length > 0 ? (
          <div className="saved-cards__grid">
            {savedCards.map((card, index) => (
              <Card
                key={card.id || card.link || index}
                card={card}
                savedCards={savedCards}
                isLoggedIn={isLoggedIn}
                isSavedNewsPage={true}
                onDeleteCard={onDeleteCard}
              />
            ))}
          </div>
        ) : (
          <p className="saved-cards__empty">
            Aún no has guardado ningún artículo.
          </p>
        )}
      </div>
    </section>
  );
}