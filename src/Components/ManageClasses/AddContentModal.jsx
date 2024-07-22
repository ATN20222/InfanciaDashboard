
import React, { useState } from 'react';
import './AddClassModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';

const AddContentModal = ({ isOpen, onClose, onAddContent }) => {
  const [className, setClassName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddContent(className);
    setClassName('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="overlay">
     <div className="mymodal">
                <div className="modal-content">
                    <h2>Add Content</h2>
                    <div className="FormHr"></div>
                    <form className="add-class-form">
                        <label>
                           
                            <textarea type="text" name="Newsletter" className='ClassNameInput NewsletterDescription' placeholder='Subject description...' />
                        </label>
                       
                        <div className="AttachImage">
                            
                            <label htmlFor="SchedImage">
                                <FontAwesomeIcon icon={faPaperclip}/>
                                <span>click here to add photo</span>
                                <input type="file" name="" id="SchedImage" className='d-none' />
                            </label>
                        </div>
                          
                        
                        <div className="form-buttons">
                                        <button className="RegisterBtn">
                                            Save
                                        </button>
                                
                                        <button className="CancelBtn" onClick={onClose}>
                                            Cancel
                                        </button>

                            {/* <button type="button" className="cancel-button" >Cancel</button> */}
                        </div>
                    </form>
                </div>
            </div>
    </div>
  );
};

export default AddContentModal;
