import React, { useState } from 'react';
import Calendar from 'react-calendar';
import CommunicationActionModal from './CommunicationActionModal';

const CalendarView = ({ communications, onNewCommunication, onEditCommunication, onDeleteCommunication }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState([]); // Communications for the selected date

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const communicationsForDate = communications.filter(
      (communication) => new Date(communication.date).toDateString() === date.toDateString()
    );
    setModalData(communicationsForDate);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalData([]);
  };

  const handleSubmitCommunication = (newCommunication) => {
    onNewCommunication(newCommunication);
    handleCloseModal();
  };

  const handleEditCommunication = (updatedCommunication) => {
    onEditCommunication(updatedCommunication);
    handleCloseModal();
  };

  const handleDeleteCommunication = (communicationId) => {
    onDeleteCommunication(communicationId);
    handleCloseModal();
  };

  return (
    <div className="calendar-container max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Calendar View</h2>
      <div className="relative">
        <Calendar
          onClickDay={handleDateClick}
          tileClassName={({ date }) => {
            const isPast = date < new Date();
            const hasCommunication = communications.some((communication) => {
              return new Date(communication.date).toDateString() === date.toDateString();
            });
            return hasCommunication
              ? isPast
                ? 'bg-gray-200 border-gray-400 text-gray-800'
                : 'bg-blue-200 border-blue-500 text-blue-800'
              : '';
          }}
          tileContent={({ date }) => {
            const communicationsForDate = communications.filter(
              (communication) => new Date(communication.date).toDateString() === date.toDateString()
            );
            return communicationsForDate.length > 0 ? (
              <div className="text-xs font-medium text-center text-blue-600">
                {communicationsForDate.length}
              </div>
            ) : null;
          }}
        />
        {showModal && (
          <CommunicationActionModal
            isOpen={showModal}
            onClose={handleCloseModal}
            onSubmit={handleSubmitCommunication}
            onEdit={handleEditCommunication}
            onDelete={handleDeleteCommunication}
            selectedDate={selectedDate}
            modalData={modalData}
          />
        )}
      </div>
    </div>
  );
};

export default CalendarView;
