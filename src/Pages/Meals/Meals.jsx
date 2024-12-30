import React, { useEffect, useState } from "react";
import ManageClassesCompnent from "../../Components/ManageClasses/ManageClassesCompnent";
import MealsToSelect from "../../Components/Meals/MealsToSelect";
import MealsSchedule from "../../Components/Meals/MealsSchedule";
import { ClassService, MealsServices } from "../../Service/Api";
import AddMealSchedule from "../../Components/Meals/AddMealSchedule";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";
import DeleteSubjectModal from "../../Components/ManageClasses/DeleteSubjectModal";
import './Meals.css'
import EditMealModal from "../../Components/Meals/EditMealModal";
const Meals = () => {
    const [meals, setMeals] = useState([]);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const [mealToDelete, setMealToDelete] = useState(null);
    const [mealToEdit,setMealToEdit] = useState({});
    const [isEditOverlayOpen,setIsEditOverlayOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        GetData();
    }, []);
    async function GetData() {
        try {
            const response = await MealsServices.List();
            setMeals(response.content);
        } catch (error) {
            console.log(error)
        }
    }

    const handleAddMeal = async (meal , type) => {
        try {
            
            const response = await MealsServices.Add(meal , type);
            console.log(response);
            toast.success('meal added successfully');
            GetData();
            
        } catch (error) {
            toast.error('Failed to add meal');
        }
    }

    const handleDeleteMeal = (id) => {
        setMealToDelete(id);
        setIsDeleteOverlayOpen(true);
    }
    const handleConfirmDelete = async () => {
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
    const handleEditMeal = async (id , meal , type)=>{
        try {
            console.log(id,meal , type);
            // return;
            const response = await MealsServices.Edit(id,meal , type);
            console.log(response);
            toast.success('meal edited successfully');
            GetData();
            
        } catch (error) {
            toast.error('Failed to edit meal');
        }
    }


    return (
        <div className="LoginMain">
            <AddMealSchedule
                isOpen={isOverlayOpen}
                onAddMeal={handleAddMeal}
                onClose={() => setIsOverlayOpen(false)}
            />
            {isEditOverlayOpen&&
            
                <EditMealModal
                    isOpen={isEditOverlayOpen}
                    id={mealToEdit?.id}
                    meal={mealToEdit?.meal}
                    type={mealToEdit?.type}
                    onEditMeal={handleEditMeal}
                    onClose={() => setIsEditOverlayOpen(false)}
                />
            }

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
            <section className="SecondSliderSection ManageClassesCompnent">
                <div className="Container HeadContainer">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                            <div className="HeadLeftItem">
                                Meals
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6 HeadRightCol">
                            <div className="HeadRightItem">
                                <div className="CirclePlus" onClick={() => setIsOverlayOpen(true)}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="SubjectsContainer MealsTableContainer">
                    <div className="table-responsive ">
                        <table className="table table table-bordered table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Meal</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Edit</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {meals?.length > 0 ? meals.map((meal) => (
                                    <tr key={meal.id}>
                                        <td>{meal.id}</td>
                                        <td className="text-center">
                                            {meal.meal}
                                        </td>
                                        <td>
                                            {meal.type}
                                        </td>
                                        <td>
                                            <span className="nav-link">
                                                <FontAwesomeIcon icon={faPen} className="Pointer" onClick={()=>{
                                                    setIsEditOverlayOpen(true);
                                                    setMealToEdit(meal);
                                                }} />
                                            </span>
                                        </td>
                                        <td>
                                            <span className="nav-link" >
                                                <FontAwesomeIcon icon={faTrash} className="Pointer" onClick={()=>handleDeleteMeal(meal.id)}/>
                                            </span>
                                        </td>

                                    </tr>
                                )) :
                                    <tr>
                                        <td colSpan="5">
                                            No Data
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

        </div>
    )
}
export default Meals;