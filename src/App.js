import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import ProfileSetup from './components/ProfileSetup';
import ParentDashboard from './components/ParentDashboard';
import ChildDashboard from './components/ChildDashboard';

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode', !darkMode);
    };

    return (
        <Router>
            <div className="App">
                <button onClick={toggleDarkMode}>
                    {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                </button>
                
                <Routes>
                    <Route path="/" element={<SignUp />} /> {/* Start with SignUp */}
                    <Route path="/profile-setup" element={<ProfileSetup />} /> {/* Navigate here after SignUp */}
                    <Route path="/parent-dashboard" element={<ParentDashboard />} />
                    <Route path="/child-dashboard" element={<ChildDashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
