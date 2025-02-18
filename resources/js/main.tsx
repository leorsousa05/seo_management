import { App } from './App';
import ReactDOM from "react-dom/client";
import "../css/app.css";
import React from 'react';
import { AuthProvider } from './shared/contexts/AuthContext';

const container = document.getElementById('root');

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
      <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
      </React.StrictMode>
  );
} else {
  console.error("Elemento com id 'root' não foi encontrado.");
}

