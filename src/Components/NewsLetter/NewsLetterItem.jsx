import React, { useState } from "react";
import './NewsLetterItem.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
// import { faHeart as heart } from "@fortawesome/free-regular-svg-icons";
import DeleteSubjectModal from "../ManageClasses/DeleteSubjectModal";
import EditNewsLetterModal from "./EditNewsLetterModal";

const NewletterItem = ({ id, PublisherImage, PublisherName,Title , classs, PublishDate, Image, Text, Likes, OnDeleteNewsletter , OnUpdateNewsLetter }) => {
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const [isEditOverlayOpen, setIsEditeOverlayOpen] = useState(false);


    return (
        <div className="NewletterItem">
            <DeleteSubjectModal
                isOpen={isDeleteOverlayOpen}
                onClose={() => setIsDeleteOverlayOpen(false)}
                onDelete={() => OnDeleteNewsletter(id)}
            />
            {isEditOverlayOpen&&
            <EditNewsLetterModal
                newsletter={{description:Text,title:Title,class:classs , id:id , image:Image }}
                isOpen={isEditOverlayOpen}
                onUpdateNewsLetter={OnUpdateNewsLetter}
                onClose={()=>setIsEditeOverlayOpen(false)}
            />
            }

            <div className="row">
                <div className="col-lg-12 PostHeader">
                    <div className="PostTopLeft">
                        <div className="PublisherImageContainer" >
                            <img src={PublisherImage} alt={PublisherName} />
                        </div>
                        <div className="PublisherNameAndDate">
                            <h6 className="PublisherName">{PublisherName}</h6>
                            <span className="PublishDate">{PublishDate}</span>
                        </div>
                    </div>
                    <div className="PostTopRight">
                        <span className="DeletePost Center" onClick={() => setIsEditeOverlayOpen(true)}>
                            <FontAwesomeIcon icon={faPen} />
                        </span>
                        <span className="DeletePost Center" onClick={() => setIsDeleteOverlayOpen(true)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                        
                    </div>

                </div>
                
                <div className="col-lg-12 NewletterItemCol">
                    <h6>{Title}</h6>
                    <span>{Text}</span>
                </div>
                <div className="col-lg-12 NewletterItemCol NewsletterImage">
                    <img src={Image} width="100%" alt="" />
                </div>
                <div className={`col-lg-12 NewletterItemCol NewsletterLikes ${Likes == 0 ? 'HeartBlackOutlined' : ''}`}>
                    <FontAwesomeIcon icon={Likes == 0 ? faHeart : faHeart} /> {Likes}
                </div>
            </div>
        </div>

    );
}

export default NewletterItem;
