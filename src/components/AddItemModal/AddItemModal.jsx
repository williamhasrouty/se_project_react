import { useEffect, useState } from "react";
import { useForm } from "../../utils/hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weatherType: "",
  };
  const { values, handleChange, setValues } = useForm(defaultValues);
  const [uploadMethod, setUploadMethod] = useState("url"); // 'url' or 'file'
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setValues(defaultValues);
      setUploadMethod("url");
      setSelectedFile(null);
      setFilePreview(null);
    }
  }, [isOpen]);

  const handleFileChange = (evt) => {
    const file = evt.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
        // Set the base64 image as the imageUrl value
        setValues({ ...values, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadMethodChange = (method) => {
    setUploadMethod(method);
    if (method === "url") {
      setSelectedFile(null);
      setFilePreview(null);
      setValues({ ...values, imageUrl: "" });
    } else {
      setValues({ ...values, imageUrl: "" });
    }
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values);
  }

  return (
    <ModalWithForm
      title="New garment"
      name="new-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>

      <fieldset className="modal__image-upload-section">
        <legend className="modal__legend">Add image:</legend>
        <div className="modal__upload-options">
          <label className="modal__upload-option">
            <input
              type="radio"
              name="uploadMethod"
              value="url"
              checked={uploadMethod === "url"}
              onChange={() => handleUploadMethodChange("url")}
              className="modal__radio-input"
            />{" "}
            Image URL
          </label>
          <label className="modal__upload-option">
            <input
              type="radio"
              name="uploadMethod"
              value="file"
              checked={uploadMethod === "file"}
              onChange={() => handleUploadMethodChange("file")}
              className="modal__radio-input"
            />{" "}
            Upload from computer
          </label>
        </div>

        {uploadMethod === "url" ? (
          <label htmlFor="imageUrl" className="modal__label">
            Image URL{" "}
            <input
              type="url"
              name="imageUrl"
              className="modal__input"
              id="imageUrl"
              placeholder="Image URL"
              value={values.imageUrl}
              onChange={handleChange}
              required
            />
          </label>
        ) : (
          <div className="modal__file-upload">
            <label htmlFor="imageFile" className="modal__label">
              Choose image file{" "}
              <input
                type="file"
                name="imageFile"
                className="modal__file-input"
                id="imageFile"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/svg+xml,image/webp"
                onChange={handleFileChange}
                required
              />
            </label>
            {filePreview && (
              <div className="modal__file-preview">
                <img
                  src={filePreview}
                  alt="Preview"
                  className="modal__preview-image"
                />
                <p className="modal__file-name">{selectedFile?.name}</p>
              </div>
            )}
          </div>
        )}
      </fieldset>

      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            name="weatherType"
            className="modal__radio-input"
            value="hot"
            onChange={handleChange}
            checked={values.weatherType === "hot"}
            required
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            name="weatherType"
            className="modal__radio-input"
            value="warm"
            onChange={handleChange}
            checked={values.weatherType === "warm"}
            required
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            name="weatherType"
            value="cold"
            onChange={handleChange}
            className="modal__radio-input"
            checked={values.weatherType === "cold"}
            required
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
