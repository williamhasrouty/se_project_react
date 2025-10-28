import "./ClothesSection.css";

import { useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import ItemCard from "../../ItemCard/ItemCard";

function ClothesSection({ handleCardClick, clothingItems, handleAddClick }) {
  const currentUser = useContext(CurrentUserContext);
  const userItems = clothingItems.filter(
    (item) => currentUser && item.owner === currentUser._id
  );
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p>Your items</p>
        <button onClick={handleAddClick} className="clothes-section__add-btn">
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {userItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={handleCardClick} />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
