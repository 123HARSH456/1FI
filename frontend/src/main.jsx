import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import DeviceFrame from './components/DeviceFrame/DeviceFrame';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DeviceFrame>
      <App />
    </DeviceFrame>
  </React.StrictMode>,
);
