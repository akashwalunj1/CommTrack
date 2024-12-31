import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';
import PropTypes from 'prop-types';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

const OverdueCommunicationTrends = ({ communications = [] }) => {
  const overdueData = communications.filter((comm) => comm.status === 'overdue');

  const trendData = overdueData.reduce((acc, communication) => {
    const date = new Date(communication.date).toISOString().split('T')[0]; 
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  if (Object.keys(trendData).length === 0) {
    return (
      <div className="flex justify-center items-center text-lg text-gray-500 p-6">
        No overdue communications found.
      </div>
    );
  }

  const chartData = {
    labels: Object.keys(trendData),
    datasets: [
      {
        label: 'Overdue Communications',
        data: Object.values(trendData),
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="trend-container max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Overdue Communication Trends</h3>
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
        <Line data={chartData} />
      </div>
    </div>
  );
};

OverdueCommunicationTrends.propTypes = {
  communications: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ),
};

export default OverdueCommunicationTrends;
