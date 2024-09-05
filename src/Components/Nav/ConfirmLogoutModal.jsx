
import React, { useState } from 'react';

const ConfirmLogoutModal = ({  isOpen, onClose, onConfirm }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="overlay">
     <div className="mymodal">
                <div className="modal-content">
                    <h2>Confirm Logout</h2>
                    <div className="FormHr"></div>
                    <div className="add-class-form addSubjectForm">
                        <span className='ConfirmDelete'>Are you sure you want logout ?</span>
                        
                        <div className="form-buttons">
                                        <button className="RegisterBtn" onClick={handleSubmit}>
                                            Yes
                                        </button>
                                
                                        <button className="CancelBtn" onClick={onClose}>
                                            No
                                        </button>

                            {/* <button type="button" className="cancel-button" >Cancel</button> */}
                        </div>
                    </div>
                </div>
            </div>
    </div>
  );
};

export default ConfirmLogoutModal;