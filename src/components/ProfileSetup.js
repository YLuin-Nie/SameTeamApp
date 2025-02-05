import React, { useState } from 'react';
import ParentDashboard from './ParentDashboard';
import ChildDashboard from './ChildDashboard';
import "../components/styles/signup.css";

function ProfileSetup() {
    const [role, setRole] = useState('');
    const [teamName, setTeamName] = useState('');
    const [profileComplete, setProfileComplete] = useState(false);

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleTeamNameChange = (e) => {
        setTeamName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (role === 'parent' && teamName) {
            setProfileComplete(true);
        } else if (role === 'child') {
            setProfileComplete(true);
        } else {
            alert('Please select a role and provide a team name if you are a parent.');
        }
    };

    // Conditionally render the dashboards based on the user's role
    if (profileComplete) {
        return role === 'parent' ? <ParentDashboard /> : <ChildDashboard />;
    }

    return (
        <div>
            <h2>Profile Setup</h2>
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
