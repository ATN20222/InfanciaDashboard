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
};

const Schedule = ({ SelectedClassId }) => {
    const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
    const [scheduleData, setScheduleData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        handleDateChange(new Date()); 
    }, []);

    const handleDateChange = async (date) => {
        const formattedDate = formatDate(date);
        setSelectedDate(formattedDate);
        setLoading(true);
        try {
            const response = await ScheduleServices.getClassSchedule(
                SelectedClassId,
                formattedDate
            );
            console.log(response );
            setScheduleData(response.content);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddScheduleContent = async (id, content) => {
        setLoading(true);
        try {
            const response = await ScheduleServices.AddScheduleContent(
                SelectedClassId,
                id,
                content,
                selectedDate
            );
            toast.success("Content added successfully");
            handleDateChange(selectedDate);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const handleDeleteContent  = async (id)=>{
        setLoading(true);
        try {
            console.log("Delete");
            console.log(id);
            const response = await ScheduleServices.DeleteContent(id);
            toast.success("Content deleted successfully");
            handleDateChange(selectedDate);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="SecondSliderSection ManageClassesComponent">
            <div className="Toaster">
                <Toaster position="top-right" reverseOrder={false} />
            </div>
            <div className="Container HeadContainer">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="HeadLeftItem">Schedule</div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6 HeadRightCol">
                        {/* <div className="HeadRightItem"> */}
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => handleDateChange(new Date(e.target.value))}
                                className="form-control ScheduleDate"
                            />
                        {/* </div> */}
                    </div>
                </div>
            </div>
            <div className="SubjectsContainer ScheduleContainer">
                <div className="row">
                    {loading ? (
                        <div className="loading-indicator">Loading...</div>
                    ) : scheduleData.length > 0 ? (
                        scheduleData.map((item) => (
                            item.schedules.length === 0 ? (
                                <ScheduleItem
                                    id={item?.id}
                                    OnConfirmAddContent={handleAddScheduleContent}
                                    SubjectName={item?.title}
                                    key={item.id}
                                />
                            ) : (
                                <ScheduleWithDetails
                                    id = {item.schedules[0]?.id}
                                    SubjectName={item.title}
                                    Content={item.schedules[0]?.content}
                                    key={item.schedules[0]?.id}
                                    OnConfirmDeleteContent={handleDeleteContent}
                                />
                                // <></>
                            )
                        ))
                    ) : (
                        <span>No subjects assigned yet</span>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Schedule;
