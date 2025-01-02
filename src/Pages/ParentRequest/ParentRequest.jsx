import { faBell, faCommentDollar, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import UserImage from '../../Assets/images/User.jpg'
import ParentRequestItem from "../../Components/ParentRequest/ParentRequestItem";
import './ParentRequest.css'
import ReplyRequest from "../../Components/ParentRequest/ReplyRequest";
import ClosedRequestItem from "../../Components/ParentRequest/ClosedRequestItem";
import axios from "axios";
import { ParentRequestServices } from "../../Service/Api";
import AddChatModal from "./AddChatModal";
import toast, { Toaster } from "react-hot-toast";

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
            console.log(response.content);

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

    function formatDate(isoDateString) {
        const date = new Date(isoDateString);
        const now = new Date();

        const diffInMilliseconds = now - date;
        const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
        const diffInMonths = Math.floor(diffInDays / 30);
        const diffInYears = Math.floor(diffInMonths / 12);

        if (diffInSeconds < 60) {
            return diffInSeconds === 1 ? "1 second ago" : `${diffInSeconds} seconds ago`;
        } else if (diffInMinutes < 60) {
            return diffInMinutes === 1 ? "1 minute ago" : `${diffInMinutes} minutes ago`;
        } else if (diffInHours < 24) {
            return diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`;
        } else if (diffInDays < 30) {
            return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`;
        } else if (diffInMonths < 12) {
            return diffInMonths === 1 ? "1 month ago" : `${diffInMonths} months ago`;
        } else {
            return diffInYears === 1 ? "1 year ago" : `${diffInYears} years ago`;
        }
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
                        PublishDate={row.messages[0]?formatDate(row.messages[0]?.created_at):''}
                        PublisherImage={row.PublisherImage}
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
