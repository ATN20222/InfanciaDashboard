import React, { useEffect } from "react";
import InfanciaLogo from '../../Assets/images/INFANCIA_LOGO.png'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
const NewPassword = ()=>{
 
    return(
        <div className="LoginMain">
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
                                    <span>No Worries, we'll send you reset instructions.</span>
                                </div>
                            </div>

                            <div className="col-lg-12 FormCol">
                            <form action="" className="container">
                                
                                <div className="row Center">
                                    <div className="col-lg-12 FormInputCol">
                                        <input type="password" className="FormInput" name="" id="Password" />
                                        <label className="FormLabel" htmlFor="Password">Password : </label>

                                    </div>
                                    <div className="col-lg-12 FormInputCol">
                                        <input type="password" className="FormInput ConfirmPassword" name="" id="ConfirmPassword" />
                                        <label className="FormLabel" htmlFor="ConfirmPassword">Confirm Password : </label>

                                    </div>
                                    
                                    <div className="col-lg-12 FormInputCol Center LoginBtnContainer">
                                        <button className=" LoginBtn">Login</button>
                                        <span className="BackToLogin">
                                            <Link className="RegisterLink" to="/Login" ><FontAwesomeIcon icon={faChevronLeft}/> Bach to login</Link>
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
export default NewPassword;