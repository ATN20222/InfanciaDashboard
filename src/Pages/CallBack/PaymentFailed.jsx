import React from 'react';
import TopImage from '../../Assets/images/HeaderLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './PaymentFailed.css';

const PaymentFailed = () => {
  return (
    <div className="FailedPayment">
        <div className="TopImage">
            <img src={TopImage} width="200px" alt="Infancia Logo" />
        </div>

        <div className="PaymentFailed">


            <div className="payment-failed-container">

            <div className="failed-message">
                <FontAwesomeIcon icon={faTimesCircle} className="failed-icon" />
                <h1>Payment Failed</h1>
                <p>Unfortunately, your payment could not be processed.</p>
                <p>Please try again or contact support if the issue persists.</p>
                <div className="failed-details">
                <h2>Error Details</h2>
                <p><strong>Error Code:</strong> 987654321</p>
                <p><strong>Transaction ID:</strong> 123456789</p>
                <p><strong>Date:</strong> September 2, 2024</p>
                </div>
            </div>

            <div className="failed-actions">
                {/* <button className="btn-primary">Try Again</button> */}
                <button className="btn-secondary">Contact Support</button>
            </div>
            </div>
        </div>
    </div>
  );
};

export default PaymentFailed;
