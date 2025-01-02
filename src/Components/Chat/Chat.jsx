import React, { useEffect, useState, useRef } from "react";
import './Chat.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBan } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import Message from "./Message";
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { ParentRequestServices } from "../../Service/Api";
import { getBranchId, getToken } from "../../Service/AxiosApi";

window.Pusher = Pusher;
const echo = new Echo({
    broadcaster: 'pusher',
    key: '81c558fbfd3ec3d7f363',
    cluster: 'eu',
    forceTLS: true,
    authEndpoint: 'https://orchid-aardvark-632100.hostingersite.com/broadcasting/auth',
    auth: {
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
    },
});

const Chat = ({ SelectedUserId, Name, close, ClosedChat, ChatId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);
    const currentUserId = getBranchId();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await ParentRequestServices.ListMessages(ChatId);
                setMessages(response.content.messages);
                // console.log
            } catch (error) {
                console.error(error);
            }
        };

        fetchMessages();
    }, [ChatId]);

    useEffect(() => {
        const channel = echo.private(`chat.${ChatId}`);
        channel.listen('MessageSent', (data) => {
            setMessages((prevMessages) => [...prevMessages, data.content]);
        });
        return () => {
            echo.leave(`chat.${ChatId}`);
        };
    }, [ChatId]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const sendMessage = async () => {
        const msg = newMessage;
        setNewMessage('');
        try {
            await ParentRequestServices.SendMessages(ChatId, msg);
            setNewMessage('');

        } catch (error) {
            setNewMessage(msg);
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
                </div>
            </div>

            <li className="list-item RedeemeLi">
                <div className="row EditMailRow">
                    <div className="col-lg-12 col-md-12 ChatArea">
                        {messages.map((message) => (
                            <Message key={message?.id} msg={message} sent={currentUserId !== message?.sender_id} />
                        ))}
                        <div ref={messagesEndRef} /> {/* Scroll target */}
                    </div>
                    {!ClosedChat &&
                        <div className="col-lg-12 col-md-12 BottomChatBar">
                            <input
                                className="col-lg-12 form-control EmailInput MessageInput"
                                dir="rtl"
                                placeholder="Write your message"
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
