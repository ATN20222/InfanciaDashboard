import React, { useEffect, useState } from 'react';
import TopImage from '../../Assets/images/HeaderLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './PaymentSuccess.css';
import './PaymentFailed.css'
import { Link, useLocation } from 'react-router-dom';
import { AuthService } from '../../Service/Api';
import toast from 'react-hot-toast';

const PaymentSuccess = ({transactionId ,amountPaid,createdAt}) => {
  const [loading , setLoading] = useState(false);
  const [status , setStatus] = useState(true);

  useEffect(()=>{
    SendApprove();
  },[]);
  const SendApprove = async ()=>{
    setLoading(true);
    try{
      const response = await AuthService.ApprovedNursery(transactionId);
      toast.success('Your account has been actived');
      setStatus(true);
    }catch(error){
      setStatus(false);
      toast.error(error);
    }finally{
    setLoading(false);
    }
    
  }
  return (
    <div className="PaymentSuccess">
    <div className="TopImage">
      <img src={TopImage} width="200px" alt="Infancia Logo" />
    </div>
    {loading?<div className="col-lg-12 FormInputCol Center LoginBtnContainer"><div class="loader"></div></div>
    :
    status?
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
    :
    <PaymentFailed amountPaid={amountPaid} createdAt={createdAt} transactionId={transactionId} isFromSuccess={true}/>
    // <div className='Center'>
    //   <h3>Failed to get payment data</h3>
    // </div>
  }
  </div>
  );
};
const PaymentFailed = ({transactionId ,amountPaid,createdAt, isFromSuccess}) => {
return (
  <div className="FailedPayment">
    {!isFromSuccess&&
      <div className="TopImage">
        <img src={TopImage} width="200px" alt="Infancia Logo" />
      </div>
    }
      

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
              {/* <button className="btn-secondary">Contact Support</button> */}
          </div>
          </div>
      </div>
  </div>
);
};
const Payment = ()=>{
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
  console.log("success", success);
  const queryParamsObject = {};
  queryParams.forEach((value, key) => {
    queryParamsObject[key] = value;
  });
  if(success){
    return (
    <>
      <PaymentSuccess transactionId={transactionId} amountPaid={amountPaid} createdAt={createdAt} />
      <div className="callbackdata">
        <h2>Callback Data</h2>
        <ul>
          {Object.entries(queryParamsObject).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>
    </>
    );
  }else{
    return(
      <>
        <PaymentFailed transactionId={transactionId} amountPaid={amountPaid} createdAt={createdAt}/>
        <div className="callbackdata">
        <h2>Callback Data</h2>
        <ul>
          {Object.entries(queryParamsObject).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>
      </>

    );
  }

}
export default Payment;
