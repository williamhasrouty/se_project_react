import "./EditProfileModal.css";
import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import closeBtn from "../../assets/close.svg";

function EditProfileModal({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [isOpen, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ name, avatar });
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="register-modal">
        <div className="register-modal__content">
          <button onClick={onClose} type="button" className="modal__close">
            <img src={closeBtn} alt="Close button" />
          </button>
          <h2 className="register-modal__title">Edit Profile</h2>
          <form onSubmit={handleSubmit} className="register-form">
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="register-form__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              name="avatar"
              type="url"
              placeholder="Avatar URL"
              className="register-form__input"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              required
            />
            <button type="submit" className="register-form__submit-btn">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
