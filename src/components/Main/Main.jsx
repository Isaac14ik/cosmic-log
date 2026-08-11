import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';
import About from '../About/About';
import './Main.css';

function Main() {
  return (
    <main className="main">
      <SearchForm />
      {/* Estos componentes se mostrarán condicionalmente más adelante con la lógica de la API */}
      <Preloader />
      <NotFound />
      <About />
    </main>
  );
}

export default Main;