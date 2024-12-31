
import React, { useState, useEffect } from 'react';
import CommunicationGrid from '../components/User/CommunicationGrid';
import CommunicationActionModal from '../components/User/CommunicationActionModal';
import Notifications from '../components/User/Notifications';
import CalendarView from '../components/User/CalendarView';

const UserDashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [overdueCommunications, setOverdueCommunications] = useState([]);
  const [dueTodayCommunications, setDueTodayCommunications] = useState([]);

  useEffect(() => {
    
    const fetchedCompanies = [
      {
        id: 1,
        name: 'Company A',
        communications: [
          { type: 'LinkedIn Post', date: '2023-12-25', notes: 'Initial outreach' },
          { type: 'Email', date: '2023-12-28', notes: 'Follow-up email sent' },
        ],
        nextCommunication: { type: 'LinkedIn Post', date: '2023-12-29' },
        highlight: 'dueToday', 
      },
      {
        id: 2,
        name: 'Company B',
        communications: [
          { type: 'Email', date: '2023-12-20', notes: 'Introduced the service' },
          { type: 'Phone Call', date: '2023-12-23', notes: 'Discussed pricing' },
        ],
        nextCommunication: { type: 'Phone Call', date: '2023-12-30' },
        highlight: 'overdue', 
      },
    ];
    setCompanies(fetchedCompanies);

    
    setOverdueCommunications(fetchedCompanies.filter(c => c.highlight === 'overdue'));
    setDueTodayCommunications(fetchedCompanies.filter(c => c.highlight === 'dueToday'));
  }, []);

  const handleCompanySelection = (company) => {
    setSelectedCompany(company);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedCompany(null);
  };

  const handleNewCommunication = (newCommunication) => {
    
    setCompanies((prevCompanies) => {
      const updatedCompanies = prevCompanies.map((company) => {
        if (company.id === newCommunication.companyId) {
          return {
            ...company,
            communications: [...company.communications, newCommunication],
            highlight: '', 
          };
        }
        return company;
      });
      return updatedCompanies;
    });

    
    setOverdueCommunications(companies.filter(c => c.highlight === 'overdue'));
    setDueTodayCommunications(companies.filter(c => c.highlight === 'dueToday'));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">User Dashboard</h1>
      
      
      <Notifications overdue={overdueCommunications} dueToday={dueTodayCommunications} />

      
      <CommunicationGrid companies={companies} onSelectCompany={handleCompanySelection} />

      
      <CalendarView communications={companies} onNewCommunication={handleNewCommunication} />

      
      <CommunicationActionModal
        isOpen={showModal}
        onClose={handleModalClose}
        onSubmit={handleNewCommunication}
        company={selectedCompany}
      />
    </div>
  );
};

export default UserDashboard;
