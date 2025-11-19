import React from 'react';
import { LeafIcon } from './IconComponents';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-sm w-full text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-400 mb-4">
          <LeafIcon className="h-10 w-10 text-gray-900" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
        <p className="text-gray-300 mb-6">
          Thank you for your booking. We look forward to seeing you!
        </p>
        <button onClick={onClose} className="w-full bg-yellow-400 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 transition duration-300">
          Done
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
