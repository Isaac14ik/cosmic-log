import SearchForm from '../SearchForm/SearchForm';
import CardsSection from '../CardsSection/CardsSection';
import About from '../About/About';
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';

export default function Main({
  onSearch,
  isLoading,
  apiError,
  hasSearched,
  cards,
  visibleCount,
  savedCards,
  isLoggedIn,
  onShowMore,
  onSaveCard,
  onOpenPopup,
}) {
  return (
    <main className="content">
      <SearchForm onSearch={onSearch} />

      {isLoading && <Preloader />}

      {apiError && (
        <section className="results-error">
          <p className="results-error__text">
            Lo sentimos, pero ha ocurrido un error durante la solicitud. Es posible que haya un problema con la conexión o que el servidor no funcione. Por favor, inténtalo más tarde.
          </p>
        </section>
      )}

      {!isLoading && !apiError && hasSearched && cards.length === 0 && (
        <NotFound />
      )}

      {!isLoading && !apiError && cards.length > 0 && (
        <CardsSection
          cards={cards.slice(0, visibleCount)}
          savedCards={savedCards}
          isLoggedIn={isLoggedIn}
          onShowMore={onShowMore}
          hasMoreCards={visibleCount < cards.length}
          onSaveCard={onSaveCard}
          onOpenPopup={onOpenPopup}
        />
      )}

      <About />
    </main>
  );
}