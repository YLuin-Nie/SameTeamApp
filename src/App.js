import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfileSetup from './components/ProfileSetup';
import ParentDashboard from './components/ParentDashboard';
import ChildDashboard from './components/ChildDashboard';

function App() {
    const [darkMode, setDarkMode] = useState(false); // Track dark mode

    // Toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode', !darkMode); // Add/remove dark mode class
    };

    return (
        <Router>
            <div className="App">
                <button onClick={toggleDarkMode}>
                    {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                </button>
                
                <Routes>
                    <Route path="/" element={<ProfileSetup />} />
                    <Route path="/parent-dashboard" element={<ParentDashboard />} />
                    <Route path="/child-dashboard" element={<ChildDashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
