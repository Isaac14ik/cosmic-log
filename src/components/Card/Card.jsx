import './Card.css';

export default function Card({ card, onBookmarkClick, isLoggedIn, isSavedPage }) {
  const handleBookmark = () => {
    if (onBookmarkClick) {
      onBookmarkClick(card);
    }
  };

  return (
    <article className="card">
      <div className="card__image-container">
        <img src={card.image_url} alt={card.title} className="card__image" />
        <button
          type="button"
          className={`card__bookmark ${card.isSaved ? 'card__bookmark_active' : ''}`}
          onClick={handleBookmark}
          aria-label="Guardar artículo"
        >
          <svg className="card__bookmark-icon" viewBox="0 0 24 24" width="24" height="24">
            <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
          </svg>
        </button>
        {!isLoggedIn && !isSavedPage && (
          <div className="card__tooltip">Inicia sesión para guardar artículos</div>
        )}
      </div>
      <div className="card__content">
        <p className="card__date">
          {new Date(card.published_at).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <h3 className="card__title">{card.title}</h3>
        <p className="card__text">{card.summary}</p>
        <a
          href={card.url}
          target="_blank"
          rel="noopener noreferrer"
          className="card__source"
        >
          {card.news_site}
        </a>
      </div>
    </article>
  );
}