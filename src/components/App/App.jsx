import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedCards from '../SavedCards/SavedCards';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

import './App.css';

import thirdPartyApi from '../../utils/ThirdPartyApi';
import {
  CARDS_PER_PAGE,
  SEARCH_KEYWORD_STORAGE_KEY,
} from '../../utils/constants';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '' });
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);
  const [apiError, setApiError] = useState(false);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupConfig, setPopupConfig] = useState({
    title: 'Iniciar sesión',
    buttonText: 'Iniciar sesión',
    type: 'login',
  });

  const handleSearch = (keyword) => {
    setIsLoading(true);
    setHasSearched(true);
    setApiError(false);
    localStorage.setItem(SEARCH_KEYWORD_STORAGE_KEY, keyword);

    thirdPartyApi
      .searchArticles(keyword)
      .then((data) => {
        setCards(data.articles || []);
        setVisibleCount(CARDS_PER_PAGE);
      })
      .catch((err) => {
        console.error(err);
        setApiError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const savedKeyword =
      localStorage.getItem(SEARCH_KEYWORD_STORAGE_KEY) || 'space';

    thirdPartyApi
      .searchArticles(savedKeyword)
      .then((data) => {
        setCards(data.articles || []);
        setHasSearched(true);
      })
      .catch((err) => {
        console.error(err);
        setApiError(true);
      });
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + CARDS_PER_PAGE);
  };

  const handleSaveCard = (cardToSave) => {
    setSavedCards((prevSaved) => {
      const isAlreadySaved = prevSaved.some(
        (item) => item.link === cardToSave.link || item.id === cardToSave.id
      );

      if (isAlreadySaved) {
        return prevSaved.filter(
          (item) => item.link !== cardToSave.link && item.id !== cardToSave.id
        );
      } else {
        return [...prevSaved, cardToSave];
      }
    });
  };

  const handleDeleteCard = (cardToDelete) => {
    setSavedCards((prevSaved) =>
      prevSaved.filter(
        (item) =>
          item.link !== cardToDelete.link && item.id !== cardToDelete.id
      )
    );
  };

  const openPopup = (config) => {
    setPopupConfig(config);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleToggleForm = () => {
    if (popupConfig.type === 'login') {
      setPopupConfig({
        title: 'Inscribirse',
        buttonText: 'Inscribirse',
        type: 'register',
      });
    } else {
      setPopupConfig({
        title: 'Iniciar sesión',
        buttonText: 'Iniciar sesión',
        type: 'login',
      });
    }
  };

  const handleAuthSubmit = ({ email, name }) => {
    // Si la persona ingresó un nombre lo usa, de lo contrario usa la parte previa al '@' del correo o 'Jorge' por defecto
    const displayName =
      name || (email ? email.split('@')[0] : 'Jorge');

    setIsLoggedIn(true);
    setCurrentUser({ name: displayName });
    closePopup();
  };

  return (
    <div className="page">
      <Header
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onOpenPopup={openPopup}
        onLogout={() => setIsLoggedIn(false)}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Main
              onSearch={handleSearch}
              isLoading={isLoading}
              apiError={apiError}
              hasSearched={hasSearched}
              cards={cards}
              visibleCount={visibleCount}
              savedCards={savedCards}
              isLoggedIn={isLoggedIn}
              onShowMore={handleShowMore}
              onSaveCard={handleSaveCard}
              onOpenPopup={openPopup}
            />
          }
        />

        <Route
          path="/saved-cards"
          element={
            <SavedCards
              savedCards={savedCards}
              isLoggedIn={isLoggedIn}
              onDeleteCard={handleDeleteCard}
            />
          }
        />
      </Routes>

      <Footer />

      {isPopupOpen && (
        <PopupWithForm
          isOpen={isPopupOpen}
          onClose={closePopup}
          title={popupConfig.title}
          buttonText={popupConfig.buttonText}
          type={popupConfig.type}
          onToggleForm={handleToggleForm}
          onSubmit={handleAuthSubmit}
        />
      )}
    </div>
  );
}