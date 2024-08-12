import React, { useEffect, useState } from 'react';

const KidProfileDropdown = ({ Options, DefaultValue, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(DefaultValue);

    useEffect(() => {
        const initialOption = Options.find(option => option.id === DefaultValue);
        if (initialOption) {
            setSelectedOption(initialOption.name);
        }
    }, [DefaultValue, Options]);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        setSelectedOption(option.name); // assuming options are objects with a 'name' property
        onChange(option.id); // pass the id of the selected option to the parent component
        setIsOpen(false);
    };

    return (
        <div className="dropdown-container">
            <div className="dropdown-header" onClick={toggleDropdown}>
                {selectedOption || 'Select a class'}
                <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}></span>
            </div>
            {isOpen && (
                <div className="dropdown-list">
                    {Options.map((option) => (
                        <div
                            key={option.id}
                            className="dropdown-item"
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

export default KidProfileDropdown;
