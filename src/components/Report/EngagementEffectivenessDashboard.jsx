import React, { useState } from 'react';
import PropTypes from 'prop-types';

const EngagementEffectivenessDashboard = ({ communications = [] }) => {
  const [showDetails, setShowDetails] = useState(false);

  const successfulResponses = communications.filter((comm) => comm.status === 'successful');
  const totalCommunications = communications.length;
  const successRate = totalCommunications > 0 ? (successfulResponses.length / totalCommunications) * 100 : 0;

  const handleViewDetails = () => {
    setShowDetails(!showDetails);
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  return (
    <div className="dashboard-container max-w-7xl mx-auto p-10 mb-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Engagement Effectiveness</h2>
      <div className="metric-card bg-gray-100 p-4 rounded-lg shadow-md mb-4">
        <h4 className="text-lg font-medium text-gray-700">Success Rate</h4>
        <p className="text-2xl font-semibold text-green-600">{successRate.toFixed(2)}%</p>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleViewDetails}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {showDetails ? 'Hide Details' : 'View Details'}
        </button>
        <button
          onClick={() => {
            const reportData = communications.map((comm) => ({
              id: comm.id,
              status: comm.status,
              date: comm.date,
              method: comm.method,
            }));

            const csvContent = [
              ['ID', 'Status', 'Date', 'Method'],
              ...reportData.map((row) => [row.id, row.status, formatDate(row.date), row.method]),
            ]
              .map((row) => row.join(','))
              .join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'engagement_report.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          Export Report
        </button>
      </div>

      {showDetails && (
        <div className="details-section mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Detailed Communications</h3>
          {communications.length > 0 ? (
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Method</th>
                </tr>
              </thead>
              <tbody>
                {communications.map((comm) => (
                  <tr key={comm.id} className="border-t">
                    <td className="px-4 py-2">{comm.id}</td>
                    <td className={`px-4 py-2 ${comm.status === 'successful' ? 'text-green-600' : 'text-red-600'}`}>
                      {comm.status}
                    </td>
                    <td className="px-4 py-2">{formatDate(comm.date)}</td>
                    <td className="px-4 py-2">{comm.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No communications data available.</p>
          )}
        </div>
      )}
    </div>
  );
};

EngagementEffectivenessDashboard.propTypes = {
  communications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      method: PropTypes.string.isRequired,
    })
  ),
};

export default EngagementEffectivenessDashboard;
