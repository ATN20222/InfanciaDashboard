
import React, { useState } from 'react';

const AddFAQModal = ({ isOpen, onClose, onAddFAQ }) => {
  const [className, setClassName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddFAQ(className);
    setClassName('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="overlay">
     <div className="mymodal">
                <div className="modal-content">
                    <h3>Add FAQ</h3>
                    <div className="FormHr"></div>
                    <form className="add-class-form">
                        <label>
                           
                            <input type="text" name="className" className='ClassNameInput mt-2' placeholder='Question : ' />
                        </label>

                       
                        <label>
                           
                            <textarea type="text" name="className" className='ClassNameInput AnswerFAQ mt-2 mb-4' placeholder='Answer : ' />
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
 
export default AddFAQModal;
