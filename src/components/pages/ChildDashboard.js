// File Name: ChildDashboard.js

import React, { useState, useEffect } from 'react';
import { getCurrentUser, getUserPoints, getTotalPoints, getUserLevelFromStorage, getChores } from "../utils/localStorageUtils";
import { useNavigate } from 'react-router-dom';

function ChildDashboard() {
    const [chores, setChores] = useState([]);
    const [points, setPoints] = useState(0);
    const [totalPoints, setTotalPoints] = useState(0);
    const [level, setLevel] = useState({});
    const [nextLevelThreshold, setNextLevelThreshold] = useState(0);
    const currentUser = getCurrentUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            const userPoints = getUserPoints(currentUser.username);
            const totalEarned = getTotalPoints(currentUser.username);
            setPoints(userPoints);
            setTotalPoints(totalEarned);
            
            const currentLevel = getUserLevelFromStorage(currentUser.username);
            setLevel(currentLevel);

            // Determine next level threshold
            const levels = [
                { min: 0, max: 200 },
                { min: 200, max: 400 },
                { min: 400, max: 600 },
                { min: 600, max: 1000 },
                { min: 1000, max: 10000 },
            ];

            const nextLevel = levels.find(l => totalEarned < l.max);
            setNextLevelThreshold(nextLevel ? nextLevel.max : 1000);

            // Get upcoming chores assigned to the current child
            const storedChores = getChores();
            const userChores = storedChores
                .filter(chore => chore.assignedTo === currentUser.username && !chore.completed)
                .sort((a, b) => new Date(a.date) - new Date(b.date)); // ✅ Sort by date

            setChores(userChores);
        }
    }, [currentUser]);

    return (
        <div className="dashboard child-dashboard">
            <h2>Child Dashboard</h2>
            <p className="welcome-message">Welcome, {currentUser ? currentUser.username : "Child"}!</p>
            <p><strong>Total Points Earned:</strong> {totalPoints}</p>
            <p><strong>Unspent Points:</strong> {points}</p>

            {/* Level Display */}
            <div className="level-badge" style={{ backgroundColor: level.color }}>
                Level {level.level} - {level.name}
            </div>

            {/* ✅ Progress to the next level */}
            <p>Next Level Progress: {totalPoints - (nextLevelThreshold - 200)} / 200</p>
            <progress value={totalPoints - (nextLevelThreshold - 200)} max="200"></progress>

            <div className="content">
                <h3>Upcoming Chores</h3>
                {chores.length === 0 ? (
                    <p>No upcoming chores assigned.</p>
                ) : (
                    <ul>
                        {chores.map(chore => (
                            <li key={chore.id}>
                                <span><strong>{chore.text}</strong></span> <br />
                                <small>Due: {new Date(chore.date).toDateString()}</small> <br />
                                <span>Points: {chore.points} pts</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default ChildDashboard;
