import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import PropTypes from 'prop-types';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const CommunicationFrequencyReport = ({ communications = [] }) => {
  const [filters, setFilters] = useState({
    company: '',
    dateRange: { start: '', end: '' },
    communicationMethod: '',
  });

  const filterCommunications = () => {
    return communications.filter((communication) => {
      return (
        (!filters.company || communication.company === filters.company) &&
        (!filters.communicationMethod || communication.type === filters.communicationMethod) &&
        (!filters.dateRange.start || new Date(communication.date) >= new Date(filters.dateRange.start)) &&
        (!filters.dateRange.end || new Date(communication.date) <= new Date(filters.dateRange.end))
      );
    });
  };

  const frequencyData = filterCommunications().reduce((acc, communication) => {
    const type = communication.type;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(frequencyData),
    datasets: [
      {
        label: 'Communication Frequency',
        data: Object.values(frequencyData),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="report-container max-w-7xl mx-auto mb-6 p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-3xl font-bold text-gray-800 mb-6">Communication Frequency Report</h3>
      <Bar data={chartData} />
      
    </div>
  );
};

CommunicationFrequencyReport.propTypes = {
  communications: PropTypes.arrayOf(
    PropTypes.shape({
      company: PropTypes.string,
      type: PropTypes.string,
      date: PropTypes.string,
    })
  ),
};

export default CommunicationFrequencyReport;
