import React from 'react';
import Sidebar from './Components/Nav/Sidebar';
import Header from './Components/Nav/Header';

const MainLayout = ({ sidebarOpen, toggleSidebar, children }) => {
  return (
    <div className='App'>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`content ${sidebarOpen ? 'shifted ' : 'Shift'}`}>
        <Header />
        <button className="toggle-button" onClick={toggleSidebar}>
          {sidebarOpen ? 'Close' : 'Open'} Sidebar
        </button>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
