import "./LoginModal.css";
import closeBtn from "../../assets/close.svg";
import { useNavigate } from "react-router-dom";

function LoginModal({ onLogin, onClose, activeModal }) {
  const navigate = useNavigate();
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
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="login-form__input"
              required
            />
            <input
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
                onClick={() => navigate("/register")}
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
