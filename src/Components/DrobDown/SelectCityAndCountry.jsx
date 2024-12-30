import React, { useEffect, useState } from 'react';
import './CustomDropdown.css';

const SelectCityAndCountry = ({Options , DefaultValue,onChange}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(DefaultValue);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleOptionClick = (option) => {
        setSelectedOption(option.name);
        onChange(option.id);
        setIsOpen(false);
    };

    const [options,setOptions] = useState([]);
    useEffect(()=>{
        setOptions(Options);
    },[])

    return (
        <div className="dropdown-container">
            <div className="dropdown-header" onClick={toggleDropdown}>
                {selectedOption}
                <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}></span>
            </div>
            {isOpen && (
                <div className="dropdown-list">
                    {options.map((option) => (
                        <div
                            key={option.id}
                            className="dropdown-item "
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectCityAndCountry;
