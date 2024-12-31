import React, { useEffect, useState } from 'react';
import './Branches.css';
import SelectClassDropDown from '../../Components/DrobDown/SelectClassDropDown';

const AddBranchModal = ({ isOpen, onClose, onAddBranch }) => {
    const [branchName, setBranchName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [branchNameError, setBranchNameError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [classes, setClasses] = useState([{ id: 1, name: 'Select Class' }]);
    const [selectedClass, setSelectedClass] = useState('');
    const [classError, setClassError] = useState('');

    useEffect(() => {
        fetchClasses();
    }, []);

    async function fetchClasses() {
        // Simulated API call for class options
        try {
            const response = [
                { id: 1, name: 'All' },
                { id: 2, name: 'Branch A' },
                { id: 3, name: 'Branch B' }
            ];
            setClasses(response);
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setBranchNameError('');
        setAddressError('');
        setEmailError('');
        setPhoneError('');
        setClassError('');

        let valid = true;

        if (!branchName) {
            setBranchNameError('Branch name is required');
            valid = false;
        }

        if (!address) {
            setAddressError('Address is required');
            valid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            setEmailError('Valid email is required');
            valid = false;
        }

        const phoneRegex = /^\d+$/;
        if (!phone || !phoneRegex.test(phone)) {
            setPhoneError('Valid phone number is required');
            valid = false;
        }

        if (valid) {
            onAddBranch(branchName, address, email, phone);
            clearForm();
            onClose();
        }
    };

    const clearForm = () => {
        setBranchName('');
        setAddress('');
        setEmail('');
        setPhone('');
        setSelectedClass('');
        setBranchNameError('');
        setAddressError('');
        setEmailError('');
        setPhoneError('');
        setClassError('');
    };

    if (!isOpen) return null;

    return (
        <div className="overlay">
            <div className="mymodal">
                <div className="modal-content">
                    <h2>Add Branch</h2>
                    <div className="FormHr"></div>
                    <form className="add-class-form" onSubmit={handleSubmit}>
                        <label>
                            <input
                                type="text"
                                name="branchName"
                                className="ClassNameInput mb-2"
                                placeholder="Branch name"
                                value={branchName}
                                onChange={(e) => setBranchName(e.target.value)}
                            />
                            {branchNameError && <span className="text-danger PopUpValidation mb-2">{branchNameError}</span>}
                        </label>

                        <label>
                            <input
                                type="text"
                                name="address"
                                className="ClassNameInput mb-2"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            {addressError && <span className="text-danger PopUpValidation mb-2">{addressError}</span>}
                        </label>

                        <label>
                            <input
                                type="email"
                                name="email"
                                className="ClassNameInput mb-2"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {emailError && <span className="text-danger PopUpValidation mb-2">{emailError}</span>}
                        </label>

                        <label>
                            <input
                                type="text"
                                name="phone"
                                className="ClassNameInput mb-2"
                                placeholder="Phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            {phoneError && <span className="text-danger PopUpValidation mb-2 mt-0">{phoneError}</span>}
                        </label>

                        <div className="form-buttons">
                            <button className="RegisterBtn" type="submit">
                                Save
                            </button>
                            <button
                                className="CancelBtn"
                                type="button"
                                onClick={() => {
                                    onClose();
                                    clearForm();
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

export default AddBranchModal;
