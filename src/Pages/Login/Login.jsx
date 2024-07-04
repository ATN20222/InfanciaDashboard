import React from "react";
import './Login.css'
import InfanciaLogo from '../../Assets/images/INFANCIA_LOGO.png'
import { Link } from "react-router-dom";
const Login = ()=>{
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
                                    <h3>Welcome</h3>
                                    <span>Hey, welcome back to your special place </span>
                                </div>
                            </div>

                            <div className="col-lg-12 FormCol">
                            <form action="" className="container">
                                
                                <div className="row Center">
                                    <div className="col-lg-12 FormInputCol">
                                        <input type="email" className="FormInput" name="" id="Email" />
                                        <label className="FormLabel" htmlFor="Email">Email : </label>
                                    </div>
                                    <div className="col-lg-12 FormInputCol">
                                        <input type="password" className="FormInput" name="" id="Password" />
                                        <label className="FormLabel" htmlFor="Password">Password : </label>

                                    </div>
                                    <div className="col-lg-12 FormInputCol AfterPassword">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-6 RememberCol">
                                                    <input type="checkbox" className="Remember" name="" id="Remember" />
                                                    <label className="" htmlFor="Remember">Remember me </label>
                                                </div>
                                                <div className="col-6 ForgetPasswordCol">
                                                    <Link className="ForgetPassword">Forgot password</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 FormInputCol Center LoginBtnContainer">
                                        <button className=" LoginBtn">Login</button>
                                        <span>
                                            Don't have account?<Link className="RegisterLink" > register now</Link>
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
export default Login;