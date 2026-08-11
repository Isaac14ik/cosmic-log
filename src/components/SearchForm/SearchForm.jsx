import React, { useState } from 'react';
import './SearchForm.css';

function SearchForm() {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Buscando:', query);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <h2 className="search-form__title">¿Qué quieres explorar hoy?</h2>
      <p className="search-form__subtitle">
        Encuentra las últimas novedades sobre el espacio, estrellas y galaxias.
      </p>
      <div className="search-form__field">
        <input
          type="text"
          className="search-form__input"
          placeholder="Introduce un tema (ej. Marte, Nebulosa...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="submit" className="search-form__button">
          Buscar
        </button>
      </div>
    </form>
  );
}

export default SearchForm;