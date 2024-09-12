import React, { useEffect, useState } from 'react';
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
import { AuthProvider } from './Context/AuthContext';
import PrivateRoute from './Context/PrivateRoute';
import { getIsSuperAdmin } from './Service/AxiosApi';
import HomeSuper from './Pages/Home/HomeSuper';
import Nurseries from './Pages/Nurseries/Nurseries';
import NurseryForm from './Pages/Nurseries/NurseryForm';
import NurseryDetails from './Pages/Nurseries/NurseryDetails';
import Applications from './Pages/Nurseries/Applications';
import PrivacyPolicy from './Pages/Policies/PrivacyPolicy';
// import PaymentSuccess from './Pages/CallBack/PaymentSuccess';
import Payment from './Pages/CallBack/Payment';
import FakeForm from './Pages/Register/FakeForm';
import Pay from './Pages/Pay/Pay';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSuperAdmin , setIsSuperAdmin] = useState(getIsSuperAdmin());
  useEffect(()=>{
    setIsSuperAdmin(getIsSuperAdmin())

  },[])
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/ForgetPassword' element={<WriteEmail />} />
          <Route path='/Otp' element={<PasswordReset />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/PasswordReset' element={<NewPassword />} />
          <Route path='/PrivacyPolicy' element={<PrivacyPolicy />} />
          <Route path='/Payment' element={<Payment />} />
          <Route path='/subscription' element={<Pay />} />
          
          <Route path='/' element={
            <PrivateRoute>
              <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                {
                  !isSuperAdmin?<Home />:
                  <HomeSuper />
                }
                
              </MainLayout>
            </PrivateRoute>
          } />
          <Route path='/Home' element={
            <PrivateRoute>
              <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
              {
                  
                  !isSuperAdmin?<Home />:
                  <HomeSuper />
                }
              </MainLayout>
            </PrivateRoute>
          } />
          <Route path='/Nurseries' element={
            <PrivateRoute>
              <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                <Nurseries />
              </MainLayout>
            </PrivateRoute>
          } />
          <Route path='/fakeregister' element={
            <PrivateRoute>
              <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                <FakeForm />
              </MainLayout>
            </PrivateRoute>
          } />

          <Route path='/Applications' element={
            <PrivateRoute>
              <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                <Applications />
              </MainLayout>
            </PrivateRoute>
          } />
          <Route path='/Applications/:id' element={
            <PrivateRoute>
              <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                <NurseryForm />
              </MainLayout>
            </PrivateRoute>
          } />

          <Route path='/Nurseries/:id' element={
            <PrivateRoute>
              <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                <NurseryDetails />
              </MainLayout>
            </PrivateRoute>
          } />
          <Route path='/manageclasses' element={
            <PrivateRoute>
              <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                <ManageClasses />
              </MainLayout>
            </PrivateRoute>
          } />

          <Route path='/paymentrequest' element={
            <PrivateRoute>
              <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                <PaymentRequest />
              </MainLayout>
            </PrivateRoute>
          } />
          <Route path='/paymenthistory' element={
            <PrivateRoute>
              <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                <PaymentHistory />
              </MainLayout>
            </PrivateRoute>
          } />
          <Route path='/teachers' element={
            <PrivateRoute>
              <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                <Employees />
              </MainLayout>
            </PrivateRoute>
          } />
          <Route path='/addteacher' element={
            <PrivateRoute>
              <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                <AddTeacher />
              </MainLayout>
            </PrivateRoute>
          } />
          <Route path='/branches' element={
            <PrivateRoute>
              <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                <Branches />
              </MainLayout>
            </PrivateRoute>
          } />
          <Route path='/roles' element={
            <PrivateRoute>
              <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                <Roles />
              </MainLayout>
            </PrivateRoute>
          } />
          <Route path='/newsletter' element={
            <PrivateRoute>
              <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                <NewsLetter />
              </MainLayout>
            </PrivateRoute>
          } />
          <Route path='/faq' element={
            <PrivateRoute>
              <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                <FAQ />
              </MainLayout>
            </PrivateRoute>
          } />
          <Route path='/nurserypolicy' element={
            <PrivateRoute>
              <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                <NurseryPolicy />
              </MainLayout>
            </PrivateRoute>
          } />
          <Route path='/meals' element={
            <PrivateRoute>
              <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                <Meals />
              </MainLayout>
            </PrivateRoute>
          } />
          <Route path='/parentrequest' element={
            <PrivateRoute>
              <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                <ParentRequest />
              </MainLayout>
            </PrivateRoute>
          } />
          <Route path='/admins' element={
            <PrivateRoute>
              <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                <Admins />
              </MainLayout>
            </PrivateRoute>
          } />
          <Route path='/addkid' element={
            <PrivateRoute>
              <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                <AddKid />
              </MainLayout>
            </PrivateRoute>
          } />
          <Route path='/kidProfile' element={
            <PrivateRoute>
              <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                <KidProfile />
              </MainLayout>
            </PrivateRoute>
          } />
          <Route path='/NurseryProfile' element={
            <PrivateRoute>
              <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                <NurseryProfile />
              </MainLayout>
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
