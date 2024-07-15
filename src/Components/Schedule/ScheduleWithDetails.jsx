import React, { useState } from 'react';
import './ScheduleItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons';

const ScheduleWithDetails = () => {
    const [isDetailsVisible, setDetailsVisible] = useState(false);

    const toggleDetails = () => {
        setDetailsVisible(!isDetailsVisible);
    };

    return (
        <div className="col-lg-12 ScheduleItemContainer">
            <div className="ScheduleItem">
                <div className="LeftSidePartSched">
                    <h5>Art</h5>
                </div>
                <div className="RightPartSched" onClick={toggleDetails}>
                    <FontAwesomeIcon icon={isDetailsVisible ? faCaretDown : faCaretRight} />
                </div>
            </div>

            {isDetailsVisible && (
                <div className="ScheduleItemDetails SchedItemDetailsContainer">
                    <div className="LeftSideDetailsSchedule col-lg-2">
                        Arabic
                    </div>
                    <div className="col-lg-8 ScheuleItemDescription">
                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae commodi dolore aliquam cumque illo eveniet autem natus in beatae iure maxime libero, excepturi error quam, doloremque amet architecto cum tempora!</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScheduleWithDetails;
