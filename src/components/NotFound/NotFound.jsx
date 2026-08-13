import React from 'react';
import './NotFound.css';

function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found__icon">🔍</div>
      <h3 className="not-found__title">No se encontró nada</h3>
      <p className="not-found__text">
        Lo sentimos, pero no encontramos nada que coincida con tus términos de búsqueda.
      </p>
    </section>
  );
}

export default NotFound;