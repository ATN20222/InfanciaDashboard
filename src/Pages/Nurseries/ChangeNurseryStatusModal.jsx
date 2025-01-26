import React, { useEffect, useState } from 'react';
import { NurseryServices } from '../../Service/Api';

const ChangeNurseryStatusModal = ({ id, isOpen, onClose, onStatusChange }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [about, setAbout] = useState('');
    const [branchesNumber, setBranchesNumber] = useState('');
    const [status, setStatus] = useState('pending');
    const [formErrors, setFormErrors] = useState({});
    const [oldStatus , setOldStatus] = useState('');

    useEffect(() => {
        if(id) GetData();
    }, [id, isOpen]);

    async function GetData() {
        try {
            const response = await NurseryServices.ListById(id);
            setAbout(response.content.about);
            setAddress(response.content.address);
            setBranchesNumber(response.content.branches_number);
            setEmail(response.content.email);
            setName(response.content.name);
            setPhone(response.content.phone);
            setStatus(response.content.status);
            setOldStatus(response.content.status);
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        onStatusChange(id, status);
        setName('');
        setEmail('');
        setPhone('');
        setAddress('');
        setAbout('');
        setBranchesNumber('');
        setStatus('pending');
        onClose();
    };

    if (!isOpen) return null;

    const clearData = () => {
        setName('');
        setEmail('');
        setPhone('');
        setAddress('');
        setAbout('');
        setBranchesNumber('');
        setStatus('pending');
        setFormErrors({});
    };

    return (
        <div className="overlay">
            <div className="mymodal">
                <div className="modal-content">
                    <h2>Edit Nursery Status</h2>
                    <div className="FormHr"></div>
                    <form className="add-class-form" onSubmit={handleSubmit}>
                        <label>
                            <input
                                type="text"
                                name="name"
                                className='ClassNameInput mb-2'
                                placeholder='Name'
                                value={name}
                                disabled
                            />
                            {formErrors.name && (
                                <span className='text-danger PopUpValidation'>{formErrors.name}</span>
                            )}
                        </label>

                        <label>
                            <input
                                type="email"
                                name="email"
                                className='ClassNameInput mb-2'
                                placeholder='Email'
                                value={email}
                                disabled
                            />
                            {formErrors.email && (
                                <span className='text-danger PopUpValidation'>{formErrors.email}</span>
                            )}
                        </label>

                        <label>
                            <input
                                type="text"
                                name="phone"
                                className='ClassNameInput mb-2'
                                placeholder='Phone'
                                value={phone}
                                disabled
                            />
                            {formErrors.phone && (
                                <span className='text-danger PopUpValidation'>{formErrors.phone}</span>
                            )}
                        </label>

                        <label>
                            <input
                                type="text"
                                name="address"
                                className='ClassNameInput mb-2'
                                placeholder='Address'
                                value={address}
                                disabled
                            />
                            {formErrors.address && (
                                <span className='text-danger PopUpValidation'>{formErrors.address}</span>
                            )}
                        </label>

                        <label>
                            <textarea
                                name="about"
                                className='ClassNameInput '
                                placeholder='About'
                                value={about}
                                disabled
                            />
                            {formErrors.about && (
                                <span className='text-danger PopUpValidation'>{formErrors.about}</span>
                            )}
                        </label>

                        <label>
                            <input
                                type="text"
                                name="branchesNumber"
                                className='ClassNameInput mb-2'
                                placeholder='Branches Number'
                                value={branchesNumber+' Branches'}
                                disabled
                            />
                            {formErrors.branchesNumber && (
                                <span className='text-danger PopUpValidation'>{formErrors.branchesNumber}</span>
                            )}
                        </label>

                        <label>
                            <select
                                name="status"
                                className='ClassNameInput mb-2'
                                value={status}
                                disabled={oldStatus === 'approved'}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="approved">Approved</option>
                                <option value="pending">Pending</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </label>

                        <div className="form-buttons mt-3">
                            <button className="RegisterBtn">Save</button>
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

export default ChangeNurseryStatusModal;
