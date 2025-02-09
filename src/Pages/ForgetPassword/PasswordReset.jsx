import React, { useEffect, useState } from "react";
import InfanciaLogo from '../../Assets/images/INFANCIA_LOGO.png';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import './ForgetPassword.css';
import { AuthService } from "../../Service/Api";
import toast, { Toaster } from "react-hot-toast";

const PasswordReset = () => {
    const [otp, setOtp] = useState(new Array(4).fill(""));
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const [seconds, setSeconds] = useState(120);

    useEffect(() => {
        if (seconds > 0) {
            const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [seconds]);

    const ResendOTP = async () => {
        if (seconds !== 0) {
            return;
        }
        setSeconds(120);
        try {
            const response = await AuthService.RequestPasswordReset(email);
        } catch (error) {
            console.error(error);
            toast.error(`${error}`);
        }
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpCode = otp.join('');
        try {
            const response = await AuthService.VerifyOTP(otpCode,email);
            navigate(`/PasswordReset?email=${email}&token=${response.content.token}`);
        } catch (error) {
            console.error(error);
            toast.error(`${error}`);
        }
    };

    return (
        <div className="LoginMain">
            <div className="row">
                <div className="Toaster">
                    <Toaster position="top-right" reverseOrder={false} />
                </div>
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
                                    <h3>Password Reset</h3>
                                    <span>We sent code to your email</span>
                                </div>
                            </div>

                            <div className="col-lg-12 FormCol">
                                <form action="" className="container" onSubmit={handleSubmit}>
                                    <div className="row Center">
                                        <div className="col-lg-12 Center FormInputCol otp-input-container">
                                            {otp.map((data, index) => {
                                                return (
                                                    <input
                                                        className="otp-input"
                                                        type="text"
                                                        name="otp"
                                                        maxLength="1"
                                                        key={index}
                                                        value={data}
                                                        onChange={e => handleChange(e.target, index)}
                                                        onFocus={e => e.target.select()}
                                                    />
                                                );
                                            })}
                                        </div>
                                        <div className="col-lg-12 FormInputCol AfterPassword">
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-lg-6 col-6 Center">
                                                    </div>
                                                    <div className="col-lg-6 col-6 Center">
                                                        ({seconds})s <span className="ForgetPassword ResendCode" onClick={ResendOTP}> Resend Code</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-12 FormInputCol Center LoginBtnContainer">
                                            <button className=" LoginBtn">Submit</button>
                                            <span className="BackToLogin">
                                                <Link className="RegisterLink" to="/Login"><FontAwesomeIcon icon={faChevronLeft} /> Back to login</Link>
                                            </span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PasswordReset;
