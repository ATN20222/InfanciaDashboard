import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Sidebar from './Components/Nav/Sidebar';
import Header from './Components/Nav/Header';
import Home from './Pages/Home/Home';
import ManageClasses from './Pages/ManageClasses/ManageClasses';
import PaymentRequest from './Pages/PaymentRequest/PaymentRequest';
import PaymentHistory from './Pages/PaymentHistory/PaymentHistory';
import Employees from './Pages/Employees/Employees';
import Branches from './Pages/Branches/Branches';
import NewsLetter from './Pages/NewsLetter/NewsLetter';
import FAQ from './Pages/FAQ/FAQ';
import NurseryPolicy from './Pages/NurseryPolicy/NurseryPolicy';
import Meals from './Pages/Meals/Meals';
import ParentRequest from './Pages/ParentRequest/ParentRequest';
import AddTeacher from './Components/Employees/AddTeacher';
import Admins from './Pages/Admins/Admins';
import Roles from './Pages/Roles/Roles';
import AddKid from './Pages/Kids/AddKid';
import KidProfile from './Pages/Kids/KidProfile';
import NurseryProfile from './Pages/NurseryProfile/NurseryProfile';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <Router>
      <div className='App'>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`content ${sidebarOpen ? 'shifted ' : 'Shift'}`}>
          <Header/>
          
            <button className="toggle-button" onClick={toggleSidebar}>
              {sidebarOpen ? 'Close' : 'Open'} Sidebar
            </button>

            <Routes>
              <Route path='/Login' element={<Login />} />
              <Route path='/Register' element={<Register />} />
              <Route path='/' element={<Home />} />
              <Route path='/manageclasses' element={<ManageClasses />} />
              <Route path='/paymentrequest' element={<PaymentRequest />} />
              <Route path='/paymenthistory' element={<PaymentHistory />} />
              <Route path='/teachers' element={<Employees />} />
              <Route path='/addteacher' element={<AddTeacher />} />
              <Route path='/branches' element={<Branches />} />
              <Route path='/roles' element={<Roles />} />
              <Route path='/newsletter' element={<NewsLetter />} />
              <Route path='/faq' element={<FAQ />} />
              <Route path='/nurserypolicy' element={<NurseryPolicy />} />
              <Route path='/meals' element={<Meals />} />
              <Route path='/parentrequest' element={<ParentRequest />} />
              <Route path='/admins' element={<Admins />} />
              <Route path='/addkid' element={<AddKid />} />
              <Route path='/kidProfile' element={<KidProfile />} />
              <Route path='/NurseryProfile' element={<NurseryProfile />} />
              
            </Routes>
        </div>
        

            

          
        
      </div>
    </Router>
  );
}

export default App;
