import React, { useState } from 'react';
import './PaymentRequestItem.css';

const AddRequestModal = ({ isOpen, onClose,     onAddRequest }) => {
    const [serviceName, setServiceName] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState(false);
    const [serviceNameError, setServiceNameError] = useState('');
    const [amountError, setAmountError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');

    const [description, setDescription] = useState('');

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

        onAddRequest(serviceName, amount, status , description);
        setServiceName('');
        setAmount('');
        setStatus(false);
        setDescription('');

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
    const ClearData = () => {
        setDescription('');
        setAmount('');
        setServiceName('');
        setAmountError('');
        setDescriptionError('');
        setServiceNameError('');

    }
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
                                className='ClassNameInput mt-2 mb-1'
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
                                className={`ClassNameInput mt-2 `}
                                placeholder='Amount'
                                value={amount}
                                onChange={handleAmountChange}
                            />
                            {amountError && <div className="text-danger PopUpError mt-0 mb-0">{amountError}</div>}
                        </label>


                        <textarea
                            name="Newsletter"
                            className={`ClassNameInput NewsletterDescription NewsletterDescription2 ${descriptionError ? ' mb-2' : ''}`}
                            placeholder='Service description...'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {descriptionError && <span className='text-danger PopUpValidation mb-3'>{descriptionError}</span>}


                        <div className="HasContainer mb-4">

                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={status}
                                    onChange={(e) => setStatus(e.target.checked)}
                                />
                                Mandatory
                            </label>

                        </div>



                        <div className="form-buttons">
                            <button className="RegisterBtn" type="submit">
                                Save
                            </button>
                            <button className="CancelBtn" onClick={()=>{onClose();ClearData()}}>
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
