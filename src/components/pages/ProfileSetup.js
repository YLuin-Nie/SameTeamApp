// File Name: ProfileSetup.js

import React, { useState } from 'react';
import { getCurrentUser } from "../utils/localStorageUtils";
import { useNavigate } from 'react-router-dom';

const getTeamName = () => localStorage.getItem("teamName") || "";

function ProfileSetup() {
    const [role, setRole] = useState('');
    const [teamName, setTeamName] = useState(getTeamName());
    const currentUser = getCurrentUser();
    const navigate = useNavigate();

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleTeamNameChange = (e) => {
        setTeamName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (role === 'parent' && teamName) {
            navigate("/parent-dashboard"); // ✅ Navigate instead of rendering
        } else if (role === 'child') {
            navigate("/child-dashboard"); // ✅ Navigate instead of rendering
        } else {
            alert('Please select a role and provide a team name if you are a parent.');
        }
    };

    return (
        <div>
            <h2>Profile Setup</h2>
            <p>Welcome, {currentUser ? currentUser.username : 'User'}!</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Select Role:
                        <select value={role} onChange={handleRoleChange}>
                            <option value="">Select...</option>
                            <option value="parent">Parent</option>
                            <option value="child">Child</option>
                        </select>
                    </label>
                </div>

                {role === 'parent' && (
                    <div>
                        <label>
                            Team Name:
                            <input
                                type="text"
                                value={teamName}
                                onChange={handleTeamNameChange}
                                placeholder="Enter your team name"
                            />
                        </label>
                    </div>
                )}
                
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ProfileSetup;

