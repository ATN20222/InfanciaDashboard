import { faBell, faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faHand, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
const Header = ()=>{
    return(
        <header>
            <div className=" HeaderContainer">
                <div className="row HeaderRow">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6 SearchCol">
                        {/* <input type="text" className="FormInput" name="" id="" placeholder="Search..."/>
                        <FontAwesomeIcon icon={faSearch}/> */}
                        <span className="text-start WelcomeText">Welcome, <span className="HeaderName"> Kiddy Corner !</span></span>
                    </div> 
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6 RightSideHeader">
                        <div className="Notify">
                            <FontAwesomeIcon icon={faBell}/>
                        </div>
                        <div className="Person">
                            <Link className="nav-link" to='/nurseryprofile'>
                                <FontAwesomeIcon icon={faCircleUser}/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        
    );
}
export default Header;