import React, { useEffect, useState } from 'react';
import CustomDropdown2 from '../DrobDown/CustomDropdown2';
import SelectDayDropDown from '../DrobDown/SelectDayDropDown';

const EditMealSchedule = ({ isOpen, onClose, id, meal, type, onEditMeal }) => {
    const [Subject, setSubject] = useState('');
    const [error, setError] = useState('');
    const [dayError, setDayError] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const handleChangeClass = (val) => {
        setSelectedDay(val);
    }
    useEffect(() => {
        setSubject(meal);
        setSelectedDay(type);
        handleChangeClass(type);
    }, [id])

    const handleSubmit = (e) => {
        setError('');
        setDayError('');

        e.preventDefault();
        if (selectedDay.trim() === '') {
            setDayError('Type is required');
            return;
        }
        if (Subject.trim() === '') {
            setError('meal is required');
            return;
        }
        
        onEditMeal(id , Subject, selectedDay);
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

    const daysOfWeek = ['Breakfast', 'Launch', 'Snacks'];

    return (
        <div className="overlay">
            <div className="mymodal">
                <div className="modal-content">
                    <h2>Add Meal</h2>
                    <div className="FormHr"></div>
                    <form className="add-class-form addSubjectForm" onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <SelectDayDropDown onChange={handleChangeClass} DefaultValue={selectedDay} Options={daysOfWeek} />
                            {dayError && <div className="text-danger PopUpError mt-0">{dayError}</div>}
                        </div>
                        <label>
                            <input
                                type="text"
                                name="meal"
                                className='ClassNameInput'
                                placeholder='meal '
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

export default EditMealSchedule;
