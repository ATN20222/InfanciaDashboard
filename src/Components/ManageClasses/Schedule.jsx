import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import ScheduleItem from "../Schedule/ScheduleItem";
import ScheduleWithDetails from "../Schedule/ScheduleWithDetails";
import { ScheduleServices } from "../../Service/Api";
import toast, { Toaster } from "react-hot-toast";

const formatDate = (date) => {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
}

const getDayOfWeek = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
};

const Schedule = ({ SelectedClassId }) => {
    const [selectedDay, setSelectedDay] = useState('');
    const [daysIsOpen, setDaysIsOpen] = useState(false);
    const [scheduleData, setScheduleData] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const today = getDayOfWeek(new Date());
        setSelectedDay(today);
        handleDayChange(today);
    }, []);

    const handleDayChange = async (day) => {
        setSelectedDay(day);
        setLoading(true); 
        try {
            const response = await ScheduleServices.getClassSchedule(SelectedClassId, day);
            setScheduleData(response.content);
            setDaysIsOpen(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); 
        }
    }
    const handleAddScheduleContent = async (id , content)=>{
        console.log("handleAddScheduleContent",id , content , selectedDay);
        setLoading(true); 
        try {
            const response = await ScheduleServices.AddScheduleContent(SelectedClassId , id , content, selectedDay);
            
            toast.success('content added successfully');
            handleDayChange(selectedDay);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); 
        }
    }
    return (
        <section className="SecondSliderSection ManageClassesCompnent">
            <div className="Toaster">
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
            <div className="Container HeadContainer">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="HeadLeftItem">
                            Schedule
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6 HeadRightCol CalenderCol">
                        <div className={`Days ${daysIsOpen ? 'ActiveDays' : ''}`}>
                            <div className="">
                                <div className="DayItem">
                                    <div className={`DayInnerItem ${selectedDay === 'Sat' ? 'SelectedDateItem' : ''}`}
                                        onClick={() => handleDayChange('Sat')}
                                    >
                                        SAT
                                    </div>
                                    <div className={`DayInnerItem ${selectedDay === 'Sun' ? 'SelectedDateItem' : ''}`}
                                        onClick={() => handleDayChange('Sun')}
                                    >
                                        SUN
                                    </div>
                                    <div className={`DayInnerItem ${selectedDay === 'Mon' ? 'SelectedDateItem' : ''}`}
                                        onClick={() => handleDayChange('Mon')}>
                                        MON
                                    </div>
                                </div>
                                <div className="DayItem">
                                    <div className={`DayInnerItem ${selectedDay === 'Tue' ? 'SelectedDateItem' : ''}`}
                                        onClick={() => handleDayChange('Tue')}>
                                        TUE
                                    </div>
                                    <div className={`DayInnerItem ${selectedDay === 'Wed' ? 'SelectedDateItem' : ''}`}
                                        onClick={() => handleDayChange('Wed')}>
                                        WED
                                    </div>
                                    <div className={`DayInnerItem ${selectedDay === 'Thu' ? 'SelectedDateItem' : ''}`}
                                        onClick={() => handleDayChange('Thu')}>
                                        THU
                                    </div>
                                </div>
                                <div className="DayItem">
                                    <div className={`DayInnerItem ${selectedDay === 'Fri' ? 'SelectedDateItem' : ''}`}
                                        onClick={() => handleDayChange('Fri')}>
                                        FRI
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="HeadRightItem">
                            <div className="CirclePlus">
                                <div className="Calender" onClick={() => setDaysIsOpen(!daysIsOpen)}>
                                    <FontAwesomeIcon icon={faCalendar} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="SubjectsContainer">
                <div className="row">
                    {loading ? (
                        <div className="loading-indicator">Loading...</div> 
                    ) : scheduleData.length > 0 ? (
                        scheduleData.map((item) => (
                            !item.subject_content ?
                                <ScheduleItem id={item.subject.id} OnConfirmAddContent={handleAddScheduleContent} SubjectName={item.subject.title} key={item.id} /> :
                                <ScheduleWithDetails SubjectName={item.subject.title} Content={item.subject_content.content} key={item.subject_content.id} />
                        ))
                    ) : (
                        <span>No subjects added yet</span>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Schedule;
