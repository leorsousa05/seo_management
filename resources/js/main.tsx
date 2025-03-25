import { App } from './App';
import ReactDOM from "react-dom/client";
import "../css/app.css";
import React from 'react';
import { AuthProvider } from './shared/contexts/AuthContext';
import { WebsiteProvider } from './shared/contexts/WebsiteContext';
import { BlogTextProvider } from './shared/contexts/BlogTextContext';
import { BlogCategoriesProvider } from './shared/contexts/BlogCategoriesContext';

const container = document.getElementById('root');

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
      <React.StrictMode>
        <AuthProvider>
            <WebsiteProvider>
                <BlogTextProvider>
                    <BlogCategoriesProvider>
                        <App />
                    </BlogCategoriesProvider>
                </BlogTextProvider>
            </WebsiteProvider>
            </AuthProvider>
      </React.StrictMode>
  );
} else {
  console.error("Elemento com id 'root' não foi encontrado.");
}

