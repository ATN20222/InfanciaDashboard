import React, { useState } from "react";
import './ScheduleItem.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddContentModal from "../ManageClasses/AddContentModal";
const ScheduleItem = ({ id , SubjectName ,OnConfirmAddContent})=>{
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    

    const handleAddContent = (content) => {
        OnConfirmAddContent(id ,content)
      };
    return(
        <div className="col-lg-12 ScheduleItemContainer">
             <AddContentModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onAddContent={handleAddContent}
            />
            <div className="ScheduleItem">
                <div className="LeftSidePartSched">

                    <h5>{SubjectName}</h5>
                </div>
                <div className="RightPartSched" onClick={()=>setIsOverlayOpen(true)}>
                    <FontAwesomeIcon icon={faPlus}/>
                </div>
            </div>

           
            
        </div>
        
    );
}
export default ScheduleItem;