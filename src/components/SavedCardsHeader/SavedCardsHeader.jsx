import './SavedCardsHeader.css';

export default function SavedCardsHeader({ currentUser, savedCount, keywords }) {
  return (
    <section className="saved-cards-header">
      <div className="saved-cards-header__container">
        <p className="saved-cards-header__subtitle">Artículos guardados</p>
        <h1 className="saved-cards-header__title">
          {currentUser?.name || 'Usuario'}, tienes {savedCount} artículos guardados
        </h1>
        {keywords.length > 0 && (
          <p className="saved-cards-header__keywords">
            Por palabras clave:{' '}
            <span className="saved-cards-header__keywords-bold">
              {keywords.join(', ')}
            </span>
          </p>
        )}
      </div>
    </section>
  );
}