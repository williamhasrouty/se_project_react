import "./RegisterModal.css";
import closeBtn from "../../assets/close.svg";

function RegisterModal({ onRegister, onClose, activeModal, setActiveModal }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, avatar, email, password } = e.target.elements;
    onRegister({
      name: name.value,
      avatar: avatar.value,
      email: email.value,
      password: password.value,
    });
  };

  return (
    <div
      className={`modal ${activeModal === "register" ? "modal_opened" : ""}`}
    >
      <div className="register-modal">
        <div className="register-modal__content">
          <button onClick={onClose} type="button" className="modal__close">
            <img src={closeBtn} alt="Close button" />
          </button>
          <h2 className="register-modal__title">Sign up</h2>
          <form onSubmit={handleSubmit} className="register-form">
            <label htmlFor="register-email" className="register-form__label">
              Email
            </label>
            <input
              id="register-email"
              name="email"
              type="email"
              placeholder="Email*"
              className="register-form__input"
              required
            />
            <label htmlFor="register-password" className="register-form__label">
              Password
            </label>
            <input
              id="register-password"
              name="password"
              type="password"
              placeholder="Password*"
              className="register-form__input"
              required
            />
            <label htmlFor="register-name" className="register-form__label">
              Name
            </label>
            <input
              id="register-name"
              name="name"
              type="text"
              placeholder="Name*"
              className="register-form__input"
              required
            />
            <label htmlFor="register-avatar" className="register-form__label">
              Avatar URL
            </label>
            <input
              id="register-avatar"
              name="avatar"
              type="url"
              placeholder="Avatar URL*"
              className="register-form__input"
              required
            />
            <div className="register-modal__button-row">
              <button type="submit" className="register-form__submit-btn">
                Next
              </button>
              <button
                type="button"
                className="register-modal__login-btn"
                onClick={() => setActiveModal("login")}
              >
                or Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterModal;
