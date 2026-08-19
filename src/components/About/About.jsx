import authorImage from '../../images/YoMismo.jpeg'; 
import './About.css';

export default function About() {
  return (
    <section className="about">
      <div className="about__container">
        <div className="about__avatar-container">
          <img
            src={authorImage}
            alt="Fotografía del autor"
            className="about__avatar"
          />
        </div>
        <div className="about__info">
          <h2 className="about__title">Acerca del autor</h2>
          <p className="about__paragraph">
            ¡Hola! Soy Jorge, desarrollador Web Full Stack con pasión por crear
            interfaces limpias, intuitivas y eficientes. Este proyecto utiliza
            tecnologías como React, JavaScript, HTML5, CSS3 y Vite para consumir
            APIs de noticias en tiempo real.
          </p>
          <p className="about__paragraph">
            A través de mi formación en desarrollo web, he aprendido a construir
            aplicaciones adaptables (responsive) y a gestionar estados complejos
            garantizando siempre una excelente experiencia de usuario.
          </p>
        </div>
      </div>
    </section>
  );
}