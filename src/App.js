import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { initializeLocalStorage, getCurrentUser, authenticateUser, logoutUser } from "./components/utils/localStorageUtils";
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ProfileSetup from './components/ProfileSetup';
import ParentDashboard from './components/ParentDashboard';
import ChildDashboard from './components/ChildDashboard';
import HomePage from './components/HomePage'; // Import your new HomePage component

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        initializeLocalStorage();
        const user = getCurrentUser();
        if (user) {
            console.log("Auto-login detected for:", user);
            setCurrentUser(user);
        } else {
            console.log("No user is logged in.");
        }

        const storedDarkMode = localStorage.getItem("darkMode") === "true";
        setDarkMode(storedDarkMode);
        document.body.classList.toggle("dark-mode", storedDarkMode);
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => {
            const newMode = !prevMode;
            localStorage.setItem("darkMode", newMode);
            document.body.classList.toggle("dark-mode", newMode);
            return newMode;
        });
    };

    function AppRoutes() {
        const navigate = useNavigate();

        useEffect(() => {
            const user = getCurrentUser();
            if (user) {
                if (user.role === "Parent") {
                    navigate("/parent-dashboard");
                } else {
                    navigate("/child-dashboard");
                }
            }
        }, [navigate]);

        const handleSignInSuccess = (email, password) => {
            if (!email || !password) {
                alert("Please enter both email and password.");
                return;
            }

            const user = authenticateUser(email, password);
            if (user) {
                console.log("User signed in successfully:", user);
                setCurrentUser(user);

                if (user.role === "Parent") {
                    navigate("/parent-dashboard");
                } else {
                    navigate("/child-dashboard");
                }
            } else {
                alert("Invalid email or password. Please try again.");
            }
        };

        return (
            <Routes>
                {/* Home route with Sign Up and Login buttons */}
                <Route path="/" element={<HomePage />} />  
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile-setup" element={<ProfileSetup />} />
                <Route path="/parent-dashboard" element={<ParentDashboard />} />
                <Route path="/child-dashboard" element={<ChildDashboard />} />
                <Route path="/signin" element={<SignIn onSignInSuccess={handleSignInSuccess} />} />
            </Routes>
        );
    }

    return (
        <Router>
            <div className={`App ${darkMode ? "dark" : "light"}`}>
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

                <div className="button-container">
                    {currentUser && (
                        <button onClick={() => {
                            logoutUser();
                            setCurrentUser(null);
                            window.location.href = "/"; // Redirect to sign-in page
                        }}>Logout</button>
                    )}
                </div>

                <AppRoutes />
            </div>
        </Router>
    );
}

export default App;
