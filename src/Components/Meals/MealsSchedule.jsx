import React, { useEffect, useState } from "react";
import './MealsToSelect.css';
import { MealsServices } from "../../Service/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddMealSchedule from "./AddMealSchedule";
import toast, { Toaster } from "react-hot-toast";
import DeleteSubjectModal from "../ManageClasses/DeleteSubjectModal";

const MealsSchedule = ({ SelectedClassId, selectedMeal, updateKey }) => {
    const [MealsInput, setMealsInputs] = useState([]);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const [mealToDelete, setMealToDelete] = useState(null);
    const [loading , setLoading] = useState(false);

    useEffect(() => {
        console.log("Meal updated to:", selectedMeal);
        GetData();
    }, [SelectedClassId, selectedMeal, updateKey]);
    const mealTypes = {
        1: 'Breakfast',
        2: 'Lunch',
        3: 'Snakcs',
    };
    async function GetData() {
        try {
            
            const selectedMealType = mealTypes[selectedMeal];

            const response = await MealsServices.List(SelectedClassId);
            console.log(response);
            const m = response.content.meals.filter(m => m.type === selectedMealType);
            const daysOrder = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

            m.sort((a, b) => daysOrder.indexOf(a.days) - daysOrder.indexOf(b.days));

            console.log(m)
            setMealsInputs(m);
        } catch (error) {
            console.error("Error fetching meals:", error);
        }
    }

    const handleInputChange = (id, value) => {
        setMealsInputs(prevState => 
            prevState.map(meal => 
                meal.id === id ? { ...meal, description: value } : meal
            )
        );
    };

    const handleSave = async() => {
        setLoading(true);
        try {
            for (const meal of MealsInput) {
                const response = await MealsServices.Edit(meal.id,SelectedClassId , meal.type ,meal.days , meal.description);
            }
            toast.success('Meals saved successfully');
            GetData();
        } catch (error) {
            toast.error('Failed to save meals');
        }finally{
            setLoading(false);
        }
    };
    const handleAddMeal = async (meal , day)=>{
        // console.log(meal, day , mealTypes[selectedMeal] , SelectedClassId);
        try {
            
            const response = await MealsServices.Add(meal , day , mealTypes[selectedMeal] , SelectedClassId);
            console.log(response);
            toast.success('meal added successfully');
            GetData();
            
        } catch (error) {
            toast.error('Failed to add meal');

        }
    }
    const handleDeleteMeal = (id)=>{
        setMealToDelete(id);
        setIsDeleteOverlayOpen(true);
    }

    const handleConfirmDelete = async()=>{
        // console.log("del")
        try {
            
            const response = await MealsServices.Delete(mealToDelete);
            toast.success('meal deleted successfully');
            GetData();
            
        } catch (error) {
            toast.error('Failed to delete meal');

        }
        setMealToDelete(false);
    }
    return (
        <section className="SecondSliderSection ManageClassesCompnent">

            <AddMealSchedule
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                
                onAddMeal={handleAddMeal}
            />
            <div className="Toaster">
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
            <DeleteSubjectModal
                id={mealToDelete}
                isOpen={isDeleteOverlayOpen}
                onClose={() => setIsDeleteOverlayOpen(false)}
                onDelete={handleConfirmDelete}
            />


            <div className={`Container HeadContainer`}>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                            <div className="HeadLeftItem MealTypeHeader">
                                {mealTypes[selectedMeal]} Schedule
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
            <div className="Container HeadContainer MealsContainer">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="row">
                            {MealsInput.map(meal => (
                                <div className="col-lg-12 MealCol" key={meal.id}>
                                    <div className=" MealInputMainCol">
                                        <input
                                            type="text"
                                            name="className"
                                            className='ClassNameInput MealInput mb-2'
                                            placeholder={`Click here to add: ${meal.days}`}
                                            value={meal.description}
                                            onChange={(e) => handleInputChange(meal.id, e.target.value)}
                                        />
                                        <label>{meal.days}</label>
                                    </div>
                                    <div className="DeleteMeal" onClick={()=>handleDeleteMeal(meal.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </div>
                                </div>
                            ))}
                            {!loading?
                            <div className="col-lg-12 MealInputMainCol SaveMealCol">
                                <button className="RegisterBtn" onClick={handleSave}>
                                    Save
                                </button>
                            </div>:

                            <div className="col-lg-12 FormInputCol Center LoginBtnContainer"><div class="loader"></div></div>

                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MealsSchedule;
