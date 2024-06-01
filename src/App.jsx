import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from "./components/Main/Main";
import Sidebar from "./components/Sidebar/Sidebar";
import Settings from './components/Routes/Settings';
import Activity from './components/Routes/Activity';
import Help from './components/Routes/Help';
import './index.css'; 

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
