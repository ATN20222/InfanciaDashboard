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
                console.log(error);
            }
        }
        fetchDefaultClass();
    }, []);

    const handleChangeClass = (classs) => {
        setSelectedClass(classs.id);
        setUpdateKey(prevKey => prevKey + 1);
    };

    return (
        <div className="LoginMain">
            <ManageClassesCompnent ChangeClass={handleChangeClass} />
            {selectedClass && (
                <div className="div">
                    <Kids key={`Kids-${selectedClass}`} SelectedClassId={selectedClass} />
                    <Subject key={`Subject-${selectedClass}`} SelectedClassId={selectedClass} onUpdate={handleChangeClass} />
                    <Schedule key={`Schedule-${selectedClass}`} SelectedClassId={selectedClass} />
                </div>
            )}
        </div>
    );
};

export default ManageClasses;
