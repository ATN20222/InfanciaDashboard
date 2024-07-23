import React, { useState } from 'react';
import './FAQItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteSubjectModal from '../ManageClasses/DeleteSubjectModal';

const FAQItem = ({Question , Answer}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);

    const toggleAnswer = () => {
        setIsOpen(!isOpen);
    };
    const handleDeleteSubject = (Subject) => {
        
    };
    return (
        <div className="col-lg-12 FAQItemCol">
            <DeleteSubjectModal
                isOpen={isDeleteOverlayOpen}
                onClose={() => setIsDeleteOverlayOpen(false)}
                onDelete={handleDeleteSubject}
            />
            <div className="row">
                <div className="col-lg-12 FAQItem">
                    <div className="FAQItemInnerContainer">
                        <div className="row">
                            <div className="col-lg-10 FAQQuestCol">
                                <span className='Quest'>{Question}</span>
                                <div className="DeleteFAQ" onClick={()=>setIsDeleteOverlayOpen(true)}>
                                    <span>

                                        <FontAwesomeIcon icon={faTrash}/>
                                    </span>
                                </div>
                            </div>
                            <div className="col-lg-2 FAQDrobCol" onClick={toggleAnswer}>
                                <FontAwesomeIcon icon={isOpen?faCaretDown:faCaretRight} />
                            </div>
                        </div>
                    </div>
                </div>
                {isOpen && (
                    <div className="col-lg-12 FAQAnswerItem">
                        <p>{Answer}</p>
                    </div>
                )}
            </div>
           
        </div>
    );
};

export default FAQItem;
