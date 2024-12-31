import React, { useState } from 'react';
import Table from './Table';
import Modal from './Modal';

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: 'TechCorp',
      location: 'San Francisco, CA',
      linkedInProfile: 'https://linkedin.com/company/techcorp',
      emails: ['contact@techcorp.com'],
      phoneNumbers: ['123-456-7890'],
      comments: 'Leading tech solutions provider.',
      communicationPeriodicity: 'Every 2 weeks',
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  
  const handleAddEditCompany = (company) => {
    if (!company.name || !company.location || !company.communicationPeriodicity) {
      alert('Please fill in all required fields.');
      return;
    }

    const parsedCompany = {
      ...company,
      emails: company.emails.split(',').map((email) => email.trim()),
      phoneNumbers: company.phoneNumbers.split(',').map((phone) => phone.trim()),
    };

    if (selectedCompany) {
      
      setCompanies((prev) =>
        prev.map((item) =>
          item.id === selectedCompany.id ? { ...selectedCompany, ...parsedCompany } : item
        )
      );
    } else {
      
      setCompanies((prev) => [...prev, { ...parsedCompany, id: Date.now() }]);
    }

    setIsModalOpen(false);
    setSelectedCompany(null);
  };

  
  const handleAddCompany = () => {
    setSelectedCompany(null);
    setIsModalOpen(true);
  };

  
  const handleEditCompany = (company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  
  const handleDeleteCompany = (id) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      setCompanies((prev) => prev.filter((company) => company.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Company Management</h2>
        <button
          onClick={handleAddCompany}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Company
        </button>
      </div>

      
      <Table
        data={companies}
        onEdit={handleEditCompany}
        onDelete={handleDeleteCompany}
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'location', label: 'Location' },
          {
            key: 'linkedInProfile',
            label: 'LinkedIn Profile',
            render: (profile) => (
              <a
                href={profile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Profile
              </a>
            ),
          },
          {
            key: 'emails',
            label: 'Emails',
            render: (emails) => emails.join(', '), 
          },
          {
            key: 'phoneNumbers',
            label: 'Phone Numbers',
            render: (phones) => phones.join(', '), 
          },
          { key: 'comments', label: 'Comments' },
          {
            key: 'communicationPeriodicity',
            label: 'Communication Periodicity',
          },
          {
            key: 'actions',
            label: 'Actions',
            render: (_, item) => (
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditCompany(item)}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCompany(item.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ),
          },
        ]}
      />

      
      {isModalOpen && (
        <Modal
          title={selectedCompany ? 'Edit Company' : 'Add Company'}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddEditCompany}
          initialData={selectedCompany}
          fields={[
            { label: 'Name', name: 'name', type: 'text', required: true },
            { label: 'Location', name: 'location', type: 'text', required: true },
            {
              label: 'LinkedIn Profile',
              name: 'linkedInProfile',
              type: 'url',
              required: false,
            },
            {
              label: 'Emails',
              name: 'emails',
              type: 'textarea',
              placeholder: 'Enter emails separated by commas',
              required: true,
            },
            {
              label: 'Phone Numbers',
              name: 'phoneNumbers',
              type: 'textarea',
              placeholder: 'Enter phone numbers separated by commas',
              required: true,
            },
            { label: 'Comments', name: 'comments', type: 'textarea', required: false },
            {
              label: 'Communication Periodicity',
              name: 'communicationPeriodicity',
              type: 'text',
              placeholder: 'e.g., every 2 weeks',
              required: true,
            },
          ]}
        />
      )}
    </div>
  );
};

export default CompanyManagement;
