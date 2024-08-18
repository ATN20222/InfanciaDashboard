import React, { useState } from 'react';
import './ScheduleItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons';

const ScheduleWithDetails = ({SubjectName , Content}) => {
    const [isDetailsVisible, setDetailsVisible] = useState(false);

    const toggleDetails = () => {
        setDetailsVisible(!isDetailsVisible);
    };

    return (
        <div className="col-lg-12 ScheduleItemContainer">
            <div className="ScheduleItem">
                <div className="LeftSidePartSched">
                    <h5>{SubjectName}</h5>
                </div>
                <div className="RightPartSched" onClick={toggleDetails}>
                    <FontAwesomeIcon icon={isDetailsVisible ? faCaretDown : faCaretRight} />
                </div>
            </div>

            {isDetailsVisible && (
                <div className="ScheduleItemDetails SchedItemDetailsContainer">
                    <div className="LeftSideDetailsSchedule col-lg-2">
                        {SubjectName}
                    </div>
                    <div className="col-lg-8 ScheuleItemDescription">
                        <span>{Content}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScheduleWithDetails;
