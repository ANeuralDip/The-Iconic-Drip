import React from 'react';
// Note the change to /client below
import ReactDOM from 'react-dom/client'; 
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from "react-router-dom";

// 1. Target the 'root' div from your index.html
const container = document.getElementById('root');

// 2. Create the React 19 root
const root = ReactDOM.createRoot(container);

// 3. Render your app
root.render(
  <React.StrictMode>
    <Router>
        <App />
    </Router>
  </React.StrictMode>
);