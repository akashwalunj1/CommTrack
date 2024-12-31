import React from 'react';

const Notifications = ({ overdue, dueToday }) => {
  const totalNotifications = overdue.length + dueToday.length;

  return (
    <div>
      
      <div className="relative inline-block mb-6">
  <button
    className="relative flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-blue-500 text-white focus:outline-none hover:bg-blue-600 transition-colors"
    aria-label="View Notifications"
  >
    <span className="material-icons text-lg">Notifications</span>
    
    {totalNotifications > 0 && (
      <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full shadow-md">
        {totalNotifications}
      </span>
    )}
  </button>
</div>



      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Notifications</h3>
        
        
        <div className="mb-4">
          <h4 className="font-semibold text-red-600">Overdue Communications:</h4>
          <ul>
            {overdue.length > 0 ? (
              overdue.map((item, index) => (
                <li key={index} className="text-sm text-gray-800">
                  <strong>{item.name}</strong> - {item.method} (Due: {new Date(item.date).toLocaleDateString()})
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-500">No overdue communications</li>
            )}
          </ul>
        </div>

        
        <div>
          <h4 className="font-semibold text-green-600">Communications Due Today:</h4>
          <ul>
            {dueToday.length > 0 ? (
              dueToday.map((item, index) => (
                <li key={index} className="text-sm text-gray-800">
                  <strong>{item.name}</strong> - {item.method} (Due: {new Date(item.date).toLocaleTimeString()})
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-500">No communications due today</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
