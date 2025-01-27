import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './CustomDropdown.css';

const SelectCityAndCountry = ({ Options = [], DefaultValue = '', onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(DefaultValue);
    const [options, setOptions] = useState(Options);

    useEffect(() => {
        setOptions(Options); // Update options if Options prop changes
    }, [Options]);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className="dropdown-container">
            <div
                className="dropdown-header"
                onClick={toggleDropdown}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') toggleDropdown();
                }}
            >
                {selectedOption || 'Select an option'}
                <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}></span>
            </div>
            {isOpen && options.length > 0 && (
                <div className="dropdown-list" role="listbox">
                    {options.map((option, index) => (
                        <div
                            key={option}
                            className="dropdown-item"
                            role="option"
                            tabIndex={0}
                            onClick={() => handleOptionClick(option)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') handleOptionClick(option);
                            }}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
            {isOpen && options.length === 0 && <div className="dropdown-item">No options available</div>}
        </div>
    );
};

SelectCityAndCountry.propTypes = {
    Options: PropTypes.arrayOf(PropTypes.string),
    DefaultValue: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

export default SelectCityAndCountry;
