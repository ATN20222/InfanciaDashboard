
import React, { useState } from 'react';
import './AddClassModal.css';

const AddClassModal = ({ isOpen, onClose, onAddClass }) => {
  const [className, setClassName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddClass(className);
    setClassName('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="overlay">
     <div className="mymodal">
                <div className="modal-content">
                    <h2>Add Class</h2>
                    <div className="FormHr"></div>
                    <form className="add-class-form">
                        <label>
                           
                            <input type="text" name="className" className='ClassNameInput' placeholder='Class Name' />
                        </label>
                       

                            
                            <div className="Age">
                                <label htmlFor="">Age</label>
                                <input type="number" name="ageFrom" placeholder="From : " />
                                <input type="number" name="ageTo" placeholder="To : " />
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

export default AddClassModal;
