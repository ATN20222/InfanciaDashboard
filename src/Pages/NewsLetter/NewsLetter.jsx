import { faBell, faCommentDollar, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import NewLetterImage from '../../Assets/images/NewsletterImage.jpg'
import UserImage from '../../Assets/images/User.jpg'
import NewletterItem from "../../Components/NewsLetter/NewsLetterItem";
import AddNewsLetterModal from "../../Components/NewsLetter/AddNewsLetterModal";
import { NewsLetterServices } from "../../Service/Api";
import toast, { Toaster } from "react-hot-toast";
import InfanciaLogo from '../../Assets/images/INFANCIA_LOGO.png'
const NewsLetter = () => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [newsletters, setNewsletters] = useState([]);
        
    useEffect(()=>{
        GetData();
    },[]);
    const   handleAddNewsLetter = async (description , image ,title , class_id) => {
        try {
        
            const response = await NewsLetterServices.Add(description,title,class_id,image);
            toast.success('newsletter added successfully');
            GetData();  
        } catch (error) {
            console.log(error)
            toast.error('Failed to add newsletter');
    
    
        }
    }; 


    async function GetData() {
        try {

            const response = await NewsLetterServices.List();
            console.log(response);
            setNewsletters(response.content);

            
        } catch (error) {
            console.log(error)

        }
    }
    function formatDate(dateString) {
        const date = new Date(dateString);

        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
        const year = date.getUTCFullYear();
        
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');

        return `${day}-${month}-${year} ${hours}:${minutes}`;
    }

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
    const HandleDeleteNewsletter = async (id)=>{
        try {
          
            const response = await NewsLetterServices.Delete(id);
            toast.success('newsletter deleted successfully');
            GetData();  
        } catch (error) {
            toast.error('Failed to delete newsletter');
    
    
        }
    }
    return (
        <section className="SecondSliderSection ManageClassesCompnent">
             <AddNewsLetterModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onAddNewsLetter={handleAddNewsLetter}
            />
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
            {newsletters.map((row) => (
                <NewletterItem
                    key={row.id}
                    id={row.id}
                    Image={row.media[0]?.original_url}
                    Likes={row.likes_counts?row.likes_counts:0}
                    Title={row.title}
                    PublishDate={formatDate(row.created_at) }
                    PublisherImage={`https://ui-avatars.com/api/?rounded=true&name=${row.class_room?row.class_room?.name:'All Classes'}&background=random`}
                    PublisherName={(row.is_private&&row.class_room )?row.class_room?.name:'All Classes'}
                    Text={row.content}
                    OnDeleteNewsletter={HandleDeleteNewsletter}
                />
            ))}
           
        </section>
    );
};

export default NewsLetter;
