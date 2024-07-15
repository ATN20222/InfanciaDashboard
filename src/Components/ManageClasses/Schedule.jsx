import { faCalendar, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ScheduleItem from "../Schedule/ScheduleItem";
import ScheduleWithDetails from "../Schedule/ScheduleWithDetails";

// Function to format date as YYYY-MM-DD
const formatDate = (date) => {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
}

const Schedule = () => {
    const today = formatDate(new Date());
    const [SelectedDate, setSelectedDate] = useState(today);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    }


    
    return (
        <section className="SecondSliderSection ManageClassesCompnent">
            
            <div className="Container HeadContainer">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="HeadLeftItem">
                            Schedule
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6 HeadRightCol">
                        <input
                            type="text"
                            id=""
                            className="SelectedDate"
                            value={SelectedDate}
                            readOnly

                        />
                        <div className="HeadRightItem">
                            <div className="CirclePlus">
                                <label htmlFor="ScheduleTime">
                                    <input
                                        type="date"
                                        id="ScheduleTime"
                                        value={SelectedDate}
                                        onChange={handleDateChange}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="SubjectsContainer">
                <div className="row">
                    <ScheduleItem />
                    <ScheduleItem />
                    <ScheduleItem />
                    <ScheduleWithDetails />
                </div>
            </div>
        </section>
    );
}

export default Schedule;
