import React from "react";
import './Chat.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBan, faChevronLeft, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import {  faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import Image from '../../Assets/images/User.jpg'
import Message from "./Message";
const Chat = ()=>{
    return(
        <ul className="list-unstyled">
            <div className="ChatTopArea p-2">
                <div className="row Center">
                    <div className="col-lg-1 col-md-1 col-sm-1 col-1 Center p-1">
                        <FontAwesomeIcon icon={faArrowLeft}/>
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-9 col-9">
                    <div className="PostTopLeft">
                    <div className="PublisherImageContainer" >
                            <img src={Image} alt={''} />
                        </div>
                        <div className="PublisherNameAndDate">
                            <h6 className="PublisherName">Ahmed hamed</h6>
                            <span className="PublishDate"></span>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-1 col-md-1 col-sm-1 col-1 Center p-1 CloseRequest">
                        <FontAwesomeIcon icon={faBan}/> 
                        <span className="tooltip-text"><div className="text">Close Request</div></span>

                    </div>
                    
                </div>
            </div>
            
            <li className="list-item RedeemeLi">
                    <div className="row EditMailRow ">
                        <div className="col-lg-12 col-md-12 ChatArea">
                           <Message sent={true}/>
                           <Message sent={false}/>
                           <Message sent={true}/>
                           <Message sent={false}/>
                           <Message sent={true}/>
                           <Message sent={false}/>
                           <Message sent={true}/>
                           <Message sent={false}/>
                           <Message sent={true}/>
                           <Message sent={false}/>
                           <Message sent={true}/>
                           <Message sent={false}/>
                           
                        </div>
                        <div className="col-lg-12 col-md-12 BottomChatBar">
                            <input
                                className="col-lg-12 form-control EmailInput MessageInput"
                                dir="rtl"
                                placeholder={'Write your message'}
                                type="text"
                            />
                            <button className="Send">
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </button>
                            {/* <div className="Attach">
                                <input type="file" name="" id="Attachments" />
                                <label htmlFor="Attachments">
                                    <FontAwesomeIcon icon={faPaperclip} />
                                </label>
                            </div> */}
                        
                        </div>



                        
                    </div>
            </li>

        </ul>
    );
}
export default Chat;