import React from "react";
import Slider from "../../Components/Slider/Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import './ManageClasses.css'
import ManageClassesCompnent from "../../Components/ManageClasses/ManageClassesCompnent";
import Subject from "../../Components/ManageClasses/Subject";
const ManageClasses = ()=>{
    return(
        <div className="LoginMain">
            
                <ManageClassesCompnent/>
                <Subject/>


        </div>
    )
}
export default ManageClasses;