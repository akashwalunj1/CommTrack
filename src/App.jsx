import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Shared/Navbar';
import Footer from './components/Shared/Footer';
import AdminDashboard from './Pages/AdminDashboard';
import UserDashboard from './Pages/UserDashboard';
import ReportingDashboard from './Pages/ReportingDashboard';  

const App = () => {
  const [userRole, setUserRole] = useState(() => {
    const savedRole = localStorage.getItem('userRole');
    return savedRole ? savedRole : 'admin';
  });

  useEffect(() => {
    localStorage.setItem('userRole', userRole);
  }, [userRole]);

  const toggleUserRole = () => {
    setUserRole((prevRole) => (prevRole === 'admin' ? 'user' : 'admin'));
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar userRole={userRole} />
        
        {/* Button to Switch Role */}
        <button
          onClick={toggleUserRole}
          className="text-white bg-blue-500 p-2 m-4 rounded"
        >
          Switch Role (Current: {userRole})
        </button>

        <div className="flex-grow">
          <Routes>
            {/* Only show admin dashboard if userRole is admin */}
            {userRole === 'admin' && <Route path="/admin" element={<AdminDashboard />} />}
            
            {/* Only show user dashboard if userRole is user */}
            {userRole === 'user' && <Route path="/user" element={<UserDashboard />} />}
            
            {/* Reporting Dashboard route */}
            <Route path="/reporting" element={<ReportingDashboard />} />
            
            {/* Redirect to the appropriate dashboard */}
            <Route path="/" element={<Navigate to={`/${userRole}`} />} />
            
            {/* Redirect if no route matches */}
            <Route path="*" element={<Navigate to={`/${userRole}`} />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
