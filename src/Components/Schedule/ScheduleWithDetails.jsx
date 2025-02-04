import React, { useState } from 'react';
import './ScheduleItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faCaretRight, faCaretDown, faTrashAlt, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import DeleteSubjectModal from '../ManageClasses/DeleteSubjectModal';
import EditContentModal from '../ManageClasses/EditContentModal';

const ScheduleWithDetails = ({ id, SubjectName, SubjectId, Content, OnConfirmDeleteContent, OnConfirmEditContent }) => {
    const [isDetailsVisible, setDetailsVisible] = useState(false);
    const [contentToEdit,setContentToEdit] = useState({});
    const toggleDetails = () => {
        setDetailsVisible(!isDetailsVisible);
    };
    const handleDeleteContent = (id) => {
        setContentToDelete(id);
        setIsDeleteOverlayOpen(true);
    }
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const [isEditOverlayOpen, setIsEditOverlayOpen] = useState(false);
    const [ContentToDelete, setContentToDelete] = useState(null);

    return (
        <div className="col-lg-12 ScheduleItemContainer">
            <DeleteSubjectModal
                id={Content}
                isOpen={isDeleteOverlayOpen}
                onClose={() => setIsDeleteOverlayOpen(false)}
                onDelete={() => OnConfirmDeleteContent(id)}
            />
            {isEditOverlayOpen&&
                <EditContentModal
                    data={contentToEdit}
                    isOpen={isEditOverlayOpen}
                    onClose={() => setIsEditOverlayOpen(false)}
                    onEditContent={(id,content)=>OnConfirmEditContent(id,content , SubjectId)}
                />
            }
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
                                onClick={() => handleDeleteContent(id)}
                            />
                        </span>
                        <span className='m-2'>
                            <FontAwesomeIcon icon={faPen}
                                onClick={() => {setContentToEdit({id  , Content }); setIsEditOverlayOpen(true)}}
                            />
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScheduleWithDetails;
