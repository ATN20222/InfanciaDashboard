import React from 'react';
import TopImage from '../../Assets/images/HeaderLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './PaymentSuccess.css';
import { Link, useLocation } from 'react-router-dom';

const PaymentSuccess = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const transactionId = queryParams.get('id');
  const amountCents = queryParams.get('amount_cents');
  const amountPaid = (amountCents / 100);
  const success = queryParams.get('success') === 'true';
  const createdAt = new Date(queryParams.get('paid_at')).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  
  return (
    <div className="PaymentSuccess">
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
          <p><strong>Transaction ID:</strong> {transactionId}</p>
          <p><strong>Amount Paid:</strong> EGP {amountPaid}</p>
          <p><strong>Date:</strong> {createdAt}</p>
        </div>
      </div>

      <div className="success-actions">
        <Link to="/home" className=" nav-link">Go to Dashboard</Link>
        {/* <button className="btn-secondary">View Receipt</button> */}
      </div>
    </div>
  </div>
  );
};

export default PaymentSuccess;
