import React ,{useContext, useEffect, useState} from 'react';
import './Sidebar.css';
import SideBarImage from '../../Assets/images/INFANCIA_LOGO.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faBuildingUser, faCashRegister, faChalkboard, faChildren, faComments, faCreditCard, faCreditCardAlt, faFileCircleCheck, faHand, faHandPointer, faHandPointUp, faHome, faNewspaper, faRightFromBracket, faUserGroup, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../../Service/Api';
import { useAuth } from '../../Context/AuthContext';
import { getIsSuperAdmin } from '../../Service/AxiosApi';
import ConfirmLogoutModal from './ConfirmLogoutModal';

function Sidebar({ isOpen, toggleSidebar , openConfirmLogoutModal }) {
    useEffect(()=>{
        GetPermissions();
    },[])

    async function GetPermissions() {
        try {
            const response = await AuthService.AuthRole();
            console.log("response",response);
        } catch (error) {
    
            console.error(error);
        }
    }
    const isSuperAdmin = getIsSuperAdmin();

  return (
    
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
          
      <button className="close-button" onClick={toggleSidebar}>×</button>
      <div className="SideBarImage Center">
        <div className="SideImage Center">
            <img src={SideBarImage} width="80%" alt="" />
        </div>
      </div>
      <div className="SideBarHr"/>
        {!isSuperAdmin?
        <ul>
        <li>
            <Link to="/" className='nav-link'>
                <FontAwesomeIcon icon={faHome}/> 
                Home
            </Link>
            
        </li>
        <li>
            <Link to="/nurseryprofile" className='nav-link'>
                <FontAwesomeIcon icon={faUserGroup}/>
                Nursery Profile
            </Link>
            
        </li>
        <li>
        <Link to="/manageclasses" className='nav-link'>
            <FontAwesomeIcon icon={faChalkboard}/>
                Manage Classes
        </Link>
            
        </li>
        <li>
            <Link to="/meals" className='nav-link'>
                <FontAwesomeIcon icon={faUtensils}/>
                Meals
            </Link>
            
        </li>
        <li>

            <Link to="/newsletter" className='nav-link'>
                <FontAwesomeIcon icon={faNewspaper}/>
                Newsletter
            </Link>

            
        </li>
        <li>
            <Link to="/parentrequest" className='nav-link'>
                <FontAwesomeIcon icon={faHandPointUp}/>
                Parent request
            </Link>
            
        </li>
        <li>
            <Link to="/paymenthistory" className='nav-link'>
                <FontAwesomeIcon icon={faCreditCard}/>
                Payment history
            </Link>
            
        </li>
        <li>

            <Link to="/Paymentrequest" className='nav-link'>
                <FontAwesomeIcon icon={faCashRegister}/>
                Payment request
            </Link>
            
        </li>
        <li>
            <Link to="/nurserypolicy" className='nav-link'>
                <FontAwesomeIcon icon={faFileCircleCheck}/>
                Nursery Policy
            </Link>
            
        </li>

        <li>
            <Link to="/roles" className='nav-link'>
                <FontAwesomeIcon icon={faHand}/>
                Roles
            </Link>
        </li>

        <li>

            <Link to="/faq" className='nav-link'>
                <FontAwesomeIcon icon={faComments}/>
                FAQ
            </Link>
            
        </li>
        
        
        <li>

        <div onClick={openConfirmLogoutModal} className='Center Logout'>
            <FontAwesomeIcon icon={faRightFromBracket} />
            Logout
            </div>
        </li>

        </ul>
        :
        <ul>
        <li>
            <Link to="/" className='nav-link'>
                <FontAwesomeIcon icon={faHome}/> 
                Home
            </Link>
            
        </li>
        {isSuperAdmin&&
         <li>
            <Link to="/Nurseries" className='nav-link'>
                <FontAwesomeIcon icon={faBuildingUser}/> 
                Nurseries
            </Link>
            
        </li>
        }
        <li>
            <Link to="/paymenthistory" className='nav-link'>
                <FontAwesomeIcon icon={faCreditCard}/>
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
        }
        
    </div>
  );
}

export default Sidebar;
