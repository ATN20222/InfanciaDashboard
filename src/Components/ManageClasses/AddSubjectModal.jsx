import React, { useState } from 'react';
import './AddClassModal.css';

const AddSubjectModal = ({ isOpen, onClose, onAddSubject }) => {
  const [Subject, setSubject] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddSubject(Subject);
    setSubject('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="mymodal">
        <div className="modal-content">
          <h2>Add Subject</h2>
          <div className="FormHr"></div>
          <form className="add-class-form addSubjectForm" onSubmit={handleSubmit}>
            <label>
              <input type="text" name="Subject" className='ClassNameInput' placeholder='Subject : '
                value={Subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </label>
            <div className="form-buttons">
              <button className="RegisterBtn">
                Save
              </button>
              <button className="CancelBtn" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSubjectModal;
