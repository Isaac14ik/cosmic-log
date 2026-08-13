import React from 'react';
import SavedCardsHeader from '../SavedCardsHeader/SavedCardsHeader';
import Card from '../Card/Card';
import './SavedCards.css';

// Tarjetas de muestra en la bitácora
const mockSavedCards = [
  {
    id: 1,
    title: "La Galaxia Andrómeda",
    date: "10 de Agosto, 2026",
    explanation: "Una vista detallada de la galaxia espiral más cercana a la Vía Láctea capturada con alta resolución.",
    url: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Superficie de Marte",
    date: "08 de Agosto, 2026",
    explanation: "Fotografía capturada por el rover Perseverance explorando el cráter Jezero.",
    url: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Nebulosa Carina",
    date: "05 de Agosto, 2026",
    explanation: "Estructuras gigantescas de polvo y gas flotando en el espacio profundo.",
    url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&auto=format&fit=crop"
  }
];

function SavedCards() {
  return (
    <div className="saved-cards-page">
      <SavedCardsHeader savedCount={mockSavedCards.length} />
      <section className="saved-cards-page__section">
        <div className="saved-cards-page__grid">
          {mockSavedCards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default SavedCards;