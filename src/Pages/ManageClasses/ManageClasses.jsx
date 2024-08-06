import React, { useState } from "react";
import Slider from "../../Components/Slider/Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import './ManageClasses.css'
import ManageClassesCompnent from "../../Components/ManageClasses/ManageClassesCompnent";
import Subject from "../../Components/ManageClasses/Subject";
import Schedule from "../../Components/ManageClasses/Schedule";
import Kids from "../../Components/ManageClasses/Kids";
const ManageClasses = ()=>{
    const [selectedClass , setSelectedClass] = useState(null);
    const HandleChangeClass = (classs)=>{
        setSelectedClass(classs);
        console.log(classs);
    }
    return(
        <div className="LoginMain">
            
                <ManageClassesCompnent ChangeClass={HandleChangeClass}/>
                <Kids SelectedClassId={selectedClass?.id}/>
                <Subject/>
                <Schedule/>


        </div>
    )
}
export default ManageClasses;