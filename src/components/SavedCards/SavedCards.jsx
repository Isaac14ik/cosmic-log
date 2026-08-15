import SavedCardsHeader from '../SavedCardsHeader/SavedCardsHeader';
import Card from '../Card/Card';
import './SavedCards.css';

export default function SavedCards({ savedCards, currentUser, onBookmarkClick }) {
  const keywords = [...new Set(savedCards.map((c) => c.keyword || 'Espacio'))];

  return (
    <main className="saved-cards">
      <SavedCardsHeader
        currentUser={currentUser}
        savedCount={savedCards.length}
        keywords={keywords}
      />
      <section className="saved-cards__content">
        <div className="saved-cards__container">
          <div className="saved-cards__grid">
            {savedCards.map((card) => (
              <Card
                key={card.id}
                card={card}
                onBookmarkClick={onBookmarkClick}
                isLoggedIn={true}
                isSavedPage={true}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}