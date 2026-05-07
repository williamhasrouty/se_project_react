import "./ClothesSection.css";

import { useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import ItemCard from "../../ItemCard/ItemCard";

function ClothesSection({
  handleCardClick,
  clothingItems,
  onCardLike,
  handleAddClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const userItems = clothingItems.filter(
    (item) => currentUser && item.owner === currentUser._id,
  );

  const coldItems = userItems.filter((item) => item.weather === "cold");
  const warmItems = userItems.filter((item) => item.weather === "warm");
  const hotItems = userItems.filter(
    (item) => item.weather === "hot" || item.weather === "Hot",
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p>Your items</p>
        <button onClick={handleAddClick} className="clothes-section__add-btn">
          + Add New
        </button>
      </div>

      {coldItems.length > 0 && (
        <div className="clothes-section__category">
          <h3 className="clothes-section__category-title">Cold Weather</h3>
          <ul className="clothes-section__items">
            {coldItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
              />
            ))}
          </ul>
        </div>
      )}

      {warmItems.length > 0 && (
        <div className="clothes-section__category">
          <h3 className="clothes-section__category-title">Warm Weather</h3>
          <ul className="clothes-section__items">
            {warmItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
              />
            ))}
          </ul>
        </div>
      )}

      {hotItems.length > 0 && (
        <div className="clothes-section__category">
          <h3 className="clothes-section__category-title">Hot Weather</h3>
          <ul className="clothes-section__items">
            {hotItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ClothesSection;
