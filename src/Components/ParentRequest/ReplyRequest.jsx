
import React, { useState } from 'react';
import ParentRequestItem from './ParentRequestItem';
import Chat from '../Chat/Chat';

const ReplyRequest = ({id, userId, userName, isOpen, onClose , closedRequest }) => {
  const [className, setClassName] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    // onReply(className);
    setClassName('');
    onClose();
  };

  if (!isOpen) return null;
  const handleClose = ()=>{
    onClose();
  }

  return (
    <div className="overlay">
        <div className="mymodal">
            <div className="modal-content">
                <Chat ChatId={id} SelectedUserId={userId} Name={userName} ClosedChat={closedRequest} close={handleClose}/>
            </div>
        </div>
    </div>
  );
};
 
export default ReplyRequest;
