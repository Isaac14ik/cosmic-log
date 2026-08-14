import React, { useState } from 'react';
import './SearchForm.css';

function SearchForm({ onSearchSubmit }) {
  const [keyword, setKeyword] = useState('');
  const [placeholder, setPlaceholder] = useState('Introduce un tema (ej. Marte, NASA)');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!keyword.trim()) {
      setPlaceholder('Por favor, introduzca una palabra clave');
      return;
    }
    onSearchSubmit(keyword);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        className={`search-form__input ${placeholder.includes('Por favor') ? 'search-form__input_error' : ''}`}
        placeholder={placeholder}
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
          if (placeholder.includes('Por favor')) {
            setPlaceholder('Introduce un tema (ej. Marte, NASA)');
          }
        }}
      />
      <button type="submit" className="search-form__button">
        Buscar
      </button>
    </form>
  );
}

export default SearchForm;