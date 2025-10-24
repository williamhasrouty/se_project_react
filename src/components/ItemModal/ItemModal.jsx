import "./ItemModal.css";
import closeBtn from "../../assets/close.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card && currentUser && card.owner === currentUser._id;
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content-item">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeBtn} alt="Close button" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          {isOwn && (
            <button onClick={onDeleteClick} className="modal__delete-btn">
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
