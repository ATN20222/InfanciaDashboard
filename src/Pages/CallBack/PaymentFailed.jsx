import React from 'react';
import TopImage from '../../Assets/images/HeaderLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './PaymentFailed.css';
import { useLocation } from 'react-router-dom';

const PaymentFailed = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
  
    const transactionId = queryParams.get('id');
    const amountCents = queryParams.get('amount_cents');
    const amountPaid = (amountCents / 100).toFixed(2);
    const success = queryParams.get('success') === 'true';
    const createdAt = new Date(queryParams.get('paid_at')).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
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
                <p><strong>Transaction ID:</strong> {transactionId}</p>
                <p><strong>Amount Paid:</strong> EGP {amountPaid}</p>
                <p><strong>Date:</strong> {createdAt}</p>
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
