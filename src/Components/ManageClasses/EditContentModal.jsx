import React, { useEffect, useState } from 'react';
import './AddClassModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';

const EditContentModal = ({ isOpen, onClose, onEditContent , data }) => {
    const [content, setContent] = useState(data.Content);
    const [contentError, setContentError] = useState('');

    const validateForm = () => {
        let isValid = true;
        if (!content.trim()) {
            setContentError('Subject content is required.');
            isValid = false;
        }
        else {
            setContentError('');
        }
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onEditContent(data.id , content);
            setContent('');
            onClose();
            ClearData();
        }
    };



    if (!isOpen) return null;

    const ClearData = () => {
        setContent('');
        setContentError('');
    }

    return (
        <div className="overlay">
            <div className="mymodal">
                <div className="modal-content">
                    <h2>Edit Content</h2>
                    <div className="FormHr"></div>
                    <form className="add-class-form" onSubmit={handleSubmit}>
                        <label>
                            <textarea
                                type="text"
                                name="Newsletter"
                                className={`ClassNameInput NewsletterDescription ${contentError ? '' : 'mb-3'}`}
                                placeholder='Subject content...'
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            {contentError && (
                                <span className='text-danger PopUpValidation mb-3'>{contentError}</span>
                            )}
                        </label>



                        <div className="form-buttons">
                            <button type="submit" className="RegisterBtn">
                                Save
                            </button>
                            <button type="button" className="CancelBtn" onClick={() => { onClose(); ClearData(); }}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditContentModal;
