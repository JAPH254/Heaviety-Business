import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-full">
        <div className="p-4">
          {children}
          <button
            onClick={onClose}
            className="mt-4 w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
