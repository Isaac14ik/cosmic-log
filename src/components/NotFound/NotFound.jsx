import { NOT_FOUND_TEXT } from '../../utils/constants';
import './NotFound.css';

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found__container">
        <svg className="not-found__icon" viewBox="0 0 96 96" width="96" height="96" fill="none">
          <circle cx="48" cy="48" r="48" fill="#D1D2D6" fillOpacity="0.2" />
          <path d="M48 62c-8 0-14-5-16-10m32 0c-2 5-8 10-16 10zm-10-22a4 4 0 11-8 0 4 4 0 018 0zm20 0a4 4 0 11-8 0 4 4 0 018 0z" stroke="#D1D2D6" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <h2 className="not-found__title">{NOT_FOUND_TEXT}</h2>
        <p className="not-found__text">
          Lo sentimos, pero no hay resultados que coincidan con tu término de búsqueda.
        </p>
      </div>
    </section>
  );
}