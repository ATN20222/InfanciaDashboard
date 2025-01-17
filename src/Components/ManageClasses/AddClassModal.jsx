import React, { useState } from 'react';
import './AddClassModal.css';

const AddClassModal = ({ isOpen, onClose, onAddClass }) => {
    const [className, setClassName] = useState('');
    const [classNameError, setClassNameError] = useState('');
    const [classAgeFromToError, setClassAgeFromToError] = useState('');
    const [classAgeFrom, setClassAgeFrom] = useState('');
    const [classAgeTo, setClassAgeTo] = useState('');
    const [hasMeal, setHasMeal] = useState(false);
    const [hasNap, setHasNap] = useState(false);
    const [hasToilet, setHasToilet] = useState(false);
    const [checkboxError, setCheckboxError] = useState('');
    const [hasSubject, setHasSubject] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setClassNameError("");
        setClassAgeFromToError("");
        setCheckboxError('');

        if (className === '') {
            setClassNameError("Class name is required");
            return;
        }
        const ageFromNum = parseInt(classAgeFrom, 10);
        const ageToNum = parseInt(classAgeTo, 10);
        if (classAgeFrom === '' || classAgeTo === '') {
            setClassAgeFromToError("Age from-to is required");
            return;
        } else if (ageFromNum >= ageToNum) {
            setClassAgeFromToError("Age-to must be greater than age-from");
            return;
        }

        if (!(hasMeal || hasNap || hasToilet || hasSubject)) {
            setCheckboxError('You must choose one at least');
            return;
        }

        onAddClass(className, classAgeFrom, classAgeTo, hasMeal, hasSubject, hasNap, hasToilet);
        setClassName('');
        setClassAgeFrom('');
        setClassAgeTo('');
        setHasNap(false);
        setHasToilet(false);
        setHasMeal(false);
        setHasSubject(false);
        onClose();
    };

    if (!isOpen) return null;

    const ClearData = () => {
        setClassName('');
        setClassAgeFrom('');
        setClassAgeTo('');
        setCheckboxError('')
        setClassNameError('');
        setClassAgeFromToError('');
        setHasMeal(false);
        setHasSubject(false);
        setHasMeal(false);
        setHasNap(false);
    };

    return (
        <div className="overlay">
            <div className="mymodal">
                <div className="modal-content">
                    <h2>Add Class</h2>
                    <div className="FormHr"></div>
                    <form className="add-class-form" onSubmit={handleSubmit}>
                        <label>
                            <input
                                type="text"
                                name="className"
                                className='ClassNameInput'
                                placeholder='Class Name'
                                value={className}
                                onChange={(e) => setClassName(e.target.value)}
                            />
                            {classNameError && (
                                <span className='text-danger PopUpValidation'>{classNameError}</span>
                            )}
                        </label>

                        <div className="Age">
                            <label htmlFor="">Age</label>
                            <input
                                type="number"
                                name="ageFrom"
                                placeholder="From"
                                value={classAgeFrom}
                                onChange={(e) => setClassAgeFrom(e.target.value)}
                            />
                            <input
                                type="number"
                                name="ageTo"
                                placeholder="To"
                                value={classAgeTo}
                                onChange={(e) => setClassAgeTo(e.target.value)}
                            />
                        </div>
                        {classAgeFromToError && (
                            <span className='text-danger PopUpValidation mb-3'>{classAgeFromToError}</span>
                        )}

                        <div className="HasContainer">

                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={hasMeal}
                                    onChange={(e) => setHasMeal(e.target.checked)}
                                />
                                Has Meals
                            </label>

                        </div>
                        


                        <div className="HasContainer">

                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={hasSubject}
                                    onChange={(e) => setHasSubject(e.target.checked)}
                                />
                                Has Subjects
                            </label>
                        </div>

                        <div className="HasContainer">

                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={hasNap}
                                    onChange={(e) => setHasNap(e.target.checked)}
                                />
                                Has Nap
                            </label>

                        </div>
                        <div className="HasContainer">

                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={hasToilet}
                                    onChange={(e) => setHasToilet(e.target.checked)}
                                />
                                Has Toilet
                            </label>

                        </div>
                        {checkboxError && (
                            <span className='text-danger PopUpValidation mb-3'>{checkboxError}</span>
                        )}


                        <div className="form-buttons mt-3">
                            <button className="RegisterBtn">Save</button>
                            <button
                                className="CancelBtn"
                                onClick={() => {
                                    onClose();
                                    ClearData();
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddClassModal;
