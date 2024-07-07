import { faBell, faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
const Header = ()=>{
    return(
        <header>
            <div className=" HeaderContainer">
                <div className="row HeaderRow">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6 SearchCol">
                        <input type="text" className="FormInput" name="" id="" placeholder="Search..."/>
                        <FontAwesomeIcon icon={faSearch}/>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6 RightSideHeader">
                        <div className="Notify">
                            <FontAwesomeIcon icon={faBell}/>
                        </div>
                        <div className="Person">
                            <FontAwesomeIcon icon={faCircleUser}/>

                        </div>
                    </div>
                </div>
            </div>
        </header>
        
    );
}
export default Header;