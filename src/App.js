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
                <div className="toggle-container">
                    <div className={`toggle ${darkMode ? 'night' : ''}`} onClick={toggleDarkMode}>
                        <div className={`notch`}>
                            <div className="crater"></div>
                            <div className="crater"></div>
                        </div>
                        <div className={`shape sm`}></div>
                        <div className={`shape md`}></div>
                        <div className={`shape lg`}></div>
                    </div>
                </div>

                <Routes>
                    <Route path="/" element={<SignUp />} />
                    <Route path="/profile-setup" element={<ProfileSetup />} />
                    <Route path="/parent-dashboard" element={<ParentDashboard />} />
                    <Route path="/child-dashboard" element={<ChildDashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
