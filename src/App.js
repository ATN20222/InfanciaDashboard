import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Ensure App.css is properly located

import Login from './Pages/Login/Login';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/' element={<Login />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
