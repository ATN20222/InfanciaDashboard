
import React, { useState } from 'react';

const AddNurseryPolicyModal = ({ isOpen, onClose, onAddNurseryPolicy }) => {
  const [className, setClassName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddNurseryPolicy(className);
    setClassName('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="overlay">
     <div className="mymodal">
                <div className="modal-content">
                    <h3>Add Nursery Policy</h3>
                    <div className="FormHr"></div>
                    <form className="add-class-form">
                        <label>
                           
                            <input type="text" name="className" className='ClassNameInput mt-2' placeholder='Title : ' />
                        </label>

                       
                        <label>
                           
                            <textarea type="text" name="className" className='ClassNameInput AnswerFAQ DescriptionPolicy mt-2 mb-4' placeholder='Description : ' />
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
 
export default AddNurseryPolicyModal;
