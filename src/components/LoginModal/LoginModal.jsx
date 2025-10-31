import "./LoginModal.css";
import closeBtn from "../../assets/close.svg";

function LoginModal({ onLogin, onClose, activeModal, setActiveModal }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    onLogin({ email: email.value, password: password.value });
  };

  return (
    <div className={`modal ${activeModal === "login" ? "modal_opened" : ""}`}>
      <div className="login-modal">
        <div className="login-modal__content">
          <button onClick={onClose} type="button" className="modal__close">
            <img src={closeBtn} alt="Close button" />
          </button>
          <h2 className="login-modal__title">Log in</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="login-email" className="login-form__label">
              Email
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              placeholder="Email"
              className="login-form__input"
              required
            />
            <label htmlFor="login-password" className="login-form__label">
              Password
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              placeholder="Password"
              className="login-form__input"
              required
            />
            <div className="login-modal__button-row">
              <button type="submit" className="login-form__submit-btn">
                Sign in
              </button>
              <button
                type="button"
                className="login-modal__register-btn"
                onClick={() => setActiveModal("register")}
              >
                or Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
