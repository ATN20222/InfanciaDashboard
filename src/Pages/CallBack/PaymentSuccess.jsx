import React from 'react';
import TopImage from '../../Assets/images/HeaderLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  return (
    <div className="PaymentSucess">

        <div className="TopImage">
            <img src={TopImage} width="200px" alt="Infancia Logo" />
        </div>
        <div className="payment-success-container">


        <div className="success-message">
            <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
            <h1>Payment Successful!</h1>
            <p>Your payment has been processed successfully.</p>
            <p>Thank you for your payment.</p>
            <div className="success-details">
            <h2>Payment Details</h2>
            <p><strong>Transaction ID:</strong> 123456789</p>
            <p><strong>Amount Paid:</strong> $100.00</p>
            <p><strong>Date:</strong> September 2, 2024</p>
            </div>
        </div>

        <div className="success-actions">
            <button className="btn-primary">Go to Dashboard</button>
            {/* <button className="btn-secondary">View Receipt</button> */}
        </div>
        </div>
    </div>
  );
};

export default PaymentSuccess;
