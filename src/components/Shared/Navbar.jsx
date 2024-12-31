import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ userRole }) => {
  const location = useLocation(); 

  return (
    <nav className="bg-blue-600 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <Link to="/" className="text-black text-2xl font-bold">
          CommTrack
        </Link>

        
        <div className="space-x-6">
          
          <Link
            to="/admin"
            className={`text-white hover:text-gray-300 ${
              location.pathname === '/admin' ? 'font-semibold text-yellow-400' : ''
            }`}
          >
            Admin
          </Link>
          

          <Link
            to="/user"
            className={`text-white hover:text-gray-300 ${
              location.pathname === '/user' ? 'font-semibold text-yellow-400' : ''
            }`}
          >
            User
          </Link>

          
          <Link
            to="/reporting"
            className={`text-white hover:text-gray-300 ${
              location.pathname === '/reporting' ? 'font-semibold text-yellow-400' : ''
            }`}
          >
            Reporting
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
