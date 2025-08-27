import "./DeleteModal.css";
import closeBtn from "../../assets/close.svg";

function DeleteModal({ onDeleteItem, card, onClose, activeModal }) {
  return (
    <div className={`modal ${activeModal === "delete" && "modal_opened"}`}>
      <div className="delete-modal">
        <div className="delete-modal__content">
             <button onClick={onClose} type="button" className="modal__close">
                      <img src={closeBtn} alt="Close button" />
                    </button>
          <p className="delete__message">
            Are you sure you want to delete this item?
            <br />
            This action is irreversible.
          </p>
          <button
            onClick={() => onDeleteItem(card._id)}
            className="delete-confirm__btn"
          >
            Yes, delete item
          </button>
          <button onClick={onClose} type="button" className="delete__cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
