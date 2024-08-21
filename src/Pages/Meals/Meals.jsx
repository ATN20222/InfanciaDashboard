import React, { useEffect, useState } from "react";
import ManageClassesCompnent from "../../Components/ManageClasses/ManageClassesCompnent";
import MealsToSelect from "../../Components/Meals/MealsToSelect";
import MealsSchedule from "../../Components/Meals/MealsSchedule";
import { ClassService } from "../../Service/Api";

const Meals = ()=>{
    const [selectedMeal, setSelectedMeal] = useState(1); 
    const [selectedClass, setSelectedClass] = useState(null);
    const [updateKey, setUpdateKey] = useState(0);
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

    const handleSelectMeal = (meal) => {
        setSelectedMeal(meal);
        setUpdateKey((prevKey) => prevKey + 1);
    };

    return(
        <div className="LoginMain">
            <ManageClassesCompnent  IsMeals={false} ChangeClass={handleChangeClass} />
            {selectedClass&&
            <>
            <MealsToSelect key={`MealsToSelect-${updateKey}`} SelectedClassId={selectedClass} selectedMeal={selectedMeal} onSelectMeal={handleSelectMeal} />
            <MealsSchedule key={`MealsSchedule-${updateKey}`} SelectedClassId={selectedClass} selectedMeal={selectedMeal} updateKey={updateKey} />
            
            </>
            }
        </div>
    )
}
export default Meals;