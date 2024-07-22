import { faBell, faCommentDollar, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import NewLetterImage from '../../Assets/images/NewsletterImage.jpg'
import UserImage from '../../Assets/images/User.jpg'
import NewletterItem from "../../Components/NewsLetter/NewsLetterItem";
import AddNewsLetterModal from "../../Components/NewsLetter/AddNewsLetterModal";

const NewsLetter = () => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const handleAddNewsLetter = (content) => {
        
    }; 
    const Data = [
        { 
            id: 1, 
            PublisherImage: UserImage, 
            PublisherName:"Ahmed Sha3rawy", 
            PublishDate:"03-7-2018 17:00" , 
            Image:NewLetterImage , 
            Text:`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente velit fugit numquam animi eaque quaerat mollitia. Dolores saepe itaque voluptate nemo, totam, exercitationem distinctio blanditiis dolore eius ducimus repellendus? Earum.` , 
            Likes:"15k"
        },
        { 
            id: 2, 
            PublisherImage: UserImage, 
            PublisherName:"Nadia Bate5a", 
            PublishDate:"03-7-2018 17:00" , 
            Image:NewLetterImage , 
            Text:`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente velit fugit numquam animi eaque quaerat mollitia. Dolores saepe itaque voluptate nemo, totam, exercitationem distinctio blanditiis dolore eius ducimus repellendus? Earum.` , 
            Likes:"1000"
        }
        
    ];

    return (
        <section className="SecondSliderSection ManageClassesCompnent">
             <AddNewsLetterModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onAddNewsLetter={handleAddNewsLetter}
            />
            <div className="Container HeadContainer">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="HeadLeftItem">
                            Newsletter
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6 HeadRightCol">
                        <div className="HeadRightItem">
                            <div className="CirclePlus" onClick={()=>setIsOverlayOpen(true)}>
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {Data.map((row) => (
                <NewletterItem
                    key={row}
                    Image={row.Image}
                    Likes={row.Likes}
                    PublishDate={row.PublishDate}
                    PublisherImage={row.PublisherImage}
                    PublisherName={row.PublisherName}
                    Text={row.Text}
                />
            ))}
           
        </section>
    );
};

export default NewsLetter;
