
import React from 'react';
import Tooltip from '../Shared/Tooltip';  

const CommunicationTable = ({ companies }) => {
  const renderCommunication = (communications) => {
    return communications.map((comm, idx) => (
      <div key={idx} className="flex space-x-4">
        <div>{comm.type}</div>
        <div>{comm.date}</div>
      </div>
    ));
  };

  return (
    <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th className="p-2">Company Name</th>
            <th className="p-2">Last 5 Communications</th>
            <th className="p-2">Next Scheduled Communication</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr
              key={company.id}
              className={`${
                company.highlight === 'overdue' ? 'bg-red-200' : 
                company.highlight === 'dueToday' ? 'bg-yellow-200' : ''
              }`}
            >
              <td className="p-2">{company.name}</td>
              <td className="p-2">
                {renderCommunication(company.communications)}
              </td>
              <td className="p-2">{company.nextCommunication}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommunicationTable;
