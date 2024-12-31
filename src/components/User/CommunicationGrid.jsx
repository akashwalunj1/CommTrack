import React from 'react';
import Tooltip from '../Shared/Tooltip'; 

const CommunicationGrid = ({ companies, onSelectCompany }) => {
  const renderCommunication = (communications) => {
    return communications.map((comm, idx) => (
      <div key={idx} className="flex space-x-4">
        <div>{comm.type}</div>
        <div>{comm.date}</div>
      </div>
    ));
  };

  const handlePerformCommunication = (company) => {
    if (!company.nextCommunication || !company.nextCommunication.date) {
      console.error("Company's next communication is undefined or invalid");
      return;
    }

    const nextCommunication = {
      ...company.nextCommunication,
      date: new Date(company.nextCommunication.date).toISOString(),
    };

    
    onSelectCompany({ ...company, nextCommunication });
  };

  return (
    <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th className="p-2">Company Name</th>
            <th className="p-2">Last 5 Communications</th>
            <th className="p-2">Next Scheduled Communication</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr
              key={company.id}
              className={`${
                company.highlight === 'overdue'
                  ? 'bg-red-200'
                  : company.highlight === 'dueToday'
                  ? 'bg-yellow-200'
                  : ''
              }`}
            >
              <td className="p-2">{company.name}</td>
              <td className="p-2">
                {renderCommunication(company.communications.slice(0, 5))}
              </td>
              <td className="p-2">
                {company.nextCommunication?.type
                  ? `${company.nextCommunication.type} - ${company.nextCommunication.date}`
                  : 'Not Scheduled'}
              </td>
              <td className="p-2">
                <button
                  onClick={() => handlePerformCommunication(company)}
                  className="bg-blue-600 text-white p-2 rounded"
                >
                  Perform Communication
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommunicationGrid;
