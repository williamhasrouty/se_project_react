// React components

import { useEffect, useState } from "react";
import { useNavigate, Navigate, Routes, Route } from "react-router-dom";

// Utils/API
import { coordinates, apiKey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { signup, signin, getUser } from "../../utils/auth";

// Components

import "./App.css";
import "../../vendor/fonts.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
// ProtectedRoute now handles routing/authorization internally
import updateUser from "../../utils/updateUser";

function App() {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  // isWeatherDataLoaded false. conditionally render the parts of the page that are loading beofre the fetch data completes. when weatherData is false, instead of showing 999, show text like "Loading..."

  const [activeModal, setActiveModal] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [selectedCard, setSelectedCard] = useState({});
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Edit profile modal handlers
  const handleEditProfile = () => setIsEditProfileOpen(true);
  const handleCloseEditProfile = () => setIsEditProfileOpen(false);
  const handleUpdateUser = ({ name, avatar }) => {
    if (!token) return;
    updateUser({ name, avatar }, token)
      .then((user) => {
        setCurrentUser(user);
        setIsEditProfileOpen(false);
      })
      .catch((err) => console.error("Update user failed:", err));
  };

  // Sign out logic
  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setToken(null);
    setIsLoggedIn(false);
  };
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isWeatherDataLoaded, setIsWeatherDataLoaded] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleDeleteClick = () => {
    setActiveModal("delete");
  };

  const onAddItem = (inputValues) => {
    // call the fetch funtion
    // .then(res)... includes all the stuff below
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };
    // the ID will be included in the response data
    addItem(newCardData, token)
      .then((createdItem) => {
        setClothingItems([createdItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Error adding item:", err);
      });
  };

  const handleDeleteItem = (id) => {
    deleteItem(id, token)
      .then(() => {
        setClothingItems(clothingItems.filter((item) => item._id !== id));
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Error deleting item:", err);
      });
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleModalClose = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
        setIsWeatherDataLoaded(true);
      })
      .catch((err) => {
        console.error("Failed to fetch weather data:", err);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((err) => {
        console.error("Failed to fetch clothing items:", err);
      });
  }, []);

  // Set isLoggedIn based on currentUser
  useEffect(() => {
    setIsLoggedIn(!!currentUser);
  }, [currentUser]);

  // // Check token on app mount
  useEffect(() => {
    const stored = localStorage.getItem("jwt");
    if (stored) {
      getUser(stored)
        .then((user) => {
          setCurrentUser(user);
          setToken(stored);
        })
        .catch((err) => {
          console.error("Token verification failed:", err);
          localStorage.removeItem("jwt");
          setCurrentUser(null);
          setToken(null);
        });
    } else {
      setCurrentUser(null);
      setToken(null);
    }
  }, []);

  const handleRegister = ({ name, avatar, email, password }) => {
    signup({ name, avatar, email, password })
      .then(() => signin({ email, password }))
      .then((res) => {
        if (res && res.token) {
          localStorage.setItem("jwt", res.token);
          setToken(res.token);
          return getUser(res.token);
        }
        return Promise.reject("No token in signin response");
      })
      .then((user) => {
        setCurrentUser(user);
        closeActiveModal();
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.error("Registration/Login failed:", err);
      });
  };

  const handleLogin = ({ email, password }) => {
    signin({ email, password })
      .then((res) => {
        if (res && res.token) {
          localStorage.setItem("jwt", res.token);
          setToken(res.token);
          return getUser(res.token);
        }
        return Promise.reject("No token in signin response");
      })
      .then((user) => {
        setCurrentUser(user);
        closeActiveModal();
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  // Like/dislike logic
  const handleCardLike = ({ id, isLiked }) => {
    if (!token) return;
    (!isLiked ? addCardLike(id, token) : removeCardLike(id, token))
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch((err) =>
        console.error(
          "Failed to update like status for card (id: " + id + "):",
          err
        )
      );
  };

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleModalClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={
                isWeatherDataLoaded ? weatherData : { city: "Loading..." }
              }
              onOpenRegister={() => setActiveModal("register")}
              onOpenLogin={() => setActiveModal("login")}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <Profile
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                    onEditProfile={handleEditProfile}
                    onSignOut={handleSignOut}
                    isEditProfileOpen={isEditProfileOpen}
                    onCloseEditProfile={handleCloseEditProfile}
                    onUpdateUser={handleUpdateUser}
                  />
                }
              />
              <Route
                path="*"
                element={
                  isLoggedIn ? (
                    <Navigate to="/profile" replace />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
            </Routes>

            <Footer />
          </div>
          <AddItemModal
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItem={onAddItem}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteClick={handleDeleteClick}
          />
          <DeleteModal
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteItem={handleDeleteItem}
            activeModal={activeModal}
          />
          <RegisterModal
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            onClose={handleModalClose}
            onRegister={handleRegister}
          />
          <LoginModal
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            onClose={handleModalClose}
            onLogin={handleLogin}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
