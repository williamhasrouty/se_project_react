import "./ClothesSection.css";

import { useContext, useState } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import ItemCard from "../../ItemCard/ItemCard";

function ClothesSection({
  handleCardClick,
  clothingItems,
  onCardLike,
  handleAddClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [selectedWeather, setSelectedWeather] = useState("all");

  const userItems = clothingItems.filter(
    (item) => currentUser && item.owner === currentUser._id,
  );

  const filteredItems = userItems.filter((item) => {
    if (selectedWeather === "all") return true;
    if (selectedWeather === "cold") return item.weather === "cold";
    if (selectedWeather === "warm") return item.weather === "warm";
    if (selectedWeather === "hot")
      return item.weather === "hot" || item.weather === "Hot";
    return true;
  });

  const handleWeatherChange = (e) => {
    setSelectedWeather(e.target.value);
  };

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p>Your items</p>
        <select
          className="clothes-section__filter"
          value={selectedWeather}
          onChange={handleWeatherChange}
        >
          <option value="all">All</option>
          <option value="cold">Cold</option>
          <option value="warm">Warm</option>
          <option value="hot">Hot</option>
        </select>
        <button onClick={handleAddClick} className="clothes-section__add-btn">
          + Add New Item
        </button>
      </div>

      <ul className="clothes-section__items">
        {filteredItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={handleCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
