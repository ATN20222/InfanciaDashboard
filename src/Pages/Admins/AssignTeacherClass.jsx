import React, { useEffect, useState } from 'react';
import ClassDropDown from '../../Components/DrobDown/ClassDropDown';
import { AuthService, ClassService, NurseryServices } from '../../Service/Api';
import { setName } from '../../Service/AxiosApi';

const AssignTeacherClass = ({ id, isOpen, onClose, onAssignClasses }) => {
    const [classes, setClasses] = useState([]);
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [classError, setClassError] = useState('');

    useEffect(() => {
        fetchClasses();
        fetchAssigned();
    }, [id]);

    const fetchAssigned = async () => {
        try {
            const response = await AuthService.GetAssignedClasses(id);
            setSelectedClasses(response.content);
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };


    const fetchClasses = async () => {
        try {
            const response = await ClassService.List();
            setClasses(response.content);
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };

    const handleClassSelection = (classId) => {
        setSelectedClasses((prev) =>
            prev.some((item) => item.class_room_id === classId)
                ? prev.filter((item) => item.class_room_id !== classId)
                : [...prev, { class_room_id: classId }]
        );
        setClassError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setClassError('');

        if (selectedClasses.length === 0) {
            setClassError('At least one class must be selected');
            return;
        }

        onAssignClasses({
            user_id: id,
            classrooms: selectedClasses,
        });
        console.log({
            user_id: id,
            classrooms: selectedClasses,
        });
        clearData();
        onClose();
    };

    const clearData = () => {
        setSelectedClasses([]);
        setClassError('');
    };

    if (!isOpen) return null;

    return (
        <div className="overlay">
            <div className="mymodal">
                <div className="modal-content">
                    <h3>Assign Classes to Teacher</h3>
                    <div className="FormHr"></div>
                    <form className='add-class-form' onSubmit={handleSubmit}>

                        <div className={`ChooseRoleItems ${classError ? '' : 'mb-1'}`}>
                            {classes.map((cls) => (
                                <div className="RoleItem" key={cls.id}>
                                    <input
                                        type="checkbox"
                                        value={cls.id}
                                        id={cls.name}
                                        checked={selectedClasses.some((item) => item.class_room_id === cls.id)}
                                        onChange={() => handleClassSelection(cls.id)}
                                    />
                                    <label htmlFor={cls.name}>{cls.name}</label>
                                </div>
                            ))}
                        </div>
                        {classError && <span className="text-danger PopUpError mt-0 mb-4">{classError}</span>}


                        <div className="form-buttons mt-4">
                            <button type="submit" className="RegisterBtn">
                                Save
                            </button>

                            <button
                                type="button"
                                className="CancelBtn"
                                onClick={() => {
                                    onClose();
                                    clearData();
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

export default AssignTeacherClass;
