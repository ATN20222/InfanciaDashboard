
import React, { useState } from 'react';
import './AddClassModal.css';

const AddClassModal = ({ isOpen, onClose, onAddClass }) => {
  const [className, setClassName] = useState('');
  const [classNameError, setClassNameError] = useState('');
  const [classAgeFromToError, setClassAgeFromToError] = useState('');
  const [classAgeFrom, setClassAgeFrom] = useState('');
  const [classAgeTo, setClassAgeTo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setClassNameError("")
    setClassAgeFromToError("")

    if(className==''){
        setClassNameError("class name is required")
        return
    }
    const ageFromNum = parseInt(classAgeFrom, 10);
    const ageToNum = parseInt(classAgeTo, 10);
    if(classAgeFrom=='' || classAgeTo==''){
        setClassAgeFromToError("age from-to is required")
        return;

    }else if(ageFromNum>=ageToNum){
        
        setClassAgeFromToError("age-to must be greater than age-from")
        return;
    }
    onAddClass(className , classAgeFrom ,classAgeTo);
    setClassName('');
    setClassAgeFrom('');
    setClassAgeTo('');
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
                    <h2>Add Class</h2>
                    <div className="FormHr"></div>
                    <form className="add-class-form" onSubmit={handleSubmit}>
                        <label>
                           
                            <input type="text" name="className" className='ClassNameInput' placeholder='Class Name' value={className}
                                onChange={(e) => setClassName(e.target.value)}
                            />
                            {classNameError&&
                            
                                <span className='text-danger PopUpValidation'>{classNameError}</span>
                            }
                        </label>
                       

                            
                            <div className="Age">
                                <label htmlFor="">Age</label>
                                <input type="number" name="ageFrom" placeholder="From  "
                                    value={classAgeFrom}
                                    onChange={(e) => setClassAgeFrom(e.target.value)}
                                />
                                <input type="number" name="ageTo" placeholder="To  " value={classAgeTo}
                                    onChange={(e) => setClassAgeTo(e.target.value)}
                                />

                            </div>
                            {classAgeFromToError&&

                                <span className='text-danger PopUpValidation mb-3'>{classAgeFromToError}</span>
                            }
                        
                        <div className="form-buttons">
                                        <button className="RegisterBtn">
                                            Save
                                        </button>
                                
                                        <button className="CancelBtn" onClick={()=>{onClose();ClearData();}}>
                                            Cancel
                                        </button>

                            {/* <button type="button" className="cancel-button" >Cancel</button> */}
                        </div>
                    </form>
                </div>
            </div>
    </div>
  );
};

export default AddClassModal;
