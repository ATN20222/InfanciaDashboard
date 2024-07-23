import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Slider from "../Slider/Slider";
import AddClassModal from "./AddClassModal";
const ManageClassesCompnent = ({IsMeals})=>{
    const [isMeals ,setIsMeals] = useState(false);
    useEffect(()=>{
        if(IsMeals){
            setIsMeals(true);
        }
    },[]);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    

    const handleAddClass = (className) => {
        
      };
    

    return(
        <section className="SecondSliderSection ManageClassesCompnent">
            <AddClassModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onAddClass={handleAddClass}
            />
            <div className={`Container HeadContainer`}>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                            <div className="HeadLeftItem">
                                Manage classes
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6 HeadRightCol">
                            <div className="HeadRightItem">
                                <div className="CirclePlus" onClick={()=>setIsOverlayOpen(true)}>
                                    <FontAwesomeIcon icon={faPlus}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Slider IsMeals={isMeals}/>
        </section>
    );
}
export default ManageClassesCompnent;