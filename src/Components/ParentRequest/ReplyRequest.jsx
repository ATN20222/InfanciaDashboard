
import React, { useState } from 'react';
import ParentRequestItem from './ParentRequestItem';

const ReplyRequest = ({ isOpen, onClose, onReply ,id, PublisherImage , PublisherName, PublishDate , Text }) => {
  const [className, setClassName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onReply(className);
    setClassName('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="overlay">
     <div className="mymodal">
                <div className="modal-content">
                    <h3>Parent Request</h3>
                    <div className="FormHr"></div>
                    <form className="add-class-form">
                    <ParentRequestItem
                        key={id}
                        PublishDate={PublishDate}
                        PublisherImage={PublisherImage}
                        PublisherName={PublisherName}
                        Text={Text}
                        IsPopUp={true}
                    />

                       
                        <label>
                           
                            <textarea type="text" name="className" className='ClassNameInput ReplyParentRequest mt-2 mb-4' placeholder='Add Reply : ' />
                        </label>
                       
                       
                      
                            
                           
                        
                        <div className="form-buttons Center">
                                        <button className="RegisterBtn">
                                            Reply
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
 
export default ReplyRequest;
