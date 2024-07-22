import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import BottomNav from './components/BottomNav/BottomNav';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// 웹 앱 매니페스트 링크 추가
const link = document.createElement('link');
link.rel = 'manifest';
link.href = `${process.env.PUBLIC_URL}/manifest.json`;
document.head.appendChild(link);

reportWebVitals();