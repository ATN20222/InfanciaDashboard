import React, { useState } from 'react';
import './PaymentRequestItem.css';

const AddRequestModal = ({ isOpen, onClose, onAddRequest }) => {
    const [serviceName, setServiceName] = useState('');
    const [amount, setAmount] = useState('');
    const [serviceNameError, setServiceNameError] = useState('');
    const [amountError, setAmountError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setAmountError('');
        setServiceNameError('')
        let hasError = false;
        if (serviceName.trim() === '') {
        setServiceNameError('Service name is required');
        hasError = true;
        return;
        }

        if (amount.trim() === '') {
        setAmountError('Amount is required');
        hasError = true;
        } else if (isNaN(amount) || Number(amount) <= 0) {
        setAmountError('Amount must be a positive number');
        hasError = true;
        return;
        }

        if (hasError) return;

        onAddRequest( serviceName, amount );
        setServiceName('');
        setAmount('');
        onClose();
    };

    const handleServiceNameChange = (e) => {
        setServiceName(e.target.value);
        if (e.target.value.trim() !== '') {
        setServiceNameError('');
        }
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
        if (e.target.value.trim() !== '') {
        setAmountError('');
        }
    };

if (!isOpen) return null;

    return (
        <div className="overlay">
            <div className="mymodal">
                <div className="modal-content">
                <h3>Add Payment Request</h3>
                <div className="FormHr"></div>
                    <form className="add-class-form" onSubmit={handleSubmit}>
                        <label>
                        <input
                            type="text"
                            name="serviceName"
                            className='ClassNameInput mt-2'
                            placeholder='Service'
                            value={serviceName}
                            onChange={handleServiceNameChange}
                        />
                        {serviceNameError && <div className="text-danger PopUpError mt-0">{serviceNameError}</div>}
                        </label>

                        <label>
                        <input
                            type="number"
                            name="amount"
                            className={`ClassNameInput mt-2 ${amountError?'':" mb-4"}`}
                            placeholder='Amount'
                            value={amount}
                            onChange={handleAmountChange}
                        />
                        {amountError && <div className="text-danger PopUpError mt-0 mb-4">{amountError}</div>}
                        </label>

                        <div className="form-buttons">
                        <button className="RegisterBtn" type="submit">
                            Save
                        </button>
                        <button className="CancelBtn" onClick={onClose}>
                            Cancel
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddRequestModal;
