import React, { useEffect, useState } from 'react';
import { ClassService } from '../../Service/Api';

const EditClassModal = ({ isOpen, onClose, onEditClass, Data }) => {
  const [className, setClassName] = useState('');
  const [classNameError, setClassNameError] = useState('');
  const [classAgeFromToError, setClassAgeFromToError] = useState('');
  const [classAgeFrom, setClassAgeFrom] = useState('');
  const [classAgeTo, setClassAgeTo] = useState('');

  useEffect(() => {
    if (isOpen && Data?.id) {
      GetData();
    }
  }, [isOpen, Data?.id]);

  async function GetData() {
    try {
      const response = await ClassService.Get(Data?.id);
      setClassName(response.content.name);
      setClassAgeTo(response.content.age_to);
      setClassAgeFrom(response.content.age_from);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setClassNameError('');
    setClassAgeFromToError('');

    if (className === '') {
      setClassNameError('Class name is required');
      return;
    }
    if (classAgeFrom === '' || classAgeTo === '') {
      setClassAgeFromToError('Age from-to is required');
      return;
    }
    onEditClass(Data.id, className, classAgeFrom, classAgeTo);
    onClose();
  };

  if (!isOpen) return null;

  const ClearData = ()=>{
    setClassName('');
    setClassAgeFrom('');
    setClassAgeTo('');
    setClassNameError('');
    setClassAgeFromToError('');
  }
  return (
    <div className="overlay">
      <div className="mymodal">
        <div className="modal-content">
          <h2>Edit Class</h2>
          <div className="FormHr"></div>
          <form className="add-class-form" onSubmit={handleSubmit}>
            <label>
              <input
                type="text"
                name="className"
                className="ClassNameInput"
                placeholder="Class Name"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              />
              {classNameError && (
                <span className="text-danger PopUpValidation">{classNameError}</span>
              )}
            </label>

            <div className="Age">
              <label htmlFor="">Age</label>
              <input
                type="number"
                name="ageFrom"
                placeholder="From  "
                value={classAgeFrom}
                onChange={(e) => setClassAgeFrom(e.target.value)}
              />
              <input
                type="number"
                name="ageTo"
                placeholder="To  "
                value={classAgeTo}
                onChange={(e) => setClassAgeTo(e.target.value)}
              />
            </div>
            {classAgeFromToError && (
              <span className="text-danger PopUpValidation mb-3">
                {classAgeFromToError}
              </span>
            )}

            <div className="form-buttons">
              <button className="RegisterBtn">Save</button>
              <button className="CancelBtn" onClick={()=>{onClose(); ClearData();}}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditClassModal;
