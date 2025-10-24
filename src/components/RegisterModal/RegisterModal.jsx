import "./RegisterModal.css";
import closeBtn from "../../assets/close.svg";

function RegisterModal({ onRegister, onClose, activeModal }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, avatar, email, password } = e.target.elements;
    onRegister({
      name: username.value,
      avatar: avatar.value,
      email: email.value,
      password: password.value,
    });
  };

  return (
    <div className={`modal ${activeModal === "register" && "modal_opened"}`}>
      <div className="register-modal">
        <div className="register-modal__content">
          <button onClick={onClose} type="button" className="modal__close">
            <img src={closeBtn} alt="Close button" />
          </button>
          <h2 className="register-modal__title">Sign up</h2>
          <form onSubmit={handleSubmit} className="register-form">
            <input
              name="email"
              type="email"
              placeholder="Email*"
              className="register-form__input"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password*"
              className="register-form__input"
              required
            />
            <input
              name="name"
              type="text"
              placeholder="Name*"
              className="register-form__input"
              required
            />
            <input
              name="avatar"
              type="url"
              placeholder="Avatar URL*"
              className="register-form__input"
              required
            />
            <button type="submit" className="register-form__submit-btn">
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterModal;
