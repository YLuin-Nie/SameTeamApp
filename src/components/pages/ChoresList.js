// File Name: ChoresList.js

import React, { useState, useEffect } from 'react';
import { getCurrentUser, getUserPoints, updateUserPoints, getChores, saveChores } from "../utils/localStorageUtils";

const ChoresList = () => {
    const [chores, setChores] = useState([]);
    const [points, setPoints] = useState(0);
    const [completionPercentage, setCompletionPercentage] = useState(0);
    const currentUser = getCurrentUser();

    useEffect(() => {
        if (currentUser) {
            const userPoints = getUserPoints(currentUser.username);
            setPoints(userPoints);

            const storedChores = getChores();
            const userChores = storedChores.filter(chore => chore.assignedTo === currentUser.username);
            setChores(userChores);

            // Calculate completion percentage
            if (userChores.length > 0) {
                const completedTasks = userChores.filter(chore => chore.completed).length;
                setCompletionPercentage(Math.round((completedTasks / userChores.length) * 100));
            } else {
                setCompletionPercentage(0);
            }
        }
    }, [currentUser]);

    const completeChore = (choreId) => {
        const updatedChores = chores.map(chore => {
            if (chore.id === choreId && !chore.completed) {
                const updatedChore = { ...chore, completed: true };

                const newPoints = points + (chore.points || 0);
                setPoints(newPoints);
                updateUserPoints(currentUser.username, newPoints);

                return updatedChore;
            }
            return chore;
        });

        setChores(updatedChores);
        saveChores(updatedChores);

        // Recalculate completion percentage
        const completedTasks = updatedChores.filter(chore => chore.completed).length;
        setCompletionPercentage(Math.round((completedTasks / updatedChores.length) * 100));
    };

    return (
        <div className="chores-list-container">
            <h2>Your Chores</h2>
            <p><strong>Your Points:</strong> {points}</p>

            {/* ✅ Task Completion Progress Bar */}
            <p><strong>Task Completion Progress:</strong> {completionPercentage}%</p>
            <progress value={completionPercentage} max="100"></progress>

            <ul>
                {chores.map(chore => (
                    <li key={chore.id} style={{ textDecoration: chore.completed ? "line-through" : "none" }}>
                        {chore.text} - {chore.completed ? "✅ Completed" : "⏳ Pending"} ({chore.points} pts)
                        
                        {/* ✅ Hide button if the task is completed */}
                        {!chore.completed && (
                            <button onClick={() => completeChore(chore.id)}>✔️ Complete</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChoresList;
