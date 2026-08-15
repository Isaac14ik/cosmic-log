import './Preloader.css';

export default function Preloader() {
  return (
    <div className="preloader">
      <div className="preloader__circle"></div>
      <p className="preloader__text">Buscando noticias en el cosmos...</p>
    </div>
  );
}