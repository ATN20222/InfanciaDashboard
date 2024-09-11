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

const ParentRequest = () => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [SelectedTab, setSelectedTab] = useState(1);
    const [opendRequests, setOpendRequests] = useState([]);
    const [closedRequests, setClosedRequests] = useState([]);
    const [SelectedRequestToReply, setSelectedRequestToReply] = useState(null);

    useEffect(() => {
        GetData();
    }, []);

    async function GetData() {
        try {
            const response = await ParentRequestServices.ListRequests();
            console.log(response.content);
            const o = response.content.filter(i => i.closed === 0);
            const m = response.content.filter(i => i.closed === 1);
            setOpendRequests(o);
            setClosedRequests(m);
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
    
    return (
        <section className="SecondSliderSection ManageClassesCompnent ParentRequestSection">
            {SelectedRequestToReply && SelectedRequestToReply.sender && (
                <ReplyRequest
                    id={SelectedRequestToReply.id}
                    closedRequest={SelectedRequestToReply.closed}
                    userId={SelectedRequestToReply.sender.id}
                    userName={SelectedRequestToReply.sender.name}
                    isOpen={isOverlayOpen}
                    onClose={handleCloseChat}
                    onReply={handleReply}
                />
            )}

            <div className="Container HeadContainer">
                <div className="row ParentRequestRow">
                    <div
                        className={`col-lg-6 col-md-6 col-sm-6 col-6 Center OpenRequestCol ${SelectedTab === 1 ? "SelectedRequest" : ""}`}
                        onClick={() => setSelectedTab(1)}
                    >
                        Open Request
                    </div>
                    <div
                        className={`col-lg-6 col-md-6 col-sm-6 col-6 Center ClosedRequestCol ${SelectedTab === 2 ? "SelectedRequest" : ""}`}
                        onClick={() => setSelectedTab(2)}
                    >
                        Closed Request
                    </div>
                </div>
            </div>

            {SelectedTab === 1 ? opendRequests.map((row) => (
                <div className="RequestItemContainer" key={row.id} onClick={() => { setSelectedRequestToReply(row); setIsOverlayOpen(true); }}>
                    <ParentRequestItem
                        PublishDate={formatDate(row.message.created_at)}
                        PublisherImage={row.PublisherImage}
                        PublisherName={row.sender.name}
                        Text={row.message.message}
                        IsPopUp={false}
                    />
                </div>
            )) :
                closedRequests.map((row) => (
                    <div className="RequestItemContainer" key={row.id} onClick={() => { setSelectedRequestToReply(row); setIsOverlayOpen(true); }}>
                        <ParentRequestItem
                            PublishDate={row.PublishDate}
                            PublisherImage={row.PublisherImage}
                            PublisherName={row.sender.name}
                            Text={row.Text}
                            IsPopUp={false}
                        />
                    </div>
                ))}
        </section>
    );
};

export default ParentRequest;
