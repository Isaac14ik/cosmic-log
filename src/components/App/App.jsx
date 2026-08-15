import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import CardsSection from '../CardsSection/CardsSection';
import SavedCards from '../SavedCards/SavedCards';
import About from '../About/About';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import thirdPartyApi from '../../utils/ThirdPartyApi';
import { CARDS_PER_PAGE, SEARCH_KEYWORD_STORAGE_KEY } from '../../utils/constants';

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

  const [registeredUsers, setRegisteredUsers] = useState([]);

  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');

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
    setLoginError('');

    if (!loginEmail.trim() || !loginPass.trim()) {
      setLoginError('Por favor completa la información de manera apropiada.');
      return;
    }

    const foundUser = registeredUsers.find(
      (u) => u.email === loginEmail && u.password === loginPass
    );

    if (!foundUser && registeredUsers.length > 0) {
      setLoginError('El usuario no existe o la contraseña es incorrecta. ¡Regístrate primero!');
      return;
    }

    const username = foundUser ? foundUser.name : loginEmail.split('@')[0] || 'Usuario';
    setIsLoggedIn(true);
    setCurrentUser({ name: username });
    setIsLoginOpen(false);
    setLoginEmail('');
    setLoginPass('');
    setLoginError('');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegisterError('');

    if (!regEmail.trim() || !regPass.trim() || !regName.trim()) {
      setRegisterError('Por favor completa la información de manera apropiada.');
      return;
    }

    const newUser = { email: regEmail, password: regPass, name: regName };
    setRegisteredUsers([...registeredUsers, newUser]);

    setIsLoggedIn(true);
    setCurrentUser({ name: regName });
    setIsRegisterOpen(false);
    setRegEmail('');
    setRegPass('');
    setRegName('');
    setRegisterError('');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({ name: '' });
  };

  const closeAllPopups = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setLoginError('');
    setRegisterError('');
  };

  return (
    <div className="page">
      <Header
        isLoggedIn={isLoggedIn}
        onLoginClick={() => {
          setLoginError('');
          setIsLoginOpen(true);
        }}
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
        onClose={closeAllPopups}
        title="Iniciar sesión"
        buttonText="Iniciar sesión"
        onSubmit={handleLoginSubmit}
        errorMessage={loginError}
        redirectText="Regístrate"
        onRedirect={() => {
          closeAllPopups();
          setIsRegisterOpen(true);
        }}
      >
        <label htmlFor="login-email">Correo electrónico</label>
        <input
          id="login-email"
          type="email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <label htmlFor="login-password">Contraseña</label>
        <input
          id="login-password"
          type="password"
          value={loginPass}
          onChange={(e) => setLoginPass(e.target.value)}
        />
      </PopupWithForm>

      <PopupWithForm
        isOpen={isRegisterOpen}
        onClose={closeAllPopups}
        title="Inscribirse"
        buttonText="Inscribirse"
        onSubmit={handleRegisterSubmit}
        errorMessage={registerError}
        redirectText="Iniciar sesión"
        onRedirect={() => {
          closeAllPopups();
          setIsLoginOpen(true);
        }}
      >
        <label htmlFor="reg-email">Correo electrónico</label>
        <input
          id="reg-email"
          type="email"
          value={regEmail}
          onChange={(e) => setRegEmail(e.target.value)}
        />
        <label htmlFor="reg-password">Contraseña</label>
        <input
          id="reg-password"
          type="password"
          value={regPass}
          onChange={(e) => setRegPass(e.target.value)}
        />
        <label htmlFor="reg-name">Nombre de usuario</label>
        <input
          id="reg-name"
          type="text"
          value={regName}
          onChange={(e) => setRegName(e.target.value)}
        />
      </PopupWithForm>
    </div>
  );
}