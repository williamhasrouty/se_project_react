import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";
import likedHeart from "../../assets/liked-heart.svg";
import defaultHeart from "../../assets/default-heart.svg";

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
          aria-label={isLiked ? "Unlike" : "Like"}
        >
          <img
            src={isLiked ? likedHeart : defaultHeart}
            alt={isLiked ? "Liked" : "Not liked"}
            className="card__like-btn"
          />
        </button>
      )}
    </li>
  );
}

export default ItemCard;
