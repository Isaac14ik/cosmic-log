import React from 'react';
import './About.css';

function About() {
  return (
    <section className="about">
      <div className="about__card">
        <div className="about__badge">Autor del Proyecto</div>
        <h2 className="about__name">Jorge Isaac Nava Hernández</h2>
        <p className="about__role">Fullstack Developer</p>
        <div className="about__divider"></div>
        <p className="about__description">
          Desarrollador enfocado en crear experiencias web interactivas, funcionales y de alto impacto. 
          Apasionado por la tecnología, el diseño moderno y la exploración espacial, actualmente finalizando su formación especializada en Tripleten.
        </p>
      </div>
    </section>
  );
}

export default About;