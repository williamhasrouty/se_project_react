import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Main({ weatherData, handleCardClick, clothingItems, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />

      <p className="cards__text">
        Today is {weatherData.temp[currentTemperatureUnit]}
        &deg;{currentTemperatureUnit} / You may want to wear:
      </p>
      <ul className="cards__list">
        {clothingItems
          .filter((item) => {
            return (
              item.weather === weatherData.type &&
              currentUser &&
              item.owner === currentUser._id
            );
          })
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
              />
            );
          })}
      </ul>
    </main>
  );
}

export default Main;
