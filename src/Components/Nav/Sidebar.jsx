import React, { useContext, useEffect, useState } from 'react';
import './Sidebar.css';
import SideBarImage from '../../Assets/images/INFANCIA_LOGO.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faAddressCard, faBuildingUser, faCashRegister, faChalkboard, faChildren, 
    faComments, faCreditCard, faCreditCardAlt, faFileCircleCheck, faHand, 
    faHandPointer, faHandPointUp, faHome, faNewspaper, faRightFromBracket, 
    faUserGroup, faUserPlus, faUtensils 
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../../Service/Api';
import { useAuth } from '../../Context/AuthContext';
import { getIsSuperAdmin } from '../../Service/AxiosApi';
import ConfirmLogoutModal from './ConfirmLogoutModal';

function Sidebar({ isOpen, toggleSidebar, openConfirmLogoutModal }) {
    useEffect(() => {
        GetPermissions();
    }, []);
    const [isOwner , setIsOwner] = useState(false);
    const [roleItems, setRoleItems] = useState([
        { id: 1, Selected: 0, Name: "Manage-Classes" },
        { id: 2, Selected: 0, Name: "Nursery-Profile" },
        { id: 3, Selected: 0, Name: "Meals" },
        { id: 4, Selected: 0, Name: "Newsletter" },
        { id: 5, Selected: 0, Name: "Nursery-Policy" },
        { id: 6, Selected: 0, Name: "Faq" },
        { id: 7, Selected: 0, Name: "Payment-Bills" },
        { id: 8, Selected: 0, Name: "Payment-Request" },
        { id: 9, Selected: 0, Name: "Admins" },
        { id: 10, Selected: 0, Name: "Subjects" },
        { id: 11, Selected: 0, Name: "Schedule" },
        { id: 12, Selected: 0, Name: "Chats" }
    ]);

    async function GetPermissions() {
        try {
            const response = await AuthService.AuthRole();
            const permissions = response.content.permissions;
            let updatedRoleItems = [];

            if (response[0]?.role === "Nursery Owner") {
                updatedRoleItems = roleItems.map(item => ({
                    ...item,
                    Selected: 1
                }));
            } else {
                updatedRoleItems = roleItems.map(item => ({
                    ...item,
                    Selected: permissions.includes(item.Name) ? 1 : 0
                }));
            }
            updatedRoleItems.push(
                { id: 13, Selected: response.content.role==='owner'?1:0, Name: "Branches" }
            );

            console.log(updatedRoleItems);
            setRoleItems(updatedRoleItems);
        } catch (error) {
            console.error("Error fetching permissions:", error);
        }
    }

    const isSuperAdmin = getIsSuperAdmin();

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="close-button" onClick={toggleSidebar}>×</button>
            <div className="SideBarImage Center">
                <div className="SideImage Center">
                    <img src={SideBarImage} width="80%" alt="Logo" />
                </div>
            </div>
            <div className="SideBarHr" />
            {!isSuperAdmin ? (
                <ul>
                    <li>
                        <Link to="/" className='nav-link' onClick={toggleSidebar}>
                            <FontAwesomeIcon icon={faHome} />
                            Home
                        </Link>
                    </li>
                    {roleItems
                        .filter(item => item.Selected === 1)
                        .map(item => (
                            <li key={item.id}>
                                <Link 
                                    to={`/${item.Name.toLowerCase().replace(/-/g, '')}`} 
                                    className='nav-link' 
                                    onClick={toggleSidebar}
                                >
                                    <FontAwesomeIcon icon={getIcon(item.Name)} />
                                    {item.Name.replace('-', ' ')}
                                </Link>
                            </li>
                        ))}
                    <li>
                        <div onClick={openConfirmLogoutModal} className='Center Logout'>
                            <FontAwesomeIcon icon={faRightFromBracket} />
                            Logout
                        </div>
                    </li>
                </ul>
            ) : (
                <ul>
                    <li>
                        <Link to="/" className='nav-link' onClick={toggleSidebar}>
                            <FontAwesomeIcon icon={faHome} />
                            Home
                        </Link>
                    </li>
                    {isSuperAdmin && (
                        <>
                            <li>
                                <Link to="/nurseries" className='nav-link' onClick={toggleSidebar}>
                                    <FontAwesomeIcon icon={faBuildingUser} />
                                    Nurseries
                                </Link>
                            </li>
                            <li>
                                <Link to="/fakeregister" className='nav-link' onClick={toggleSidebar}>
                                    <FontAwesomeIcon icon={faUserPlus} />
                                    Fake Register
                                </Link>
                            </li>
                        </>
                    )}
                    <li>
                        <Link to="/paymenthistory" className='nav-link' onClick={toggleSidebar}>
                            <FontAwesomeIcon icon={faCreditCard} />
                            Payment history
                        </Link>
                    </li>
                    <li>
                        <div onClick={openConfirmLogoutModal} className='Center Logout'>
                            <FontAwesomeIcon icon={faRightFromBracket} />
                            Logout
                        </div>
                    </li>
                </ul>
            )}
        </div>
    );
}

// Helper function to get the appropriate icon based on the item name
function getIcon(name) {
    switch (name) {
        case "Manage-Classes":
            return faChalkboard;
        case "Nursery-Profile":
            return faUserGroup;
        case "Meals":
            return faUtensils;
        case "Newsletter":
            return faNewspaper;
        case "Nursery-Policy":
            return faFileCircleCheck;
        case "Faq":
            return faComments;
        case "Payment-Bills":
            return faCreditCardAlt;
        case "Payment-Request":
            return faCashRegister;
        case "Admins":
            return faHand;
        case "Subjects":    
            return faChalkboard;
        case "Schedule":
            return faFileCircleCheck;
        case "Chats":
            return faComments;
        default:
            return faHome; // default icon
    }
}

export default Sidebar;
