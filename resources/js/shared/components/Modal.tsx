// src/components/shared/Modal.tsx
import React from 'react';
import { Icon } from '@iconify/react';

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded shadow-lg z-10 w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <Icon icon="mdi:close" className="w-6 h-6" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;

