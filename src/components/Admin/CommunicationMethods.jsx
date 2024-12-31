import React, { useState, useEffect } from 'react';
import Table from './Table';
import Modal from './Modal';

const CommunicationMethods = () => {
  const defaultMethods = [
    { id: 1, name: 'LinkedIn Post', description: 'Post on LinkedIn', sequence: 1, mandatory: true },
    { id: 2, name: 'LinkedIn Message', description: 'Send LinkedIn message', sequence: 2, mandatory: true },
    { id: 3, name: 'Email', description: 'Send Email', sequence: 3, mandatory: false },
  ];

  const [communicationMethods, setCommunicationMethods] = useState(defaultMethods);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMethod, setCurrentMethod] = useState(null);

  const handleAddEditMethod = (method) => {
    if (method.id) {
      setCommunicationMethods((prev) =>
        prev.map((item) => (item.id === method.id ? { ...item, ...method } : item))
      );
    } else {
      setCommunicationMethods((prev) => [...prev, { ...method, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteMethod = (id) => {
    setCommunicationMethods((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-4'>
      <h2 className="text-xl font-semibold text-gray-800">Communication Methods</h2>
      <button onClick={() => setIsModalOpen(true)} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>Add New Method</button></div>
      <Table
        data={communicationMethods}
        columns={[
          { key: 'name', label: 'Method Name' },
          { key: 'description', label: 'Description' },
          { key: 'sequence', label: 'Sequence' },
          { key: 'mandatory', label: 'Mandatory', render: (value) => (value ? 'Yes' : 'No') },
        ]}
        onEdit={(item) => {
          setCurrentMethod(item);
          setIsModalOpen(true);
        }}
        onDelete={(id) => handleDeleteMethod(id)}
      />
      {isModalOpen && (
        <Modal
          title={currentMethod ? 'Edit Method' : 'Add Method'}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddEditMethod}
          initialData={currentMethod}
          fields={[
            { label: 'Name', name: 'name', type: 'text', required: true },
            { label: 'Description', name: 'description', type: 'text', required: true },
            { label: 'Sequence', name: 'sequence', type: 'number', required: true },
            { label: 'Mandatory', name: 'mandatory', type: 'checkbox' },
          ]}
        />
      )}
    </div>
  );
};

export default CommunicationMethods;
