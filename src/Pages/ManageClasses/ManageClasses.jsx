import React, { useEffect, useState } from "react";
import ManageClassesCompnent from "../../Components/ManageClasses/ManageClassesCompnent";
import Subject from "../../Components/ManageClasses/Subject";
import Schedule from "../../Components/ManageClasses/Schedule";
import Kids from "../../Components/ManageClasses/Kids";
import { ClassService } from "../../Service/Api";
import './ManageClasses.css';

const ManageClasses = () => {
    const [updateKey, setUpdateKey] = useState(0);
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
                console.error('Error fetching default class:', error);
            }
        }
        fetchDefaultClass();
    }, []);

    const handleChangeClass = (classs) => {
        // console.log('Class changed:', classs); 
        setSelectedClass(classs.id);
        setUpdateKey(prevKey => prevKey + 1);
    };
    const updateSchedule=()=>{
        setUpdateKey(prevKey => prevKey + 1);
    }

    return (
        <div className="LoginMain">
            <ManageClassesCompnent ChangeClass={handleChangeClass} />
            {selectedClass && (
                <div className="div">
                    <Kids key={`Kids-${updateKey}`} SelectedClassId={selectedClass} />
                    <Subject key={`Subject-${updateKey}`} SelectedClassId={selectedClass} onUpdate={updateSchedule} />
                    <Schedule key={`Schedule-${updateKey}`} SelectedClassId={selectedClass} />
                </div>
            )}
        </div>
    );
};

export default ManageClasses;
