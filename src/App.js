import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import MainLayout from './MainLayout';  // Import the MainLayout component

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
import WriteEmail from './Pages/ForgetPassword/WriteEmail';
import PasswordReset from './Pages/ForgetPassword/PasswordReset';
import NewPassword from './Pages/ForgetPassword/NewPassword';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
 
  return (
    <Router>
      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route path='/ForgetPassword' element={<WriteEmail />} />
        <Route path='/Otp' element={<PasswordReset />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/PasswordReset' element={<NewPassword />} />
        <Route path='/' element={
          <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
            <Home />
          </MainLayout>
        } />
         <Route path='/Home' element={
          <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
            <Home />
          </MainLayout>
        } />
        <Route path='/manageclasses' element={
          <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
            <ManageClasses />
          </MainLayout>
        } />
        <Route path='/paymentrequest' element={
          <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
            <PaymentRequest />
          </MainLayout>
        } />
        <Route path='/paymenthistory' element={
          <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
            <PaymentHistory />
          </MainLayout>
        } />
        <Route path='/teachers' element={
          <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
            <Employees />
          </MainLayout>
        } />
        <Route path='/addteacher' element={
          <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
            <AddTeacher />
          </MainLayout>
        } />
        <Route path='/branches' element={
          <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
            <Branches />
          </MainLayout>
        } />
        <Route path='/roles' element={
          <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
            <Roles />
          </MainLayout>
        } />
        <Route path='/newsletter' element={
          <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
            <NewsLetter />
          </MainLayout>
        } />
        <Route path='/faq' element={
          <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
            <FAQ />
          </MainLayout>
        } />
        <Route path='/nurserypolicy' element={
          <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
            <NurseryPolicy />
          </MainLayout>
        } />
        <Route path='/meals' element={
          <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
            <Meals />
          </MainLayout>
        } />
        <Route path='/parentrequest' element={
          <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
            <ParentRequest />
          </MainLayout>
        } />
        <Route path='/admins' element={
          <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
            <Admins />
          </MainLayout>
        } />
        <Route path='/addkid' element={
          <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
            <AddKid />
          </MainLayout>
        } />
        <Route path='/kidProfile' element={
          <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
            <KidProfile />
          </MainLayout>
        } />
        <Route path='/NurseryProfile' element={
          <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
            <NurseryProfile />
          </MainLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
