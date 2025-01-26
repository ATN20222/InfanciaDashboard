import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
// import { faHeart as heart } from "@fortawesome/free-regular-svg-icons";
import DeleteSubjectModal from "../ManageClasses/DeleteSubjectModal";

const BlogItem = ({ id,title,description ,tags , image ,created_at, onEditBlog , OnDeleteNewsletter }) => {
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    function formatDate(isoDateString) {
        const date = new Date(isoDateString);
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        return formattedDate;
    }

    return (
        <div className="NewletterItem">
            <DeleteSubjectModal
                isOpen={isDeleteOverlayOpen}
                onClose={() => setIsDeleteOverlayOpen(false)}
                onDelete={() => OnDeleteNewsletter(id)}
            />

            <div className="row">
                <div className="col-lg-12 PostHeader">
                    <div className="PostTopLeft">
                        {tags!=null&&tags.map(element => (
                            <span className="Tag">{element}</span>
                        ))}
                    </div>
                    <div className="PostTopRight">
                        <span className="DeletePost Center" onClick={() => setIsDeleteOverlayOpen(true)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                    </div>

                </div>
                <div className="col-lg-12 NewletterItemCol NewsletterImage">
                    <img src={image} width="100%" alt="" />
                </div>
                <div className="col-lg-12 NewletterItemCol">
                    <h6>{title}</h6>
                    <span>
                        {formatDate(created_at)}
                    </span>
                    
                    <p>{description}</p>
                </div>


            </div>
        </div>

    );
}

export default BlogItem;
