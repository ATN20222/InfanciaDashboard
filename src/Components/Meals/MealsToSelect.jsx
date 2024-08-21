import React, { useEffect } from "react";
import './MealsToSelect.css';
import Breakfast from '../../Assets/images/Breakfast.png';
import Lunch from '../../Assets/images/lunch.png';
import Snacks from '../../Assets/images/snacks.png';

const MealsToSelect = ({SelectedClassId, selectedMeal, onSelectMeal }) => {
    useEffect(()=>{
        console.log("SelectedClassId" , SelectedClassId);
    },[]);
    return (
        <section className="SecondSliderSection ManageClassesCompnent">
            <div className="Container HeadContainer MealsContainer">
                <div className="row">
                    <div 
                        className={`col-lg-4 col-md-4 col-sm-4 col-4 MealItem ${selectedMeal === 1 ? "ActiveMeal" : ""}`} 
                        onClick={() => onSelectMeal(1)}>
                        <img src={Breakfast} alt="Breakfast" />
                        <h5>Breakfast</h5>
                    </div>
                    <div 
                        className={`col-lg-4 col-md-4 col-sm-4 col-4 MealItem ${selectedMeal === 2 ? "ActiveMeal" : ""}`} 
                        onClick={() => onSelectMeal(2)}>
                        <img src={Lunch} alt="Lunch" />
                        <h5>Lunch</h5>
                    </div>
                    <div 
                        className={`col-lg-4 col-md-4 col-sm-4 col-4 MealItem ${selectedMeal === 3 ? "ActiveMeal" : ""}`} 
                        onClick={() => onSelectMeal(3)}>
                        <img src={Snacks} alt="Snacks" />
                        <h5>Snacks</h5>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MealsToSelect;
