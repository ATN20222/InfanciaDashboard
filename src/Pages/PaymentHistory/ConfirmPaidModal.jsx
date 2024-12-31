
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const ConfirmPaidModal = ({ item, isOpen, onClose, onConfirm }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    item.status==='review'?onConfirm(item.id):onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="mymodal">
        <div className="modal-content">
          <h2>Confrim Payment</h2>
          <div className="FormHr"></div>
          <div className="add-class-form addSubjectForm">
            {item.media[0]?.original_url ?
              <>

                <span className='ConfirmDelete'>
                  {item.status==='review'?
                  "Are you sure want change to paid" :
                  "Payment has been confirmed"
                  }
                </span>
                <div className='PaymentImage mb-4'>
                  <img src={item.media[0]?.original_url} width="100%" alt="" />
                </div>
              </>
              :
              <>
                <span className='ConfirmDelete'>Request has not been paid</span>
              </>
                          
                        
                }

            <div className="form-buttons">

              <button className="RegisterBtn" 
                // disabled={item.media[0]?.original_url?true:false}
                onClick={handleSubmit}
                >
                Ok
              </button>

              <button className="CancelBtn" onClick={onClose}>
                Close
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
