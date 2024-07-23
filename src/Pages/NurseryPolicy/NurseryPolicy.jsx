import { faBell, faCommentDollar, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import AddFAQModal from "../../Components/FAQ/AddFAQModal";
import NurseryPolicyItem from "../../Components/NurseryPolicy/NurseryPolicyItem";
import AddNurseryPolicyModal from "../../Components/NurseryPolicy/AddNurseryPolicyModal";
const NurseryPolicy = () => {
    const Data = [
        { 
            id: 1, 
            Title: "Health awareness", 
            Description:`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente velit fugit numquam animi eaque quaerat mollitia. Dolores saepe itaque voluptate nemo, totam, exercitationem distinctio blanditiis dolore eius ducimus repellendus? Earum.` , 
           
        },
        { 
            id: 2, 
            Title: "Health awareness", 
            Description:`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente velit fugit numquam animi eaque quaerat mollitia. Dolores saepe itaque voluptate nemo, totam, exercitationem distinctio blanditiis dolore eius ducimus repellendus? Earum.` , 
           
        },
        
    ];

    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    

    const handleAddFAQ = (content) => {
        
      };

    return (
        <section className="SecondSliderSection ManageClassesCompnent">
             <AddNurseryPolicyModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onAddNurseryPolicy={handleAddFAQ}
            />
            <div className="Container HeadContainer">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="HeadLeftItem">
                        Nursery Policy
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
                    <NurseryPolicyItem 
                        key={row.id}
                        Title={row.Title}
                        Description={row.Description}
                    />
                ))}
                </div>
            </div>
            
               
           
        </section>
    );
};

export default NurseryPolicy;
