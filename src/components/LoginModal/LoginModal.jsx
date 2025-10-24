import "./LoginModal.css";
import closeBtn from "../../assets/close.svg";

function LoginModal({ onLogin, onClose, activeModal }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    onLogin({ email: email.value, password: password.value });
  };

  return (
    <div className={`modal ${activeModal === "login" && "modal_opened"}`}>
      <div className="register-modal">
        <div className="register-modal__content">
          <button onClick={onClose} type="button" className="modal__close">
            <img src={closeBtn} alt="Close button" />
          </button>
          <h2 className="register-modal__title">Sign in</h2>
          <form onSubmit={handleSubmit} className="register-form">
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="register-form__input"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="register-form__input"
              required
            />
            <button type="submit" className="register-form__submit-btn">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
