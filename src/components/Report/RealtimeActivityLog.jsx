import React, { useState, useEffect } from "react";

function RealTimeActivityLog() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    
    setTimeout(() => {
      setActivities([
        { id: 1, name: "Activity 1", timestamp: "2024-12-30 10:00:00" },
        { id: 2, name: "Activity 2", timestamp: "2024-12-30 11:00:00" },
      ]);
    }, 1000);
  }, []);

  
  const convertToCSV = (data) => {
    if (!data || data.length === 0) return "";
    const headers = Object.keys(data[0]).join(","); 
    const rows = data.map((row) => Object.values(row).join(",")); 
    return [headers, ...rows].join("\n");
  };

  
  const handleDownloadReport = () => {
    if (activities.length === 0) {
      alert("No activities to download!");
      return;
    }

    try {
      const csvData = convertToCSV(activities);
      const blob = new Blob([csvData], { type: "text/csv" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "activities_report.csv";
      link.click();

      
      URL.revokeObjectURL(url);
      alert("Report downloaded successfully!");
    } catch (error) {
      console.error("Error during download:", error);
      alert("Failed to download report. Please try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Real-Time Activity Log</h1>
      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="p-4 border rounded-lg shadow-sm bg-gray-50"
            >
              <p className="text-lg font-semibold">{activity.name}</p>
              <p className="text-sm text-gray-600">{activity.timestamp}</p>
            </div>
          ))
        ) : (
          <p className="text-lg text-gray-500">Loading activities...</p>
        )}
      </div>
      <button
        onClick={handleDownloadReport}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Download Report
      </button>
    </div>
  );
}

export default RealTimeActivityLog;
