
import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import CustomDropdown from '../DrobDown/CustomDropdown';
import CustomDropdown2 from '../DrobDown/CustomDropdown2';

const AddNewsLetterModal = ({ isOpen, onClose, onAddNewsLetter }) => {
  const [className, setClassName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddNewsLetter(className);
    setClassName('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="overlay">
     <div className="mymodal">
                <div className="modal-content">
                    <h2>Add Newsletter</h2>
                    <div className="FormHr"></div>
                    <form className="add-class-form">
                        
                        <div className="CircleInPopUpContainer">
                            <div className="CircleInPopUp Center">
                                <label htmlFor="Image">
                                    <FontAwesomeIcon icon={faImage}/>
                                    <input type="file" name="" id="Image" />
                                </label>
                            </div>
                        </div>
                        
                        
                        
                                    
                        <CustomDropdown2 Options={["All" ,"Class A" , "Class B" ,"Class C" , "Class D", "All" ,"Class A" , "Class B" ,"Class C" , "Class D"]} DefaultValue={"Class : "} />
                        

                        <label>
                           
                            <textarea type="text" name="Newsletter" className='ClassNameInput NewsletterDescription NewsletterDescription2' placeholder='Newsletter description...' />
                        </label>
                       
                        
                        
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

export default AddNewsLetterModal;
