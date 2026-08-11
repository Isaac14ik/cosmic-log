import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedCards from '../SavedCards/SavedCards';
import Footer from '../Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="page">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/saved-cards" element={<SavedCards />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;