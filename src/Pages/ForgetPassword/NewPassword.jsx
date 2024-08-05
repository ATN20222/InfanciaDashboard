import React, { useState } from "react";
import InfanciaLogo from '../../Assets/images/INFANCIA_LOGO.png';
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "../../Service/Api";
import toast, { Toaster } from "react-hot-toast";

const NewPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [ErrorSummary, setErrorSummary] = useState('');
    const [loading , setLoading] = useState(false);
    const [errors, setErrors] = useState({
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        let isValid = true;
        const newErrors = { password: '', confirmPassword: '' };

        if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
            isValid = false;
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        if (isValid) {
            try {
            console.log(token , email , password , confirmPassword);
              const userData = await AuthService.ResetPassword(token , email , password , confirmPassword);
              toast.success('Password reseted successfully');
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } catch (error) {
                setLoading(false);
        
                setErrorSummary(error.message);
        
            }


        } else {
            setLoading(false);
            setErrors(newErrors);
        }
    };

    return (
        <div className="LoginMain">
             <div className="Toaster">
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12 LoginImageContainer Center">
                    <img src={InfanciaLogo} width="50%" alt="" />
                    <span className="InfGroup">Infancia GROUP</span>
                    <h3 className="WeDevlop">We develop with happiness</h3>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12 Center LoginFormContainer">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="Welcome">
                                    <h3>Set New Password</h3>
                                    <span>Enter your new password below.</span>
                                </div>

                            </div>

                            <div className="Container Center">
                                {ErrorSummary&&
                                    <div className="mt-4 text-danger">
                                        {ErrorSummary}
                                    </div>
                                }
                            </div>

                            <div className="col-lg-12 FormCol">
                                <form className="container" onSubmit={handleSubmit}>
                                    <div className="row Center">
                                        <div className="col-lg-12 FormInputCol LoginCol">
                                            <input
                                                type="password"
                                                className="FormInput"
                                                id="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <label className="FormLabel" htmlFor="Password">Password:</label>
                                            {errors.password&&<div className="ErrorMessage">{errors.password}</div>}
                                        </div>
                                        <div className="col-lg-12 FormInputCol LoginCol">
                                            <input
                                                type="password"
                                                className="FormInput ConfirmPassword"
                                                id="ConfirmPassword"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                            <label className="FormLabel" htmlFor="ConfirmPassword">Confirm Password:</label>
                                            {errors.confirmPassword&&<div className="ErrorMessage">{errors.confirmPassword}</div>}
                                        </div>
                                        {!loading?
                                        <div className="col-lg-12 FormInputCol Center LoginBtnContainer">
                                            <button className="LoginBtn" type="submit">Submit</button>
                                            <span className="BackToLogin">
                                                <Link className="RegisterLink" to="/Login">
                                                    <FontAwesomeIcon icon={faChevronLeft} /> Back to login
                                                </Link>
                                            </span>
                                        </div>
                                        :
                                        
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

export default NewPassword;
