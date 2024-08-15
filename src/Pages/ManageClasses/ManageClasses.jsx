import React, { useEffect, useState } from "react";
import Slider from "../../Components/Slider/Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import './ManageClasses.css';
import ManageClassesCompnent from "../../Components/ManageClasses/ManageClassesCompnent";
import Subject from "../../Components/ManageClasses/Subject";
import Schedule from "../../Components/ManageClasses/Schedule";
import Kids from "../../Components/ManageClasses/Kids";
import { ClassService } from "../../Service/Api";

const ManageClasses = () => {
    const [selectedClass, setSelectedClass] = useState(null);

    useEffect(() => {
        async function fetchDefaultClass() {
            try {
                const response = await ClassService.List();
                const defaultClass = response.content[0];
                if (defaultClass) {
                    setSelectedClass(defaultClass.id);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchDefaultClass();
    }, []);

    const HandleChangeClass = (classs) => {
        setSelectedClass(classs.id);
    };

    return (
        <div className="LoginMain">
            <ManageClassesCompnent ChangeClass={HandleChangeClass} />
            <Kids SelectedClassId={selectedClass} />
            <Subject SelectedClassId={selectedClass} />
            <Schedule />
        </div>
    );
};

export default ManageClasses;
