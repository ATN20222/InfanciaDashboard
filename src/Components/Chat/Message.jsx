import React, { useEffect } from "react";
import './Message.css'
import personImage from '../../Assets/images/User.jpg'
const SentMessage = ({message}) => {
  useEffect(()=>{
    console.log("message",message)
  },[]);
  function formatDate(dateString) {
    const date = new Date(dateString);
    
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getUTCFullYear().toString(); 
  
    return `${hours}:${minutes} ${day}-${month}-${year}`;
  }
    return(
        
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12 Msg">
                
                {/* <div className="col-lg-2 col-md-3 col-sm-3 col-2 PersonImgCol">
                    <div className="PersonImgContainer">
                        <img src={personImage} width="100%" alt="" />
                    </div>
                </div> */}
                <div className="col-lg-9 col-md-8 col-sm-8 col-8 MsgText MsgSent">
                    <span>
                      {message.message}
                    </span>
                    <div className="DateTime SentDate">
                      <span>{formatDate(message.created_at)}</span>
                    </div>
                </div>
        </div>
    );
}

const ReceivedMessage = ({message}) => {
  function formatDate(dateString) {
    const date = new Date(dateString);
    
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getUTCFullYear().toString(); 
  
    return `${hours}:${minutes} ${day}-${month}-${year}`;
  }
    return (
      <div className="row col-lg-12 col-md-12 col-sm-12 col-12 Msg Received">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12 DateTime">
        </div>
        {/* <div className="col-lg-2 col-md-3 col-sm-3 col-2 PersonImgCol">
          <div className="PersonImgContainer">
            <img src={personImage} width="100%" alt="" />
          </div>
        </div> */}
        <div className="col-lg-9 col-md-8 col-sm-8 col-8 MsgText MsgTextReceived">
          <span>
            {message.message}
          </span>
          <div className="DateTime">

            <span className="MsgDate">{formatDate(message.created_at)}</span>
          </div>

        </div>
        
      </div>
    );
  }

  const Message = ({ sent , msg }) => {
    return sent ?  <ReceivedMessage message={msg} />:<SentMessage message={msg} />;
  }

export default Message;