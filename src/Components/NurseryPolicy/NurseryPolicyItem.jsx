import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteSubjectModal from '../ManageClasses/DeleteSubjectModal';
import './NurseryPolicyItem.css'
import { PolicyServices } from '../../Service/Api';
import toast, { Toaster } from 'react-hot-toast';
const NurseryPolicyItem = ({ id, Title, Description, DeletePolicy }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);

    const toggleAnswer = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="col-lg-12 FAQItemCol">
            <DeleteSubjectModal
                id={id}
                isOpen={isDeleteOverlayOpen}
                onClose={() => setIsDeleteOverlayOpen(false)}
                onDelete={DeletePolicy}
            />
            <div className="Toaster">
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
            <div className="row">
                <div className="col-lg-12 FAQItem">
                    <div className="FAQItemInnerContainer">
                        <div className="row">
                            <div className="col-lg-12 PolicyHeader">
                                <div>
                                    <span>
                                        {Title}
                                    </span>
                                </div>
                                <div className='DeletePolicy Center' onClick={() => setIsDeleteOverlayOpen(true)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </div>

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
