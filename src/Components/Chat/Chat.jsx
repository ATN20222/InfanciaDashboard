import React, { useEffect, useState, useRef } from "react";
import './Chat.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBan } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import Message from "./Message";
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { ParentRequestServices } from "../../Service/Api";
import { getNurseryId } from "../../Service/AxiosApi";

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: 'pusher',
  key: '9dcc0082ae400746d639',
  cluster: 'ap2',
  forceTLS: true,
});

const Chat = ({ SelectedUserId, Name, close , ClosedChat }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null); // Reference for scrolling to bottom
    console.log("ClosedChat", ClosedChat)
    const currentUserId = getNurseryId();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await ParentRequestServices.ListMessages(SelectedUserId);
                setMessages(response.content);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMessages();
    }, [SelectedUserId]);

    useEffect(() => {
        const pusher = new Pusher('616758b3b6d8b0296845', {
            cluster: 'eu',
            encrypted: true,
        });

        const senderId = getNurseryId();
        const receiverId = SelectedUserId;
        const channelName = `chat.${Math.min(senderId, receiverId)}.${Math.max(senderId, receiverId)}`;
        const channel = pusher.subscribe(channelName);
        channel.bind('chatMessage', function (data) {
            let obj = JSON.parse(data.content);
            setMessages((prevMessages) => [...prevMessages, obj]);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [SelectedUserId]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const sendMessage = async () => {
        const msg = newMessage;
        setNewMessage('');
        try {
            await ParentRequestServices.SendMessages(SelectedUserId, msg);
            setNewMessage('');
        } catch (error) {
            setNewMessage(msg)
            console.error('Send Message Error:', error);
        }
    };

    return (
        <ul className="list-unstyled ChatUl">
            <div className="ChatTopArea p-2">
                <div className="row Center">
                    <div className="col-lg-1 col-md-1 col-sm-1 col-1 Center p-1" onClick={close}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-9 col-9">
                        <div className="PostTopLeft">
                            <div className="PublisherNameAndDate">
                                <h6 className="PublisherName">{Name}</h6>
                            </div>
                        </div>
                    </div>
                    {!ClosedChat&&
                      <div className="col-lg-1 col-md-1 col-sm-1 col-1 Center p-1 CloseRequest">
                          <FontAwesomeIcon icon={faBan} />
                          <span className="tooltip-text"><div className="text">Close Request</div></span>
                      </div>
                    }
                  
                </div>
            </div>

            <li className="list-item RedeemeLi">
                <div className="row EditMailRow">
                    <div className="col-lg-12 col-md-12 ChatArea">
                        {messages.map((message) => (
                            <Message key={message.id} msg={message} sent={SelectedUserId === message.sender} />
                        ))}
                        <div ref={messagesEndRef} /> {/* Scroll target */}
                    </div>
                    {!ClosedChat&&
                      <div className="col-lg-12 col-md-12 BottomChatBar">
                      <input
                          className="col-lg-12 form-control EmailInput MessageInput"
                          dir="rtl"
                          placeholder={'Write your message'}
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                      />
                      <button className="Send" onClick={sendMessage}>
                          <FontAwesomeIcon icon={faPaperPlane} />
                      </button>
                  </div>
                    }
                    
                </div>
            </li>
        </ul>
    );
};

export default Chat;
