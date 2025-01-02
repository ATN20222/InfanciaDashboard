import React, { useEffect, useState } from 'react';
import { ParentRequestServices } from '../../Service/Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const AddChatModal = ({ isOpen, onClose, onAddChat }) => {
  const [parents, setParents] = useState([]);

  useEffect(() => {
    GetData();
}, []);

async function GetData() {
    try {
        const response = await ParentRequestServices.ListParents();
        console.log(response.content);
        setParents(response.content);
        // setClosedRequests(m);
    } catch (error) {
        console.error(error);
    }
}

  const handleChooseChat = (id) => {
    onAddChat(id);
    onClose();
  };



  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="mymodal">
        <div className="modal-content"> 
          <div className="ParentCreateChatHeader">
          <h3>Add Chat</h3>
          <FontAwesomeIcon icon={faX} className='ExitPopUp' onClick={onClose}/>

          </div>
          <div className="FormHr"></div>
          <div className="add-class-form" >

            <div className={` ChooseParent mb-4 `}>
              {parents.map((parent) => (
                <div className="ParentCreateChat" onClick={()=>handleChooseChat(parent.user?.id)}>
                  <div className="ParentName">
                    {parent.user?.name}
                  </div>
                  <div className="ParentEmail">
                    {parent.user?.email}
                  </div>
                </div>
              ))}
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddChatModal;
