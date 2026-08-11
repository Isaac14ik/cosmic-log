import React from 'react';
import './NotFound.css';

function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found__icon">🔍</div>
      <h3 className="not-found__title">No se encontró nada</h3>
      <p className="not-found__subtitle">
        Lo sentimos, pero nada coincide con tus términos de búsqueda en la galaxia.
      </p>
    </section>
  );
}

export default NotFound;