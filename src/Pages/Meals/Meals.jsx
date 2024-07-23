import React, { useState } from "react";
import ManageClassesCompnent from "../../Components/ManageClasses/ManageClassesCompnent";
import MealsToSelect from "../../Components/Meals/MealsToSelect";
import MealsSchedule from "../../Components/Meals/MealsSchedule";

const Meals = ()=>{
    const [SelectedMeals , setSelectedMeal]= useState(1);
    return(
        <div className="LoginMain">
            
                <ManageClassesCompnent IsMeals={true}/>
                <MealsToSelect/>
                <MealsSchedule/>

        </div>
    )
}
export default Meals;