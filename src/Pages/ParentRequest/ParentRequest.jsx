import { faBell, faCommentDollar, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import UserImage from '../../Assets/images/User.jpg'
import ParentRequestItem from "../../Components/ParentRequest/ParentRequestItem";
import './ParentRequest.css'
import ReplyRequest from "../../Components/ParentRequest/ReplyRequest";
import ClosedRequestItem from "../../Components/ParentRequest/ClosedRequestItem";

const ParentRequest = () => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [SelectedTab , setSelectedTab]= useState(1);
    const [SelectedRequestToReply, setSelectedRequestToReply]=useState( { 
        id: 1, 
        PublisherImage: UserImage, 
        PublisherName:"Ahmed Sha3rawy", 
        PublishDate:"03-7-2018 17:00", 
        Text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente velit fugit numquam animi eaque quaerat mollitia. Dolores saepe itaque voluptate nemo, totam, exercitationem distinctio blanditiis dolore eius ducimus repellendus? Earum.`, 
        
    });
    const Data = [
        { 
            id: 1, 
            PublisherImage: UserImage, 
            PublisherName:"Ahmed Sha3rawy", 
            PublishDate:"03-7-2018 17:00", 
            Text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente velit fugit numquam animi eaque quaerat mollitia. Dolores saepe itaque voluptate nemo, totam, exercitationem distinctio blanditiis dolore eius ducimus repellendus? Earum.`, 
           
        },
        { 
            id: 2, 
            PublisherImage: UserImage, 
            PublisherName:"Nadia Bate5a", 
            PublishDate:"03-7-2018 17:00", 
            Text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente velit fugit numquam animi eaque quaerat mollitia. Dolores saepe itaque voluptate nemo, totam, exercitationem distinctio blanditiis dolore eius ducimus repellendus? Earum.`, 
          
        }
    ];
    const ClosedData = [
        { 
            id: 1, 
            PublisherImage: UserImage, 
            PublisherName:"Ahmed Sha3rawy", 
            PublishDate:"03-7-2018 17:00", 
            Text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente velit fugit numquam animi eaque quaerat mollitia. Dolores saepe itaque voluptate nemo, totam, exercitationem distinctio blanditiis dolore eius ducimus repellendus? Earum.`, 
            ReplierImage:UserImage,
            ReplierName:"Mo7y elshar2awy", 
            ReplierDate:"03-7-2019 17:00" , 
            ReplierText: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente velit fugit numquam animi eaque quaerat mollitia. Dolores saepe itaque voluptate nemo, totam, exercitationem distinctio blanditiis dolore eius ducimus repellendus? Earum.`,
        },
        { 
            id: 1, 
            PublisherImage: UserImage, 
            PublisherName:"Ahmed Sha3rawy", 
            PublishDate:"03-7-2018 17:00", 
            Text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente velit fugit numquam animi eaque quaerat mollitia. Dolores saepe itaque voluptate nemo, totam, exercitationem distinctio blanditiis dolore eius ducimus repellendus? Earum.`, 
            ReplierImage:UserImage,
            ReplierName:"Mo7y elshar2awy", 
            ReplierDate:"03-7-2019 17:00" , 
            ReplierText: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente velit fugit numquam animi eaque quaerat mollitia. Dolores saepe itaque voluptate nemo, totam, exercitationem distinctio blanditiis dolore eius ducimus repellendus? Earum.`,
        },
        { 
            id: 1, 
            PublisherImage: UserImage, 
            PublisherName:"Ahmed Sha3rawy", 
            PublishDate:"03-7-2018 17:00", 
            Text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente velit fugit numquam animi eaque quaerat mollitia. Dolores saepe itaque voluptate nemo, totam, exercitationem distinctio blanditiis dolore eius ducimus repellendus? Earum.`, 
            ReplierImage:UserImage,
            ReplierName:"Mo7y elshar2awy", 
            ReplierDate:"03-7-2019 17:00" , 
            ReplierText: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente velit fugit numquam animi eaque quaerat mollitia. Dolores saepe itaque voluptate nemo, totam, exercitationem distinctio blanditiis dolore eius ducimus repellendus? Earum.`,
        },
    ];

    const handleReply= (reply)=>{

    }

    return (
        <section className="SecondSliderSection ManageClassesCompnent ParentRequestSection">
            <ReplyRequest
             isOpen={isOverlayOpen}
             onClose={() => setIsOverlayOpen(false)}
             onReply={handleReply}
            id={SelectedRequestToReply.id}
            PublishDate={SelectedRequestToReply.PublishDate}
            PublisherImage={SelectedRequestToReply.PublisherImage}
            Text={SelectedRequestToReply.Text}
            PublisherName={SelectedRequestToReply.PublisherName}
            />
           
            
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

            {SelectedTab === 1 ? Data.map((row) => (
                <div className="RequestItemContainer" onClick={()=>{ setSelectedRequestToReply(row); setIsOverlayOpen(true); }}>
                <ParentRequestItem
                    key={row.id}
                    PublishDate={row.PublishDate}
                    PublisherImage={row.PublisherImage}
                    PublisherName={row.PublisherName}
                    Text={row.Text}
                    IsPopUp={false}                    

                />
                </div>
                
            )) : ClosedData.map((row) => (
                <div className="RequestItemContainer" >
                <ClosedRequestItem
                    key={row.id}
                    PublishDate={row.PublishDate}
                    PublisherImage={row.PublisherImage}
                    PublisherName={row.PublisherName}
                    Text={row.Text}
                    IsPopUp={false}                    
                    ReplierDate={row.ReplierDate}
                    ReplierImage={row.ReplierImage}
                    ReplierName={row.ReplierName}
                    ReplierText={row.Text}

                />
                </div>
                
            )) }
        </section>
    );
};

export default ParentRequest;
