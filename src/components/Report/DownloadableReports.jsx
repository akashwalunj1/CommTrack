import React from "react";
import { jsPDF } from "jspdf";

function DownloadableReports() {
  const sampleData = [
    { id: 1, name: "Activity 1", timestamp: "2024-12-30 10:00:00" },
    { id: 2, name: "Activity 2", timestamp: "2024-12-30 11:00:00" },
    { id: 3, name: "Activity 3", timestamp: "2024-12-30 12:00:00" },
  ];

  const generatePDF = () => {
    const doc = new jsPDF();

    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Activities Report", 10, 20);

    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const headers = ["ID", "Name", "Timestamp"];
    let yPosition = 40;

    headers.forEach((header, index) => {
      doc.text(header, 10 + index * 50, yPosition);
    });

    
    yPosition += 10;
    sampleData.forEach((row) => {
      doc.text(String(row.id), 10, yPosition);
      doc.text(row.name, 60, yPosition);
      doc.text(row.timestamp, 110, yPosition);
      yPosition += 10;
    });


    doc.save("activities_report.pdf");
    alert("PDF downloaded successfully!");
  };

  return (
    <div className="max-w-7xl mx-auto mb-6 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Downloadable Reports</h1>
      <button
        onClick={generatePDF}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Download PDF
      </button>
    </div>
  );
}

export default DownloadableReports;
