import { faBell, faCommentDollar, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import FAQItem from "../../Components/FAQ/FAQItem";
import './FAQ.css'
import AddFAQModal from "../../Components/FAQ/AddFAQModal";
const FAQ = () => {
    const Data = [
        { 
            id: 1, 
            Question: "How do you keep my app and my data secure?", 
            Answer:`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente velit fugit numquam animi eaque quaerat mollitia. Dolores saepe itaque voluptate nemo, totam, exercitationem distinctio blanditiis dolore eius ducimus repellendus? Earum.` , 
           
        },
        { 
            id: 2, 
            Question: "How do you keep my app and my data secure?", 
            Answer:`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente velit fugit numquam animi eaque quaerat mollitia. Dolores saepe itaque voluptate nemo, totam, exercitationem distinctio blanditiis dolore eius ducimus repellendus? Earum.` , 
           
        },
        
    ];

    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    

    const handleAddFAQ = (content) => {
        
      };

    return (
        <section className="SecondSliderSection ManageClassesCompnent">
             <AddFAQModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onAddFAQ={handleAddFAQ}
            />
            <div className="Container HeadContainer">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="HeadLeftItem">
                            FAQ
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6 HeadRightCol">
                        <div className="HeadRightItem">
                            <div className="CirclePlus" onClick={() => setIsOverlayOpen(true)} >
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="DropDownContainer">

                <div className="row">
                {Data.map((row) => (
                    <FAQItem 
                        key={row.id}
                        Question={row.Question}
                        Answer={row.Answer}
                    />
                ))}
                </div>
            </div>
            
               
           
        </section>
    );
};

export default FAQ;
