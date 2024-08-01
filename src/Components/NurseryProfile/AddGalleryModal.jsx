
import React, { useState } from 'react';
import CustomDropdown2 from '../../Components/DrobDown/CustomDropdown2';

const AddGalleryModal = ({ isOpen, onClose, onAddGallery }) => {
  const [className, setClassName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddGallery(className);
    setClassName('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="overlay">
     <div className="mymodal">
                <div className="modal-content">
                    <h3>Add Album</h3>
                    <div className="FormHr"></div>
                    <form className="add-class-form">
                        <label>
                           
                            <input type="text" name="className" className='ClassNameInput  mt-2 mb-4' placeholder='Album Name : ' />
                        </label>
                        
                        

                       
                            
                        
                        <div className="form-buttons">
                                        <button className="RegisterBtn">
                                            Save
                                        </button>
                                
                                        <button className="CancelBtn" onClick={onClose}>
                                            Cancel
                                        </button>

                        </div>
                    </form>
                </div>
            </div>
    </div>
  );
};
 
export default AddGalleryModal;
