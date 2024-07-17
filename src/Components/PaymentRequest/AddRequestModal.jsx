
import React, { useState } from 'react';
import './PaymentRequestItem.css';

const AddRequestModal = ({ isOpen, onClose, onAddRequest }) => {
  const [className, setClassName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddRequest(className);
    setClassName('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="overlay">
     <div className="mymodal">
                <div className="modal-content">
                    <h3>Add Payment Request</h3>
                    <div className="FormHr"></div>
                    <form className="add-class-form">
                        <label>
                           
                            <input type="text" name="className" className='ClassNameInput mt-2' placeholder='Service : ' />
                        </label>

                        <label>
                           
                           <input type="number" name="className" className='ClassNameInput mt-2' placeholder='Fees : ' />
                       </label>

                       
                        <label>
                           
                            <textarea type="text" name="className" className='ClassNameInput mt-2' placeholder='Description : ' />
                        </label>
                       
                       
                      
                            
                            <div className="Age">
                                <label htmlFor="">Date</label>
                                <input type="date" name="ageFrom" placeholder="From : " />
                                <input type="date" name="ageTo" placeholder="To : " />
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
 
export default AddRequestModal;
