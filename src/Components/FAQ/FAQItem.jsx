import React, { useState } from 'react';
import './FAQItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteSubjectModal from '../ManageClasses/DeleteSubjectModal';
import { FAQServices } from '../../Service/Api';
import toast from 'react-hot-toast';

const FAQItem = ({id ,Question , Answer , handleDalete}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const toggleAnswer =  () => {
        setIsOpen(!isOpen);
    };
    const HandleDelete = (id)=>{
        handleDalete(id)
    }
    
    return (
        <div className="col-lg-12 FAQItemCol">
            <DeleteSubjectModal
                id={id}
                isOpen={isDeleteOverlayOpen}
                onClose={() => setIsDeleteOverlayOpen(false)}
                onDelete={HandleDelete}
            />
            <div className="row">
                <div className="col-lg-12 FAQItem">
                    <div className="FAQItemInnerContainer">
                        <div className="row">
                            <div className="col-lg-11 col-md-11 col-sm-10 col-10 FAQQuestCol">
                                <span className='Quest'>{Question}</span>
                                <div className="DeleteFAQ" onClick={()=>setIsDeleteOverlayOpen(true)}>
                                    <span>

                                        <FontAwesomeIcon icon={faTrash}/>
                                    </span>
                                </div>
                            </div>
                            <div className="col-lg-1 col-md-1 col-sm-1 col-1 FAQDrobCol" >
                                <div className="DropCol" onClick={toggleAnswer}>
                                    <FontAwesomeIcon icon={isOpen?faCaretDown:faCaretRight} />
                                </div>
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
