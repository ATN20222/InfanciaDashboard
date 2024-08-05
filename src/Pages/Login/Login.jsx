import React, { useState, useContext } from "react";
import './Login.css';
import InfanciaLogo from '../../Assets/images/INFANCIA_LOGO.png';
import { Link, useNavigate  } from "react-router-dom";
import { AuthService } from '../../Service/Api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [ErrorSummary, setErrorSummary] = useState('');
  const [loading , setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    setEmailError("")
    event.preventDefault();
    setPasswordError("")

    if(!validateEmail(email)){
        setEmailError("invalid email")
        return
    }
    if(!validatePassword(password)){
        setPasswordError("invalid password")
        return
    }

    try {
        setLoading(true);

      const userData = await AuthService.Login(email, password);
      localStorage.setItem("welcome" , 1);

      
      navigate('/home'); 
    } catch (error) {
        setLoading(false);

        setErrorSummary(error.message);

    }
  };

  function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  }
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };  

  return (
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
                <div className="Container Center">
                    {ErrorSummary&&
                        <div className="mt-4 text-danger">
                            {ErrorSummary}
                        </div>
                    }
                </div>
              </div>
              <div className="col-lg-12 FormCol">
                <form onSubmit={handleLogin} className="container">
                  <div className="row Center">
                    <div className="col-lg-12 FormInputCol LoginCol">
                      <input
                        type="email"
                        className="FormInput"
                        id="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        
                      />
                      <label className="FormLabel" htmlFor="Email">Email :</label>
                      <div className="ErrorMessage">
                       {emailError}
                      </div>
                    </div>
                    
                    <div className="col-lg-12 FormInputCol LoginCol">
                      <input
                        type="password"
                        className="FormInput"
                        id="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        
                      />
                      <label className="FormLabel" htmlFor="Password">Password :</label>
                      
                    <div className="ErrorMessage">
                        {passwordError}
                    </div>
                    </div>
                    <div className="col-lg-12 FormInputCol AfterPassword">
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
                    </div>

                    {!loading?<div className="col-lg-12 FormInputCol Center LoginBtnContainer">
                      <button className="LoginBtn" type="submit">Login</button>
                      <span>
                        Don't have an account? <Link className="RegisterLink" to="/register">Register now</Link>
                      </span>
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

export default Login;
