import React from 'react';
import './AddClassModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CustomDropdown from '../DrobDown/CustomDropdown';
import CustomDropdown2 from '../DrobDown/CustomDropdown2';

const SelectSubjectModal = ({ isOpen, onClose, subjects, onAddNewSubject}) => {
  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="mymodal">
        <div className="modal-content">
          <h2>Select Subject</h2>
          <div className="FormHr"></div>
          <form className="add-class-form addSubjectForm">



            <div className="existing-subjects mb-4">
                <CustomDropdown2 Options={subjects} DefaultValue={"Subjects: "} />
                <div className="AddNew" >
                <div className="CirclePlus "onClick={onAddNewSubject}>
                    <FontAwesomeIcon icon={faPlus} />
                    </div>
                </div>
            </div>

          
          
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

export default SelectSubjectModal;
