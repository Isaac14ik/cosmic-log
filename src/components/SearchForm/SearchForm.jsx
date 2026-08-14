import React, { useState } from 'react';
import './SearchForm.css';

function SearchForm({ onSearchSubmit }) {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      onSearchSubmit(keyword);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-form__input"
        placeholder="Introduce un tema (ej. Marte, Nebulosa, NASA...)"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        required
      />
      <button type="submit" className="search-form__button">
        Buscar
      </button>
    </form>
  );
}

export default SearchForm;