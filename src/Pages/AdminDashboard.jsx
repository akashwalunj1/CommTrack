import React, { useState } from 'react';
import CompanyManagement from '../components/Admin/CompanyManagement';
import CommunicationMethods from '../components/Admin/CommunicationMethods';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('company'); 

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      
      <div className="max-w-screen-2xl mx-auto bg-white shadow-lg rounded-md">
        <header className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
        </header>
        <div className="p-4">

          <div className="flex space-x-4 border-b border-gray-200 mb-4">
            <button
              onClick={() => setActiveTab('company')}
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === 'company'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              Company Management
            </button>
            <button
              onClick={() => setActiveTab('communication')}
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === 'communication'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              Communication Method Management
            </button>
          </div>

          
          <div>
            {activeTab === 'company' && <CompanyManagement />}
            {activeTab === 'communication' && <CommunicationMethods />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
