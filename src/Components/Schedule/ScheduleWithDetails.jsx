import React, { useState } from 'react';
import './ScheduleItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faCaretRight, faCaretDown, faTrashAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteSubjectModal from '../ManageClasses/DeleteSubjectModal';

const ScheduleWithDetails = ({id,SubjectName , Content , OnConfirmDeleteContent}) => {
    const [isDetailsVisible, setDetailsVisible] = useState(false);
    
    const toggleDetails = () => {
        setDetailsVisible(!isDetailsVisible);
    };
    const handleDeleteContent = (id) => {
        setContentToDelete(id);
        setIsDeleteOverlayOpen(true);
    }    
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const [ContentToDelete, setContentToDelete] = useState(null);

    return (
        <div className="col-lg-12 ScheduleItemContainer">
            <DeleteSubjectModal
                id={Content}
                isOpen={isDeleteOverlayOpen}
                onClose={() => setIsDeleteOverlayOpen(false)}
                onDelete={()=>OnConfirmDeleteContent(id)}
            />
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
                        <span className='m-2'>
                            <FontAwesomeIcon icon={faTrash}
                                onClick={()=>handleDeleteContent(id)}
                            />
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScheduleWithDetails;
