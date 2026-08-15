import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import SearchForm from './components/SearchForm/SearchForm';
import CardsSection from './components/CardsSection/CardsSection';
import SavedCards from './components/SavedCards/SavedCards';
import About from './components/About/About';
import Footer from './components/Footer/Footer';
import Preloader from './components/Preloader/Preloader';
import NotFound from './components/NotFound/NotFound';
import PopupWithForm from './components/PopupWithForm/PopupWithForm';
import { thirdPartyApi } from './utils/ThirdPartyApi';
import { CARDS_PER_PAGE, SEARCH_KEYWORD_STORAGE_KEY } from './utils/constants';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '' });
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regName, setRegName] = useState('');

  const handleSearch = (query) => {
    setIsLoading(true);
    setHasSearched(true);
    setVisibleCount(CARDS_PER_PAGE);
    localStorage.setItem(SEARCH_KEYWORD_STORAGE_KEY, query);

    thirdPartyApi
      .getArticles(query)
      .then((data) => {
        const formatted = data.results.map((item) => ({
          id: item.id,
          title: item.title,
          summary: item.summary,
          published_at: item.published_at,
          image_url: item.image_url,
          url: item.url,
          news_site: item.news_site,
          keyword: query,
          isSaved: false,
        }));
        setCards(formatted);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  const handleBookmarkClick = (card) => {
    if (!isLoggedIn) {
      setIsLoginOpen(true);
      return;
    }

    const isAlreadySaved = savedCards.some((item) => item.id === card.id);

    if (isAlreadySaved) {
      setSavedCards(savedCards.filter((item) => item.id !== card.id));
      setCards(cards.map((c) => (c.id === card.id ? { ...c, isSaved: false } : c)));
    } else {
      const newCard = { ...card, isSaved: true };
      setSavedCards([...savedCards, newCard]);
      setCards(cards.map((c) => (c.id === card.id ? { ...c, isSaved: true } : c)));
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setCurrentUser({ name: loginEmail.split('@')[0] || 'Usuario' });
    setIsLoginOpen(false);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setCurrentUser({ name: regName || 'Usuario' });
    setIsRegisterOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({ name: '' });
  };

  return (
    <div className="page">
      <Header
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
        currentUser={currentUser}
      />

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <SearchForm onSearch={handleSearch} isLoading={isLoading} />
              {isLoading && <Preloader />}
              {!isLoading && hasSearched && cards.length === 0 && <NotFound />}
              {!isLoading && cards.length > 0 && (
                <CardsSection
                  cards={cards}
                  visibleCount={visibleCount}
                  onShowMore={() => setVisibleCount((prev) => prev + CARDS_PER_PAGE)}
                  onBookmarkClick={handleBookmarkClick}
                  isLoggedIn={isLoggedIn}
                />
              )}
              <About />
            </main>
          }
        />
        <Route
          path="/saved-cards"
          element={
            <SavedCards
              savedCards={savedCards}
              currentUser={currentUser}
              onBookmarkClick={handleBookmarkClick}
            />
          }
        />
      </Routes>

      <Footer />

      <PopupWithForm
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        title="Iniciar sesión"
        buttonText="Iniciar sesión"
        onSubmit={handleLoginSubmit}
        redirectText="Regístrate"
        onRedirect={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      >
        <label htmlFor="login-email">Correo electrónico</label>
        <input
          id="login-email"
          type="email"
          required
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <label htmlFor="login-password">Contraseña</label>
        <input
          id="login-password"
          type="password"
          required
          value={loginPass}
          onChange={(e) => setLoginPass(e.target.value)}
        />
      </PopupWithForm>

      <PopupWithForm
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        title="Inscribirse"
        buttonText="Inscribirse"
        onSubmit={handleRegisterSubmit}
        redirectText="Iniciar sesión"
        onRedirect={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      >
        <label htmlFor="reg-email">Correo electrónico</label>
        <input
          id="reg-email"
          type="email"
          required
          value={regEmail}
          onChange={(e) => setRegEmail(e.target.value)}
        />
        <label htmlFor="reg-password">Contraseña</label>
        <input
          id="reg-password"
          type="password"
          required
          value={regPass}
          onChange={(e) => setRegPass(e.target.value)}
        />
        <label htmlFor="reg-name">Nombre de usuario</label>
        <input
          id="reg-name"
          type="text"
          required
          value={regName}
          onChange={(e) => setRegName(e.target.value)}
        />
      </PopupWithForm>
    </div>
  );
}