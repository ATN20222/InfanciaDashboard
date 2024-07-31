
import React, { useState } from 'react';
import CustomDropdown2 from '../../Components/DrobDown/CustomDropdown2';

const AddAdminModal = ({ isOpen, onClose, onAddAdmin }) => {
  const [className, setClassName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddAdmin(className);
    setClassName('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="overlay">
     <div className="mymodal">
                <div className="modal-content">
                    <h3>Add Admin</h3>
                    <div className="FormHr"></div>
                    <form className="add-class-form">
                        <label>
                           
                            <input type="text" name="className" className='ClassNameInput mt-2' placeholder='Name : ' />
                        </label>
                        <div className="ChooseAdminRole">
                            <CustomDropdown2 Options={["Admin" ,"Super Admin","Admin" ,"Super Admin","Admin" ,"Super Admin" ]} DefaultValue={"Role : "} />

                        </div>
                        <label>
                           
                           <input type="text" name="className" className='ClassNameInput mt-2' placeholder='Email : ' />
                       </label>

                       
                        <label>
                           
                            <input type="password" name="className" className='ClassNameInput mt-2 mb-4' placeholder='Password : ' />
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
 
export default AddAdminModal;
