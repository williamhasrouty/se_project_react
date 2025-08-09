import { useState } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import menu from "../../assets/menu.svg";

function Header({ handleAddClick, weatherData }) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  function toggleMobileMenu() {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  }
  return (
    <header
      className={`header ${isMobileMenuOpened ? "header__menu-open" : ""}`}
    >
      {!isMobileMenuOpened && (
        <>
          <img className="header__logo" src={logo} alt="Header Logo" />
          <p className="header__date-and-location">
            {currentDate}, {weatherData.city}
          </p>
        </>
      )}
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegagne</p>
        <img src={avatar} alt="Terrence Tegagne" className="header__avatar" />
      </div>
      <button
        onClick={toggleMobileMenu}
        className="header__menu-btn"
        aria-label="Toggle menu"
      >
        <img src={menu} alt="App Menu" />
      </button>

      {isMobileMenuOpened && (
        <div className="modal__content-header">
          <button onClick={toggleMobileMenu} className="modal__close-btn">
            Close
          </button>

          <div className="header__user-container">
            <p className="header__username">Terrence Tegagne</p>
            <img
              src={avatar}
              alt="Terrence Tegagne"
              className="header__avatar"
            />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;

/* TODO - Still working on responsive design */
/* TODO - Still working on responsive design */
/* TODO - Still working on responsive design */
