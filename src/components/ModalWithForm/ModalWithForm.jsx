import "./ModalWithForm.css";
import closeBtn from "../../assets/close.svg";

function ModalWithForm({
  children,
  buttonText = "Add garment",
  title,
  name,
  isOpen,
  onClose,
  onSubmit,
}) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content-form">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeBtn} alt="Close button" />
        </button>
        <form onSubmit={onSubmit} className="modal__form" name={name}>
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
