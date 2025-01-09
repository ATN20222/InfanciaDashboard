import { faBell, faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faBell as Bell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Notifications from "./Notifications";
import { getName } from "../../Service/AxiosApi";

const Header = () => {
    const [openNotification, setOpenNotification] = useState(false);
    const dropdownRef = useRef(null); 
    const bellRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                bellRef.current &&
                !bellRef.current.contains(event.target)
            ) {
                setOpenNotification(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const toggleNotification = () => {
        setOpenNotification((prev) => !prev);
    };

    return (
        <header>
            <div className="HeaderContainer">
                <div className="row HeaderRow">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6 SearchCol">
                        <span className="text-start WelcomeText">
                            Welcome, <span className="HeaderName">{getName()}</span>
                        </span>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6 RightSideHeader">
                        <div
                            className="Notify"
                            onClick={toggleNotification}
                            ref={bellRef}
                        >
                            {!openNotification?<FontAwesomeIcon icon={faBell} />:<FontAwesomeIcon icon={Bell}/>}
                        </div>

                        <div className="Person">
                            <Link className="nav-link" to="/nurseryprofile">
                                <FontAwesomeIcon icon={faCircleUser} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {openNotification && (
                <div
                    className="NotificationsDropdown"
                    ref={dropdownRef} 
                >
                    <Notifications />
                </div>
            )}
        </header>
    );
};

export default Header;
