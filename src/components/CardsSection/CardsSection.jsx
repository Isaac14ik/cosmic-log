import Card from '../Card/Card';
import './CardsSection.css';

export default function CardsSection({
  cards,
  savedCards,
  isLoggedIn,
  onShowMore,
  hasMoreCards,
  onSaveCard,
  onOpenPopup,
}) {
  return (
    <section className="cards-section">
      <h2 className="cards-section__title">Resultados de la búsqueda</h2>
      <div className="cards-section__container">
        {cards.map((article, index) => {
          const cardData = {
            id: article.url || index,
            title: article.title,
            text: article.description,
            date: article.publishedAt,
            source: article.source?.name || 'Fuente',
            image: article.urlToImage || article.image,
            link: article.url,
          };

          return (
            <Card
              key={cardData.id + '-' + index}
              card={cardData}
              savedCards={savedCards}
              isLoggedIn={isLoggedIn}
              onSaveCard={onSaveCard}
              onOpenPopup={onOpenPopup}
            />
          );
        })}
      </div>
      {hasMoreCards && (
        <button
          type="button"
          className="cards-section__button"
          onClick={onShowMore}
        >
          Ver más
        </button>
      )}
    </section>
  );
}