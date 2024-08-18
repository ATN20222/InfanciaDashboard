import React, { useState } from 'react';
import './AddClassModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';

const AddContentModal = ({ isOpen, onClose, onAddContent }) => {
  const [content, setContent] = useState('');
  const [contentError, setContentError] = useState('');

  const validateForm = () => {
    let isValid = true;
    if (!content.trim()) {
      setContentError('Subject content is required.');
      isValid = false;
    }else if(content.length<50 || content.length>1000){
        setContentError('content must be between 50 - 1000 characters');
        isValid = false;
    } else {
      setContentError('');
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAddContent(content);
      setContent('');
      onClose();
      ClearData();
    }
  };



  if (!isOpen) return null;

  const ClearData = ()=>{
    setContent('');
    setContentError('');
  }

  return (
    <div className="overlay">
      <div className="mymodal">
        <div className="modal-content">
          <h2>Add Content</h2>
          <div className="FormHr"></div>
          <form className="add-class-form" onSubmit={handleSubmit}>
            <label>
              <textarea
                type="text"
                name="Newsletter"
                className={`ClassNameInput NewsletterDescription ${contentError?'':'mb-3'}`}
                placeholder='Subject content...'
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              {contentError && (
                <span className='text-danger PopUpValidation mb-3'>{contentError}</span>
              )}
            </label>

            

            <div className="form-buttons">
              <button type="submit" className="RegisterBtn">
                Save
              </button>
              <button type="button" className="CancelBtn" onClick={()=>{onClose();ClearData();}}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContentModal;
