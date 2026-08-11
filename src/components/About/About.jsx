import React from 'react';
import './About.css';

function About() {
  return (
    <section className="about">
      <h2 className="about__title">Acerca del Autor</h2>
      <p className="about__name">Jorge Isaac Nava Hernández</p>
      <p className="about__role">Fullstack Developer</p>
      <p className="about__description">
        Desarrollador enfocado en crear experiencias web interactivas y funcionales. Actualmente finalizando sus estudios en Tripleten y apasionado por la tecnología y la exploración espacial.
      </p>
    </section>
  );
}

export default About;