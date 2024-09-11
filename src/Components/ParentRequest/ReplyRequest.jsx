
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
  console.log("closedRequest",closedRequest)

  if (!isOpen) return null;
  const handleClose = ()=>{
    console.log("test")
    onClose();
  }

  return (
    // <div className="overlay">
    //  <div className="mymodal">
    //             <div className="modal-content">
    //                 <h3>Parent Request</h3>
    //                 <div className="FormHr"></div>
    //                 <form className="add-class-form">
    //                 <ParentRequestItem
    //                     key={id}
    //                     PublishDate={PublishDate}
    //                     PublisherImage={PublisherImage}
    //                     PublisherName={PublisherName}
    //                     Text={Text}
    //                     IsPopUp={true}
    //                 />

                       
    //                     <label>
                           
    //                         <textarea type="text" name="className" className='ClassNameInput ReplyParentRequest mt-2 mb-4' placeholder='Add Reply : ' />
    //                     </label>
                       
                       
                      
                            
                           
                        
    //                     <div className="form-buttons Center">
    //                                     <button className="RegisterBtn">
    //                                         Reply
    //                                     </button>
    //                                     <button className="CancelBtn" onClick={onClose}>
    //                                         Cancel
    //                                     </button>

    //                         {/* <button type="button" className="cancel-button" >Cancel</button> */}
    //                     </div>
    //                 </form>
    //             </div>
    //         </div>
    // </div>
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
