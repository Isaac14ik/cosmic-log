import './SavedCardsHeader.css';

export default function SavedCardsHeader({ savedCards = [] }) {
  // Extraemos las fuentes únicas de las tarjetas guardadas
  const sources = [
    ...new Set(savedCards.map((card) => card.source?.name || card.source)),
  ].filter(Boolean);

  const getKeywordsText = () => {
    if (sources.length === 0) return 'Ninguna';
    if (sources.length === 1) return sources[0];
    if (sources.length === 2) return `${sources[0]} y ${sources[1]}`;
    return `${sources[0]}, ${sources[1]} y ${sources.length - 2} más`;
  };

  return (
    <header className="saved-cards-header">
      <div className="saved-cards-header__container">
        <p className="saved-cards-header__subtitle">Artículos guardados</p>
        <h1 className="saved-cards-header__title">
          Usuario, tienes {savedCards.length} artículos guardados
        </h1>
        <p className="saved-cards-header__keywords">
          Por palabras clave:{' '}
          <span className="saved-cards-header__keywords-bold">
            {getKeywordsText()}
          </span>
        </p>
      </div>
    </header>
  );
}