    import React, { useState } from "react";
    import InfanciaLogo from '../../Assets/images/INFANCIA_LOGO.png'
    import { Link, useNavigate } from "react-router-dom"; // use useNavigate
    import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
    import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
    import { AuthService } from "../../Service/Api";
    import toast, { Toaster } from "react-hot-toast";

    const WriteEmail = () => {
        const [emailError, setEmailError] = useState('');
        const [email, setEmail] = useState('');
        const navigate = useNavigate();
        const [loading , setLoading] = useState(false);

        const handleFormSubmit = async (event) => {
            event.preventDefault();

            setEmailError("");

            if (!validateEmail(email)) {
                setEmailError("Invalid email");
                return;
            }

            try {
                setLoading(true);
                const response = await AuthService.RequestPasswordReset(email);
                toast.success('Email sent successfully');
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } catch (error) {
                setEmailError(error.message);
                setLoading(false);

            }
        }

        const validateEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
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
                                        <h3>Forgot Password?</h3>
                                        <span>No worries, we'll send you reset instructions.</span>
                                    </div>
                                </div>

                                <div className="col-lg-12 FormCol">
                                    <form className="container" onSubmit={handleFormSubmit}>
                                        <div className="row Center">
                                            <div className="col-lg-12 FormInputCol LoginCol EmailLoginCol">
                                                <input
                                                    type="email"
                                                    className="FormInput EmailLogin"
                                                    id="Email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                <label className="FormLabel" htmlFor="Email">Email:</label>
                                                <div className="ErrorMessage">
                                                    {emailError}
                                                </div>
                                            </div>
                                            {!loading?<div className="col-lg-12 FormInputCol Center LoginBtnContainer">
                                                <button className="LoginBtn">Send</button>
                                                <span className="BackToLogin">
                                                    <Link className="RegisterLink" to="/Login"><FontAwesomeIcon icon={faChevronLeft} /> Back to login</Link>
                                                </span>
                                            </div>:<div className="col-lg-12 FormInputCol Center LoginBtnContainer"><div class="loader"></div></div>}
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

    export default WriteEmail;
