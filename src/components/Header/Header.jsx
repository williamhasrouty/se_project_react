import { useState, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
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
      return (
        <img src={avatar} alt="Default Avatar" className="header__avatar" />
      );
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
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>

      {currentUser ? (
        <Link to="/profile" className="header__link">
          <div className="header__user-container">
            <p className="header__username">{currentUser.name}</p>
            {renderAvatar()}
          </div>
        </Link>
      ) : (
        <Link to="/login" className="header__link">
          <div className="header__user-container">
            <p className="header__username">Sign in</p>
            <img src={avatar} alt="Default Avatar" className="header__avatar" />
          </div>
        </Link>
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
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn modal__add-clothes-btn"
          >
            + Add clothes
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
