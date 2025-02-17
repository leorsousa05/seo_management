// src/components/shared/Snackbar.tsx
import React from 'react';
import { Icon } from '@iconify/react';

interface SnackbarProps {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
  onClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ open, message, severity, onClose }) => {
  if (!open) return null;

  const bgColor = severity === 'success' ? 'green' : 'red';

  return (
    <div className={`fixed bottom-4 right-4 bg-${bgColor}-500 text-white px-4 py-2 rounded shadow`}>
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4">
          <Icon icon="mdi:close" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Snackbar;

