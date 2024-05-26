import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Find the root element
const container = document.getElementById('root');

// Create a root
const root = createRoot(container);

// Initial render: Render the app in the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
