import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ onLogin, onClose, activeModal, setActiveModal }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    onLogin({ email: email.value, password: password.value });
  };

  return (
    <ModalWithForm
      title="Log in"
      name="login"
      isOpen={activeModal === "login"}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Sign in"
    >
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
        <button
          type="button"
          className="login-modal__register-btn"
          onClick={() => setActiveModal("register")}
        >
          or Register
        </button>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
