
import React, { useState } from 'react';

const ConfirmPaidModal = ({ id, isOpen, onClose, onConfirm }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="overlay">
     <div className="mymodal">
                <div className="modal-content">
                    <h2>Confrim Payment</h2>
                    <div className="FormHr"></div>
                    <div className="add-class-form addSubjectForm">
                        <span className='ConfirmDelete'>Are you sure want change to paid ?</span>
                        
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

export default ConfirmPaidModal;
