import { faCalendar, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
const Schedule = ()=>{
    return(
        <section className="SecondSliderSection ManageClassesCompnent">
            <div className="Container HeadContainer">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                            <div className="HeadLeftItem">
                            Schedule
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6 HeadRightCol">
                            <div className="HeadRightItem">
                                <div className="CirclePlus">
                                    <FontAwesomeIcon icon={faCalendar}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="SubjectsContainer">
                    <div className="row">
                       
                    </div> 

                </div>
        </section>
    );
}
export default Schedule;