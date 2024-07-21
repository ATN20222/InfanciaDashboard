
import React, { useState } from 'react';
import './Branches.css';

const AddBranchModal = ({ isOpen, onClose, onAddRequest }) => {
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
                    <h3>Add Branch</h3>
                    <div className="FormHr"></div>
                    <form className="add-class-form">
                        <label>
                           
                            <input type="text" name="className" className='ClassNameInput mt-2' placeholder='Branch name : ' />
                        </label>

                        <label>
                           
                           <input type="number" name="className" className='ClassNameInput mt-2' placeholder='Address : ' />
                       </label>

                       
                        <label>
                           
                            <input type="text" name="className" className='ClassNameInput mt-2' placeholder='City : ' />
                        </label>
                       
                       <div className="BranchMobNo">
                        <span>EG+20</span>
                        <label>
                            
                            <input type="number" name="className" className='ClassNameInput mt-2 mb-2' placeholder='Mobile No : ' />
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
 
export default AddBranchModal;
