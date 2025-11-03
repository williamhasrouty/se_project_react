import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

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
    <ModalWithForm
      title="Sign up"
      name="register"
      isOpen={activeModal === "register"}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Next"
    >
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
        <button
          type="button"
          className="register-modal__login-btn"
          onClick={() => setActiveModal("login")}
        >
          or Log in
        </button>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
