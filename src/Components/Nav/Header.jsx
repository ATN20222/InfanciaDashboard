import { faBell, faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faBell as Bell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Notifications from "./Notifications";
import { getIsSuperAdmin, getName } from "../../Service/AxiosApi";
import { onMessageListener, requestNotificationPermission } from "../../Service/Firebase";
import { NotificationService } from "../../Service/Api";

const Header = () => {
    const [count , setCount] = useState(0);
    const [openNotification, setOpenNotification] = useState(false);
    const [notifications,setNotifications] = useState([]);
    const dropdownRef = useRef(null); 
    const bellRef = useRef(null);
    useEffect(() => {
        // Request permission for notifications
        requestNotificationPermission();
        // Listen for foreground messages
        onMessageListener().then((payload) => {
            console.log("Message received in foreground:", payload);
            // alert(payload.notification.title + ": " + payload.notification.body);
            setCount(count + 1);
            GetData();
        }).catch((err) => console.error("Error receiving message:", err));
    }, []);
    
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
        setCount(0);
    };

    useEffect(() => {
        GetData();
    }, []);



    async function GetData() {
        try {
            const response = await NotificationService.List();
            setNotifications(response.content);
            // setCount(response.content.length);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

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
                            {count > 0 && <span className="NotificationCount">{count}</span>}
                            {!openNotification?<FontAwesomeIcon icon={faBell} />:<FontAwesomeIcon icon={Bell}/>}
                        </div>
                        
                        {!getIsSuperAdmin()&&
                        
                        <div className="Person">
                            <Link className="nav-link" to="/nurseryprofile">
                                <FontAwesomeIcon icon={faCircleUser} />
                            </Link>
                        </div>
                        }
                    </div>
                </div>
            </div>

            {openNotification && (
                <div
                    className="NotificationsDropdown"
                    ref={dropdownRef} 
                >
                    <Notifications 
                    notificationsData={notifications}
                    />
                </div>
            )}
        </header>
    );
};

export default Header;
