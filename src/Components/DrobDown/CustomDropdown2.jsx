import React, { useEffect, useState } from 'react';
import './CustomDropdown.css';

const CustomDropdown2 = ({Options , DefaultValue}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(DefaultValue);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const [options,setOptions] = useState([]);
    useEffect(()=>{
        setOptions(Options);
    },[])

    return (
        <div className="dropdown-container">
            <div className="dropdown-header dropdown-header2" onClick={toggleDropdown}>
                {selectedOption}
                <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}></span>
            </div>
            {isOpen && (
                <div className="dropdown-list dropdown2">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className="dropdown-item"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown2;
