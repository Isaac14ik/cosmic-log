import React from 'react';
import About from '../About/About';
import Preloader from '../Preloader/Preloader';
import './Main.css';

function Main() {
  return (
    <main className="main">
      <h2>Bienvenido al Bitácora Espacial</h2>
      <Preloader />
      <About />
    </main>
  );
}

export default Main;