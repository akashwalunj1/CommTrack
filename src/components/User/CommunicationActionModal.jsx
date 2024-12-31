import React, { useState, useEffect } from 'react';

const CommunicationActionModal = ({ isOpen, onClose, onSubmit, selectedDate, modalData }) => {
  const [type, setType] = useState('');
  const [date, setDate] = useState(selectedDate || new Date());
  const [notes, setNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setDate(selectedDate || new Date()); 
  }, [selectedDate]);

  const handleSubmit = () => {
    if (type && date && notes) {
      const newCommunication = {
        type,
        date: date.toISOString().split('T')[0], 
        notes,
        companyId: modalData?.id || null, 
      };
      onSubmit(newCommunication); 
      onClose(); 
    } else {
      setErrorMessage('Please fill all fields before submitting.');
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-96 relative">
          <h3 className="text-xl font-semibold mb-4">Log New Communication</h3>
          {errorMessage && (
            <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
              {errorMessage}
            </div>
          )}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Type of Communication:</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Communication Type</option>
              <option value="LinkedIn Post">LinkedIn Post</option>
              <option value="Email">Email</option>
              <option value="Phone Call">Phone Call</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Date of Communication:</label>
            <input
              type="date"
              value={date.toISOString().split('T')[0]} 
              onChange={(e) => setDate(new Date(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Notes:</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 border rounded"
              rows="3"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
            <button
              onClick={onClose}
              className="bg-gray-400 text-white p-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default CommunicationActionModal;
