import { faBell, faCommentDollar, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import UserImage from '../../Assets/images/INFANCIA_LOGO.png'
import ParentRequestItem from "../../Components/ParentRequest/ParentRequestItem";
import './ParentRequest.css'
import ReplyRequest from "../../Components/ParentRequest/ReplyRequest";
import ClosedRequestItem from "../../Components/ParentRequest/ClosedRequestItem";
import axios from "axios";
import { ParentRequestServices } from "../../Service/Api";
import AddChatModal from "./AddChatModal";
import toast, { Toaster } from "react-hot-toast";

import { getBranchId, getToken, getUserId } from "../../Service/AxiosApi";
import { echo } from "../../Service/RealTime";
const ParentRequest = () => {

    

    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [isAddOverlayOpen, setIsAddOverlayOpen] = useState(false);
    const [chats, setchats] = useState([]);
    const [SelectedRequestToReply, setSelectedRequestToReply] = useState(null);

    useEffect(() => {
        GetData();
    }, []);


    async function GetData() {
        try {
            const response = await ParentRequestServices.ListRequests();
            // console.log(response.content);

            setchats(response.content);
            // setClosedRequests(m);
        } catch (error) {
            console.error(error);
        }
    }

    const handleReply = (reply) => {
        // Handle the reply action
    }

    const handleCloseChat = () => {
        setIsOverlayOpen(false);
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
    
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const day = date.getUTCDate().toString().padStart(2, '0');
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const year = date.getUTCFullYear().toString();
    
        return `${hours}:${minutes} ${day}-${month}-${year}`;
      }
    const handleAddChat = async (id) => {
        try {
            const response = await ParentRequestServices.AddChat(id);
            toast.success('Chat added successfully');
            GetData();

        } catch (error) {
            toast.error(`${error}`);
        }
    }

    useEffect(() => {
        const channel = echo.private(`chat.${getUserId()}`);
    
        channel.listen('ChatEvent', (data) => {
            GetData();
            // setchats((prevChats) => {
            //     const updatedChats = prevChats.map(chat => 
            //         chat.id === data.chat_id 
            //             ? { ...chat, messages: [{ ...chat.messages[0], message: data.content.message }] }
            //             : chat
            //     );
    
            //     // Move the updated chat to the top
            //     const reorderedChats = updatedChats.sort((a, b) => (a.id === data.chat_id ? -1 : b.id === data.chat_id ? 1 : 0));
    
            //     return reorderedChats;
            // });
        });
    
        return () => {
            echo.leave(`chat.${getUserId()}`);
        };
    }, []);
    
    

    return (
        <section className="SecondSliderSection ManageClassesCompnent ParentRequestSection">
            {isAddOverlayOpen &&
                <AddChatModal
                    isOpen={isAddOverlayOpen}
                    onAddChat={handleAddChat}
                    onClose={() => setIsAddOverlayOpen(false)}
                />
            }
            <div className="Toaster">
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>

            <div className="Container HeadContainer">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="HeadLeftItem">
                            Chats
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6 HeadRightCol">
                        {/* <div className="SearchPayment SearchCol">
                                <input type="text" className="FormInput" name="" id="" placeholder="Search..."/>
                            </div> */}
                        <div className="HeadRightItem">
                            <div className="CirclePlus" onClick={() => setIsAddOverlayOpen(true)}>
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {SelectedRequestToReply && (
                <ReplyRequest
                    id={SelectedRequestToReply.id}
                    userId={SelectedRequestToReply.user?.id}
                    userName={SelectedRequestToReply.user?.name}
                    isOpen={isOverlayOpen}
                    onClose={handleCloseChat}
                    onReply={handleReply}
                />
            )}



            {chats.map((row) => (
                <div className="RequestItemContainer" key={row.id} onClick={() => { setSelectedRequestToReply(row); setIsOverlayOpen(true); }}>
                    <ParentRequestItem
                        PublishDate={row.messages[0] ? formatDate(row.messages[0]?.created_at) : ''}
                        PublisherImage={row.user?.media?.length > 0 ? row.user?.media[0]?.original_url : UserImage}
                        PublisherName={row.user?.name}
                        Text={row.messages[0]?.message}
                        IsPopUp={false}
                    />
                </div>
            ))}
        </section>
    );
};

export default ParentRequest;
