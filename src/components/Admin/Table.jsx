import React from 'react';

const Table = ({ data = [], columns, onEdit, onDelete }) => {
  
  if (!Array.isArray(data)) {
    console.error('Expected data to be an array, but got:', data);
    return null;  
  }

  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key} className="border border-gray-300 px-4 py-2 text-left">
              {col.label}
            </th>
          ))}
          <th className="border border-gray-300 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length + 1} className="text-center py-2">No data available</td>
          </tr>
        ) : (
          data.map((item) => (
            <tr key={item.id}>
              {columns.map((col) => (
                <td key={col.key} className="border border-gray-300 px-4 py-2">
                  {item[col.key]}
                </td>
              ))}
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => onEdit(item)}
                  className="text-blue-500 hover:underline mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
