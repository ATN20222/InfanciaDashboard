import React from 'react';
import './Sidebar.css';
import SideBarImage from '../../Assets/images/INFANCIA_LOGO.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faCashRegister, faChalkboard, faChildren, faComments, faCreditCard, faCreditCardAlt, faFileCircleCheck, faHandPointer, faHandPointUp, faHome, faNewspaper, faRightFromBracket, faUserGroup, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={toggleSidebar}>×</button>
      <div className="SideBarImage Center">
        <div className="SideImage Center">
            <img src={SideBarImage} width="80%" alt="" />
        </div>
      </div>
      <div className="SideBarHr"/>

      <ul>
        <li>
            <Link to="/" className='nav-link'>
                <FontAwesomeIcon icon={faHome}/> 
                Home
            </Link>
           
        </li>
        <li>
            <FontAwesomeIcon icon={faUserGroup}/>
            Nursery Profile</li>
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

            <Link to="/faq" className='nav-link'>
                <FontAwesomeIcon icon={faComments}/>
                FAQ
            </Link>
           
        </li>
       
        
        <li>
            <FontAwesomeIcon icon={faRightFromBracket}/>

            Logout
            
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;
