import { useState } from 'react';
import './SearchForm.css';

export default function SearchForm({ onSearch, isLoading }) {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    onSearch(keyword);
  };

  return (
    <section className="hero">
      <div className="hero__container">
        <h1 className="hero__title">¿Qué está pasando en el cosmos?</h1>
        <p className="hero__subtitle">
          Encuentra las últimas noticias sobre la exploración espacial y guarda tus artículos favoritos.
        </p>
        <form className="search-form" onSubmit={handleSubmit}>
          <label htmlFor="search-input" className="search-form__label">
            Buscar noticias espaciales
          </label>
          <div className="search-form__wrapper">
            <input
              id="search-input"
              className="search-form__input"
              type="text"
              placeholder="Introduce un tema (ej. mars, moon, nasa)"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              required
            />
            <button
              className="search-form__button"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}