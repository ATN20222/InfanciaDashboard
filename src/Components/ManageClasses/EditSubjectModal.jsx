import React, { useEffect, useState } from 'react';
import './AddClassModal.css';

const EditSubjectModal = ({ isOpen, subject, onClose, onEditSubject }) => {
    const [Subject, setSubject] = useState('');
    const [error, setError] = useState('');
    useEffect(()=>{
        setSubject(subject?.title)
    },[subject]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Subject.trim() === '') {
            setError('Subject is required');
            return;
        }
        onEditSubject(subject?.id , Subject);
        setSubject('');
        setError('');
        onClose();
    };

    const handleInputChange = (e) => {
        setSubject(e.target.value);
        if (e.target.value.trim() !== '') {
            setError('');
        }
    };

    if (!isOpen) return null;

    const ClearData = () => {
        setSubject('');
        setError('');

    }
    return (
        <div className="overlay">
            <div className="mymodal">
                <div className="modal-content">
                    <h2>Add Subject</h2>
                    <div className="FormHr"></div>
                    <form className="add-class-form addSubjectForm" onSubmit={handleSubmit}>
                        <label>
                            <input
                                type="text"
                                name="Subject"
                                className='ClassNameInput'
                                placeholder='Subject '
                                value={Subject}
                                onChange={handleInputChange}
                            />
                            {error && <div className="text-danger PopUpError mt-0">{error}</div>}
                        </label>
                        <div className="form-buttons">
                            <button className="RegisterBtn">
                                Save
                            </button>
                            <button className="CancelBtn" onClick={() => { onClose(); ClearData(); }}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditSubjectModal;
