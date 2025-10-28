import { useState, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import logo from "../../assets/logo.svg";
import menu from "../../assets/menu.svg";
import close from "../../assets/close-dark.svg";

function Header({ handleAddClick, weatherData }) {
  const currentUser = useContext(CurrentUserContext);
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  function toggleMobileMenu() {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  }
  // Helper for avatar/placeholder
  const renderAvatar = () => {
    if (!currentUser) return null;
    if (currentUser && currentUser.avatar) {
      return (
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="header__avatar"
        />
      );
    } else if (currentUser && currentUser.name) {
      return (
        <div className="header__avatar header__avatar_placeholder">
          {currentUser.name.charAt(0).toUpperCase()}
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <header
      className={`header ${isMobileMenuOpened ? "header__menu-open" : ""}`}
    >
      {!isMobileMenuOpened && (
        <>
          <Link to="/">
            <img className="header__logo" src={logo} alt="Header Logo" />
          </Link>
          <p className="header__date-and-location">
            {currentDate}, {weatherData.city}
          </p>
        </>
      )}

      <ToggleSwitch />
      {currentUser && (
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
      )}

      {currentUser ? (
        <Link to="/profile" className="header__link">
          <div className="header__user-container">
            <p className="header__username">{currentUser.name}</p>
            {renderAvatar()}
          </div>
        </Link>
      ) : (
        <div className="header__auth-links">
          <Link to="/register" className="header__signup-link">
            Sign up
          </Link>
          <Link to="/login" className="header__link">
            <div className="header__user-container">
              <p className="header__username">Log in</p>
              {renderAvatar()}
            </div>
          </Link>
        </div>
      )}

      <button
        onClick={toggleMobileMenu}
        className="header__menu-btn"
        aria-label="Toggle menu"
      >
        <img src={menu} alt="App Menu" />
      </button>
      {isMobileMenuOpened && (
        <div className="modal__content-header">
          <button onClick={toggleMobileMenu} className="modal__close">
            <img src={close} alt="Close button" className="modal__close" />
          </button>
          <div className="header__user-container">
            <p className="header__username">
              {currentUser ? currentUser.name : "Sign in"}
            </p>
            {renderAvatar()}
          </div>
          {!currentUser && (
            <div className="header__mobile-auth">
              <Link
                to="/register"
                className="header__signup-link modal__signup-link"
              >
                Sign up
              </Link>
            </div>
          )}
          {currentUser && (
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn modal__add-clothes-btn"
            >
              + Add clothes
            </button>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
