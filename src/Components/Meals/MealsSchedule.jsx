import React, { useState } from "react";
import './MealsToSelect.css'
const MealsSchedule = ()=>{
    return(
        <section className="SecondSliderSection ManageClassesCompnent">
            <div className="Container HeadContainer MealsContainer">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-lg-12 MealInputMainCol">
                                    
                                    <input type="text" name="className" className='ClassNameInput MealInput mb-2' placeholder='Click here to add : ' />
                                    <label>
                                        SUN
                                    </label>
                                </div>
                                <div className="col-lg-12 MealInputMainCol">
                                    
                                    <input type="text" name="className" className='ClassNameInput MealInput mb-2' placeholder='Click here to add : ' />
                                    <label>
                                        MON
                                    </label>
                                </div>
                                <div className="col-lg-12 MealInputMainCol">
                                    
                                    <input type="text" name="className" className='ClassNameInput MealInput mb-2' placeholder='Click here to add : ' />
                                    <label>
                                        TUS
                                    </label>
                                </div>
                                <div className="col-lg-12 MealInputMainCol">
                                    
                                    <input type="text" name="className" className='ClassNameInput MealInput mb-2' placeholder='Click here to add : ' />
                                    <label>
                                        WED
                                    </label>
                                </div>
                                <div className="col-lg-12 MealInputMainCol">
                                    
                                    <input type="text" name="className" className='ClassNameInput MealInput mb-2' placeholder='Click here to add : ' />
                                    <label>
                                        THU
                                    </label>
                                </div>
                                <div className="col-lg-12 MealInputMainCol">
                                    
                                    <input type="text" name="className" className='ClassNameInput MealInput mb-2' placeholder='Click here to add : ' />
                                    <label>
                                        FRI
                                    </label>
                                </div>
                                <div className="col-lg-12 MealInputMainCol">
                                    
                                    <input type="text" name="className" className='ClassNameInput MealInput mb-2' placeholder='Click here to add : ' />
                                    <label>
                                        SAT
                                    </label>
                                </div>

                                <div className="col-lg-12 MealInputMainCol SaveMealCol">
                                        <button className="RegisterBtn">
                                            Save
                                        </button>
                                </div>
                                    
                            </div>
                            
                        </div>
                    </div>
                </div>
                
        </section>
    );
}
export default MealsSchedule;