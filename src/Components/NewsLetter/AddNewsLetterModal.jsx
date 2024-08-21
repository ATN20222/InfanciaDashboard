import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import CustomDropdown2 from '../DrobDown/CustomDropdown2';

const AddNewsLetterModal = ({ isOpen, onClose, onAddNewsLetter }) => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [descriptionError, setDescriptionError] = useState('');
  const [imageError, setImageError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    // Validate image size (max 8 MB)
    if (file.size > 8 * 1024 * 1024) {
      setImageError("Image size should not exceed 8 MB");
      setImage(null);
      return;
    }
  
    // Validate image format
    const allowedFormats = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (!allowedFormats.includes(file.type)) {
      setImageError("Only .jpeg, .jpg, .png, and .gif formats are allowed");
      setImage(null);
      return;
    }
  
    // Set image if valid
    setImage(file);
    setImageError("");
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
  
    if (!image) {
      setImageError("Image is required");
      valid = false;
    }
  
    if (description === '') {
      setDescriptionError("Description is required");
      valid = false;
    } else if (description.length < 50 || description.length > 1000) {
      setDescriptionError("Description must be between 50 - 1000 characters");
      valid = false;
    }
  
    if (valid) {
      onAddNewsLetter(description, image);
      setDescription('');
      setImage(null);
      onClose();
    }
  };
  

  if (!isOpen) return null;
  const ClearData = ()=>{
    setDescription('');
    setImage(null);
    setDescriptionError('');
    setImageError('');
  }

  return (
    <div className="overlay">
      <div className="mymodal">
        <div className="modal-content">
          <h2>Add Newsletter</h2>
          <div className="FormHr"></div>
          <form className="add-class-form" onSubmit={handleSubmit}>
            <div className="CircleInPopUpContainer">
              <div className="CircleInPopUp Center">
                <label htmlFor="Image">
                  <FontAwesomeIcon icon={faImage} />
                  <input type="file" id="Image" onChange={handleImageChange} />
                </label>
              </div>
            </div>
            <div className="Center">

              {imageError && <span className='text-danger PopUpValidation text-center p-0 d-block mb-1'>{imageError}</span>}
            </div>
            
            
              <textarea 
                name="Newsletter" 
                className={`ClassNameInput NewsletterDescription NewsletterDescription2 ${descriptionError?' mb-1':''}`} 
                placeholder='Newsletter description...' 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
              />
              {descriptionError && <span className='text-danger PopUpValidation mb-3'>{descriptionError}</span>}
            
            
            <div className="form-buttons">
              <button className="RegisterBtn">
                Save
              </button>
              <button className="CancelBtn" onClick={()=>{onClose(); ClearData();}}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewsLetterModal;
