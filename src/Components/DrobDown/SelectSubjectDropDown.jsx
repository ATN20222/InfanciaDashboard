import React, { useEffect, useState } from 'react';
import './CustomDropdown.css';

const SelectSubjectDropDown = ({ Options, DefaultValue, IsAddTeacher, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(DefaultValue);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleOptionClick = (option) => {
        setSelectedOption(option.title); 
        onChange(option.id)
        setIsOpen(false);
    };

    const [options, setOptions] = useState([]);
    useEffect(() => {
        setOptions(Options);
    }, [Options]); 

    return (
        <div className="dropdown-container">
            <div className={`dropdown-header ${IsAddTeacher ? "ClassTeacherDropDown" : 'dropdown-header2'}`} onClick={toggleDropdown}>
                {selectedOption}
                <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}></span>
            </div>
            {isOpen && (
                <div className="dropdown-list dropdown2">
                    {options.map((option, index) => (
                        <div
                            key={option.id} 
                            className="dropdown-item"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.title} 
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectSubjectDropDown;
