// fragmento en Header.jsx:
function Header({ onLoginClick }) {
  return (
    <header className="header">
      {/* ... tu contenido de logo y nav ... */}
      <button className="header__login-button" onClick={onLoginClick}>
        Inicia sesión
      </button>
    </header>
  );
}