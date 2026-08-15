import authorImage from '../../images/YoMismo.jpeg';
import './About.css';

export default function About() {
  return (
    <section className="about">
      <div className="about__container">
        <div className="about__avatar-wrapper">
          <img
            src={authorImage}
            alt="Jorge Isaac Nava Hernandez"
            className="about__avatar"
          />
        </div>
        <div className="about__content">
          <h2 className="about__title">
            Acerca del autor: <span className="about__title-highlight">Jorge Isaac Nava Hernandez</span>
          </h2>
          <p className="about__description">
            ¡Hola! Soy Jorge Isaac Nava Hernandez, un desarrollador enfocado en crear aplicaciones web
            modernas, eficientes y adaptables usando tecnologías como <strong>React</strong>, 
            <strong> JavaScript</strong> y <strong>CSS semántico</strong>.
          </p>
          <p className="about__description">
            Este proyecto, <strong>Cosmic Log</strong>, forma parte de mi portafolio profesional en
            TripleTen, integrando consultas a APIs externas de la industria aeroespacial y
            gestión avanzada de interfaz.
          </p>
        </div>
      </div>
    </section>
  );
}