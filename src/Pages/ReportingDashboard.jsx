
import React from 'react';
import CommunicationFrequencyReport from '../components/Report/CommunicationFrequencyReport';
import EngagementEffectivenessDashboard from '../components/Report/EngagementEffectivenessDashboard';
import OverdueCommunicationTrends from '../components/Report/OverdueCommunicationTrends';
import DownloadableReports from '../components/Report/DownloadableReports';
import RealTimeActivityLog from '../components/Report/RealtimeActivityLog';

const ReportingDashboard = ({ communications, activities }) => {
  return (
    <div className="reporting-dashboard min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-semibold mb-6">Reporting and Analytics</h2>
      
      <CommunicationFrequencyReport communications={communications} />
      <EngagementEffectivenessDashboard communications={communications} />
      <OverdueCommunicationTrends communications={communications} />
      <DownloadableReports />
      <RealTimeActivityLog activities={activities} />
    </div>
  );
};

export default ReportingDashboard;
