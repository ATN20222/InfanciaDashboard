import React, { useState, useContext, useEffect } from "react";
import InfanciaLogo from '../../Assets/images/CreditCard.png';
import { Link, useNavigate  } from "react-router-dom";
import { AuthService } from '../../Service/Api';
import { useAuth } from "../../Context/AuthContext";
import { Toaster } from "react-hot-toast";
import './Pay.css'
const Pay = () => {

  const [ErrorSummary, setErrorSummary] = useState('');
  const [loading , setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();
  useEffect(()=>{
    if(localStorage.getItem("isAuthenticated")){
      // navigate('/hpme')
      login();
      console.log("hi")
    }
  })



  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState({});

  const validateExpDate = (date) => {
    const expDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    return expDateRegex.test(date);
  };

  const validateCvv = (code) => {
    const cvvRegex = /^[0-9]{3}$/;
    return cvvRegex.test(code);
  };
  const validateCardNumber = (number) => {
    const cardNumberRegex = /^[0-9]{16}$/;
    return cardNumberRegex.test(number.replace(/\s+/g, ''));
  };
  const handleSave = async (event) => {
    event.preventDefault();
    setErrorSummary("");
    setErrors({});
    let formErrors = {};



    if (!validateCardNumber(cardNumber)) {
      if(cardNumber.trim()==='')
        formErrors.cardNumber = 'Card number is required';
      else
      formErrors.cardNumber = 'Invalid card number. Must be 16 digits.';
    }
    if (!validateExpDate(expDate)) {
      if(expDate.trim()==='')
        formErrors.expDate = 'Exp. Date is required';
      else
      formErrors.expDate = 'Exp. Date must be in MM/YY';
    }
    if (cardName.trim()==='') {
        formErrors.cardHolderName = 'Card holder name is required';
    }
    if (!validateCvv(cvv)) {
      formErrors.cvv = 'Invalid CVV. Must be 3 digits.';
    }
    // return;
    if (Object.keys(formErrors).length === 0) {
      try {
        setLoading(true);

      // const userData = await AuthService.Login(email, password);
      // localStorage.setItem("welcome" , 1);
      // login();
      // navigate('/home'); 
      } catch (error) {
          setLoading(false);

          setErrorSummary(error.message);

      }
    } else {
      setErrors(formErrors);
    }
   
  };
  return (
    <div className="LoginMain SubscriptionMain">
      <div className="Toaster">
        <Toaster
            position="top-right"
            reverseOrder={false}
        />
      </div>
      <div className="row">
        
        <div className="col-lg-12 col-md-12 col-sm-12 col-12 Center SubscriptionContainer">
          <div className="container">
            <div className="row Center">
              <div className="col-lg-6">
                <div className="Welcome Center">
                  <div className="CardContainer Center">

                    <img src={InfanciaLogo} width="90%" alt="" />
                  </div>
                  
                </div>
                <div className="Container text-start">
                    {ErrorSummary&&
                        <div className="mt-4 text-danger text-start">
                            {ErrorSummary}
                        </div>
                    }
                </div>
              </div>
              <div className="col-lg-6 FormCol">
                <div className="TextPaymentContainer p-3">
                  <h3 className="TextSubscriptionHeader">Write Your Payment Credintials</h3>
                  <span className="TextSubscriptionSpan">your data will be saved and subscription will auto recharged </span>
                </div>
              
                <form onSubmit={handleSave} className="container">
                  <div className="row Center">
                    <div className="col-lg-12 mb-2 mt-2 p-0">
                      
                        <input 
                          type="text" 
                          name="className" 
                          maxLength="19"
                          className='ClassNameInput PaymentInput mt-2' 
                          placeholder='Card Number '
                          value={cardNumber}
                          onChange={(e) => {
                            let input = e.target.value.replace(/\D/g, '');
                            if (input.length > 4) {
                              input = input.slice(0, 4) + " " + input.slice(4);
                            }
                            if (input.length > 9) {
                              input = input.slice(0, 9) + " " + input.slice(9);
                            }
                            if (input.length > 14) {
                              input = input.slice(0, 14) + " " + input.slice(14);
                            }
                            input = input.slice(0, 19);

                            setCardNumber(input);
                          }
                        }
                            />

                      <div className="ErrorMessage">
                        {errors.cardNumber && <span className="text-danger">{errors.cardNumber}</span>}
                      </div>
                    </div>
                    
                    
                    <div className="col-lg-12 mb-2 p-0">
                      <input 
                        type="text" 
                        name="className" 
                        className='ClassNameInput PaymentInput' 
                        placeholder="Cardholder Name"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        />
                      
                    <div className="ErrorMessage">
                    {errors.cardHolderName && <span className="text-danger">{errors.cardHolderName}</span>}
                    </div>
                      


                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-6 col-6 p-1">
                        <input
                        className="ClassNameInput PaymentInput"
                          type="text"
                          placeholder="MM/YY"
                          maxLength="5"
                          value={expDate}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, ''); 
                            if (value.length >= 3) {
                              value = value.slice(0, 2) + '/' + value.slice(2); 
                            }
                            setExpDate(value);
                          }}
                        />
                      {errors.expDate && <span className="text-danger p-3">{errors.expDate}</span>}
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-6 col-6 p-1">
                      <input
                        className="ClassNameInput PaymentInput"
                        type="text"
                        placeholder="CVV"
                        maxLength="3"
                        value={cvv}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, ''); 
                          setCvv(value);
                        }}
                      />
                      {errors.cvv && <span className="text-danger p-3">{errors.cvv}</span>}
                      </div>
                    {/* <div className="col-lg-12 FormInputCol AfterPassword">
                      <div className="container">
                        <div className="row">
                          <div className="col-6 RememberCol">
                            <input type="checkbox" className="Remember" id="Remember" />
                            <label htmlFor="Remember">Remember me </label>
                          </div>
                          <div className="col-6 ForgetPasswordCol">
                            <Link className="ForgetPassword" to="/ForgetPassword">Forgot password</Link>
                          </div>
                        </div>
                      </div>
                    </div> */}

                    {!loading?<div className="col-lg-12 FormInputCol Center LoginBtnContainer">
                      <button className="LoginBtn" type="submit">Save</button>
                      
                    </div>:
                    
                    <div className="col-lg-12 FormInputCol Center LoginBtnContainer"><div class="loader"></div></div>
                    }
                    
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;
