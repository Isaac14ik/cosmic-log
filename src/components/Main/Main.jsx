import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import CardsSection from '../CardsSection/CardsSection';
import About from '../About/About';
import './Main.css';

function Main() {
  return (
    <main className="main">
      <SearchForm />
      <CardsSection />
      <About />
    </main>
  );
}

export default Main;