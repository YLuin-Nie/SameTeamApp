// File Name: ChoresList.js

import React, { useState, useEffect } from 'react';
import { getCurrentUser, getUserPoints, updateUserPoints, getChores, getUserLevelFromStorage } from "../utils/localStorageUtils";

const ChoresList = () => {
    const [chores, setChores] = useState([]);
    const [points, setPoints] = useState(0);
    const [level, setLevel] = useState({});
    const currentUser = getCurrentUser();

    useEffect(() => {
        if (currentUser) {
            const userPoints = getUserPoints(currentUser.username);
            setPoints(userPoints);
            setLevel(getUserLevelFromStorage(currentUser.username));

            const storedChores = getChores();
            const userChores = storedChores.filter(chore => chore.assignedTo === currentUser.username);
            setChores(userChores);
        }
    }, [currentUser]);

    const toggleChoreCompletion = (choreId) => {
        const updatedChores = chores.map(chore => {
            if (chore.id === choreId) {
                const updatedChore = { ...chore, completed: !chore.completed };

                const newPoints = updatedChore.completed 
                    ? points + (chore.points || 0)
                    : Math.max(points - (chore.points || 0), 0);

                setPoints(newPoints);
                updateUserPoints(currentUser.username, newPoints);
                setLevel(getUserLevelFromStorage(currentUser.username));

                return updatedChore;
            }
            return chore;
        });

        setChores(updatedChores);
    };

    return (
        <div className="chores-list-container">
            <h2>Your Chores</h2>
            <p><strong>Your Points:</strong> {points}</p>

            <div className="level-badge" style={{ backgroundColor: level.color }}>
                Level {level.level} - {level.name}
            </div>

            <progress value={points} max="500"></progress>

            <ul>
                {chores.map(chore => (
                    <li key={chore.id} style={{ textDecoration: chore.completed ? "line-through" : "none" }}>
                        {chore.text} - {chore.completed ? "Completed" : "Pending"} ({chore.points} pts)
                        {!chore.completed && <button onClick={() => toggleChoreCompletion(chore.id)}>Complete</button>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChoresList;
