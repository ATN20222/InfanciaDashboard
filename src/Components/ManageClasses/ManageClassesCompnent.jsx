import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Slider from "../Slider/Slider";
import AddClassModal from "./AddClassModal";
import { ClassService } from "../../Service/Api";
import toast, { Toaster } from "react-hot-toast";
import EditClassModal from "./EditClassModal";
const ManageClassesCompnent = ({IsMeals , ChangeClass})=>{
    const [isMeals ,setIsMeals] = useState(false);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [classes , setClasses] = useState([]);
    const [Selectclass , setSelectclass] = useState(null);
    const [isEditOverlayOpen , setIsEditOverlayOpen] = useState(false);
    const [SelectedClassData , setSelectedClassData] = useState([]);
    useEffect(()=>{
        if(IsMeals){
            setIsMeals(true);
        }
        GetData();
    },[]);

    
  const handleEditClass = async (id, className , classAgeFrom ,classAgeTo)=>{
      
      try {
          
        console.log(id ,className ,  classAgeFrom , classAgeTo);
        const response = await ClassService.Edit( id ,className ,  classAgeFrom , classAgeTo);
        toast.success('Class edited successfully');
      
        GetData();
    } catch (error) {
        console.log(error)
        toast.error('Failed to edit class');


    }
  }
    const HandleEditClassClick = (ClassData)=>{
        setSelectedClassData(ClassData);
        setIsEditOverlayOpen(true);
    }

    const handleAddClass = async (className , ClassAgeFrom , ClassAgeTo) => {
        try {
    
            const response = await ClassService.Add(className , ClassAgeFrom , ClassAgeTo);
            console.log(response);
            toast.success('Class added successfully');
            GetData();
            
            
          } catch (error) {
              console.log(error)
      
          }
    };
    async function GetData() {
        try {
    
          const response = await ClassService.List();
          setClasses(response.content);
          console.log("response.content",response)
    
          
        } catch (error) {
            console.log(error)
    
        }
    }

    const ChangeSelectedClass = (classs)=>{
        setSelectclass(classs);
        ChangeClass(classs);
    }
    return(
        <section className="SecondSliderSection ManageClassesCompnent">
            <AddClassModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onAddClass={handleAddClass}
            />
             <div className="Toaster">
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
            <EditClassModal
                
                Data = {SelectedClassData}
                isOpen={isEditOverlayOpen}
                onClose={() => setIsEditOverlayOpen(false)}
                onEditClass={handleEditClass}
            />
            <div className={`Container HeadContainer`}>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                            <div className="HeadLeftItem">
                                
                                {IsMeals?"Meals":"Manage classes"}
                            </div>
                        </div>
                        {!IsMeals&&
                         <div className="col-lg-6 col-md-6 col-sm-6 col-6 HeadRightCol">
                            <div className="HeadRightItem">
                                <div className="CirclePlus" onClick={()=>setIsOverlayOpen(true)}>
                                    <FontAwesomeIcon icon={faPlus}/>
                                </div>
                            </div>
                        </div>
                        }
                       
                    </div>
                </div>
                <Slider OnEdit={HandleEditClassClick} IsMeals={isMeals} Classes={classes} HandleSelectClass={ChangeSelectedClass}/>
        </section>
    );
}
export default ManageClassesCompnent;