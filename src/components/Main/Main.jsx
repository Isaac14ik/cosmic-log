import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import CardsSection from '../CardsSection/CardsSection';
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';
import About from '../About/About';
import './Main.css';

function Main({
  onSearchSubmit,
  articles,
  totalArticlesCount,
  visibleCount,
  onShowMore,
  isLoading,
  isNotFound,
  hasError,
  isLoggedIn,
  savedArticles,
  onBookmarkToggle,
}) {
  return (
    <main className="main">
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">¿Qué quieres explorar hoy?</h1>
          <p className="hero__subtitle">
            Encuentra las últimas novedades sobre el espacio, estrellas y galaxias.
          </p>
          <SearchForm onSearchSubmit={onSearchSubmit} />
        </div>
      </section>

      {isLoading && <Preloader />}
      {isNotFound && !isLoading && <NotFound />}
      {hasError && !isLoading && (
        <div className="main__error-message">
          <p>
            Lo sentimos, algo ha salido mal durante la solicitud. Es posible que haya un problema
            de conexión o que el servidor no funcione. Por favor, inténtalo más tarde.
          </p>
        </div>
      )}

      {!isLoading && !isNotFound && !hasError && articles.length > 0 && (
        <CardsSection
          articles={articles}
          totalArticlesCount={totalArticlesCount}
          visibleCount={visibleCount}
          onShowMore={onShowMore}
          isLoggedIn={isLoggedIn}
          savedArticles={savedArticles}
          onBookmarkToggle={onBookmarkToggle}
        />
      )}

      <About />
    </main>
  );
}

export default Main;