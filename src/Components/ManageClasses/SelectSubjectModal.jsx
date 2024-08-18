import React, { useState } from 'react';
import './AddClassModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import SelectSubjectDropDown from '../DrobDown/SelectSubjectDropDown';

const SelectSubjectModal = ({ isOpen, onClose, subjects, onAddNewSubject, onAssignSubject }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [error , setError] = useState('');
  const handleSave = async () => {
    if (selectedSubject) {
      try {
        await onAssignSubject(selectedSubject);

        onClose();
      } catch (error) {
        console.error('Failed to assign subject to class:', error);
      }
    } else {
      setError('please select subject');
    }
  };

  if (!isOpen) return null;

  const ClearData =()=>{
    setSelectedSubject(null);
    setError('');
  }
  return (
    <div className="overlay">
      <div className="mymodal">
        <div className="modal-content">
          <h2>Select Subject</h2>
          <div className="FormHr"></div>
          <form className="add-class-form addSubjectForm" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <div className={`existing-subjects ${!error?"mb-4":''}`}>
              <SelectSubjectDropDown 
                Options={subjects} 
                DefaultValue={"Subjects "} 
                IsAddTeacher={false} 
                onChange={(subject) => setSelectedSubject(subject)} 
              />
              <div className="AddNew">
                <div className="CirclePlus" onClick={onAddNewSubject}>
                  <FontAwesomeIcon icon={faPlus} />
                </div>
              </div>
            </div>
            { error && <div className="text-danger PopUpError mb-3">{error}</div>}


            <div className="form-buttons">
              <button type="submit" className="RegisterBtn">
                Save
              </button>
              <button type="button" className="CancelBtn" onClick={
                ()=>{
                  onClose();
                  ClearData();
                }
                
                }>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SelectSubjectModal;
