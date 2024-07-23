import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteSubjectModal from '../ManageClasses/DeleteSubjectModal';
import './NurseryPolicyItem.css'
const NurseryPolicyItem = ({Title , Description}) => {
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
                           <div className="col-lg-12 PolicyHeader">
                                <span>
                                    {Title}
                                </span>
                           </div>
                           <div className="col-lg-12 PolicyDescription">
                                <span>{Description}</span>
                           </div>
                        </div>
                    </div>
                </div>
               
            </div>
           
        </div>
    );
};

export default NurseryPolicyItem;
