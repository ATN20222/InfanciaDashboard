
import React, { useState } from 'react';
import CustomDropdown2 from '../../Components/DrobDown/CustomDropdown2';

const AddRoleModal = ({ isOpen, onClose, onAddRole }) => {
  const [className, setClassName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddRole(className);
    setClassName('');
    onClose();
  };

  if (!isOpen) return null;
  const RoleItems = [
    {id:1 ,Name: "Manage Classes"},
    {id:2 ,Name: "Payment history"},
    {id:3 ,Name: "Newsletter"},
    {id:4 ,Name: "Meals"},
  ]
  return (
    <div className="overlay">
     <div className="mymodal">
                <div className="modal-content">
                    <h3>Add Role</h3>
                    <div className="FormHr"></div>
                    <form className="add-class-form">
                        <label>
                           
                            <input type="text" name="className" className='ClassNameInput mt-2' placeholder='Role Name : ' />
                        </label>
                        <div className="ChooseRoleItems mb-4">
                        {RoleItems.map((item) => (
                            <div className="RoleItem">
                                <input
                                    type="checkbox"
                                   value={item.id}
                                   id={item.Name}
                                />
                                <label htmlFor={item.Name}>{item.Name}</label>
                            </div>
                            
                                   
                            ))}

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
 
export default AddRoleModal;
