import './About.css';

export default function About() {
  return (
    <section className="about">
      <div className="about__container">
        <div className="about__image-container">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80"
            alt="Fotografía del autor"
            className="about__image"
          />
        </div>
        <div className="about__content">
          <h2 className="about__title">Acerca del autor</h2>
          <p className="about__text">
            ¡Hola! Soy un desarrollador enfocado en crear aplicaciones web modernas, eficientes y adaptables usando tecnologías como React, JavaScript y CSS semántico.
          </p>
          <p className="about__text">
            Este proyecto forma parte de mi portafolio profesional en TripleTen, integrando consultas a APIs externas de la industria aeroespacial y gestión avanzada de interfaz.
          </p>
        </div>
      </div>
    </section>
  );
}