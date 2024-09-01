import React, { useState } from 'react';
import Sidebar from './Components/Nav/Sidebar';
import Header from './Components/Nav/Header';
import ConfirmLogoutModal from './Components/Nav/ConfirmLogoutModal';
import { AuthService } from './Service/Api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const MainLayout = ({ sidebarOpen, toggleSidebar, children }) => {
  const [isConfirmOverlayOpen , setIsConfirmOverlayOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = async () => {
      
      try {
        const userData = await AuthService.Logout();
        logout();
        window.location.href='/login'
        // navigate('/login'); 
      } catch (error) {
        console.error(error.message);
      }
    };
  return (
    <div className='App'>

      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar}
        openConfirmLogoutModal={() => setIsConfirmOverlayOpen(true)}

      />
      <ConfirmLogoutModal
                isOpen={isConfirmOverlayOpen}
                onClose={() => setIsConfirmOverlayOpen(false)}
                onConfirm={handleLogout}
            />
      <div className={`content ${sidebarOpen ? 'shifted ' : 'Shift'}`}>
        <Header />
        <button className="toggle-button" onClick={toggleSidebar}>
          {sidebarOpen ? 
          '':<FontAwesomeIcon icon={faBars}/>
        } 
        </button>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
