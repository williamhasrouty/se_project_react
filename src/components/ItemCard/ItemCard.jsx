import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const handleCardClick = () => {
    onCardClick(item);
  };
  const handleLike = () => {
    if (onCardLike) {
      const isLiked =
        item.likes && currentUser
          ? item.likes.includes(currentUser._id)
          : false;
      onCardLike({ id: item._id, isLiked });
    }
  };
  const isLiked =
    item.likes && currentUser ? item.likes.includes(currentUser._id) : false;
  const showLike = !!currentUser;
  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      {showLike && (
        <button
          className={`card__like-btn${isLiked ? " card__like-btn_active" : ""}`}
          onClick={handleLike}
          aria-label="Like"
        >
          {isLiked ? "♥" : "♡"}
        </button>
      )}
    </li>
  );
}

export default ItemCard;
