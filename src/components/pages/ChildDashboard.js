// File Name: ChildDashboard.js

import React, { useState, useEffect } from 'react';
import { getCurrentUser, getUserPoints, getUserLevelFromStorage, getUserLevel, getChores } from "../utils/localStorageUtils";
import { useNavigate } from 'react-router-dom';

function ChildDashboard() {
    const [chores, setChores] = useState([]);
    const [points, setPoints] = useState(0);
    const [level, setLevel] = useState({});
    const [nextLevelThreshold, setNextLevelThreshold] = useState(0);
    const currentUser = getCurrentUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            const userPoints = getUserPoints(currentUser.username);
            setPoints(userPoints);
            
            const currentLevel = getUserLevelFromStorage(currentUser.username);
            setLevel(currentLevel);

            // Find the next level threshold
            const levels = [
                { min: 0, max: 200 },
                { min: 200, max: 400 },
                { min: 400, max: 600 },
                { min: 600, max: 1000 },
                { min: 1000, max: 10000 },
            ];

            const nextLevel = levels.find(l => userPoints < l.max);
            setNextLevelThreshold(nextLevel ? nextLevel.max : 1000);

            const storedChores = getChores();
            const userChores = storedChores.filter(chore => chore.assignedTo === currentUser.username);
            setChores(userChores);
        }
    }, [currentUser]);

    return (
        <div className="dashboard child-dashboard">
            <h2>Child Dashboard</h2>
            <p className="welcome-message">Welcome, {currentUser ? currentUser.username : "Child"}!</p>
            <p><strong>Your Points:</strong> {points}</p>

            {/* Level Display */}
            <div className="level-badge" style={{ backgroundColor: level.color }}>
                Level {level.level} - {level.name}
            </div>

            {/* ✅ Updated Progress Bar to show progress toward the next level */}
            <progress value={points - (nextLevelThreshold - 200)} max="200"></progress>

            <div className="content">
                <ul>
                    {chores.map(chore => (
                        <li key={chore.id} style={{ textDecoration: chore.completed ? 'line-through' : 'none' }}>
                            {chore.text} - {chore.completed ? "Completed" : "Pending"} ({chore.points} pts)
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ChildDashboard;
