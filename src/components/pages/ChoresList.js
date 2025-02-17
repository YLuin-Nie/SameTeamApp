import React, { useState, useEffect } from 'react';
import { getCurrentUser, getUserPoints, updateUserPoints, getChores } from "../utils/localStorageUtils";

const ChoresList = () => {
    const [chores, setChores] = useState([]);
    const [points, setPoints] = useState(0);
    const currentUser = getCurrentUser();

    useEffect(() => {
        if (currentUser) {
            setPoints(getUserPoints(currentUser.username));

            const storedChores = getChores();
            const userChores = storedChores.filter(chore => chore.assignedTo === currentUser.username);
            setChores(userChores);
        }
    }, [currentUser]);

    const toggleChoreCompletion = (choreId) => {
        const updatedChores = chores.map(chore => {
            if (chore.id === choreId) {
                const updatedChore = { ...chore, completed: !chore.completed };

                // Adjust points accordingly
                const newPoints = updatedChore.completed 
                    ? points + (chore.points || 0)  // Add points when completed
                    : Math.max(points - (chore.points || 0), 0); // Subtract points when undone

                setPoints(newPoints);
                updateUserPoints(currentUser.username, newPoints);

                return updatedChore;
            }
            return chore;
        });

        setChores(updatedChores);
        localStorage.setItem("chores", JSON.stringify(updatedChores));
    };

    return (
        <div className="chores-list-container">
            <h2>Your Chores</h2>
            <p><strong>Your Points:</strong> {points}</p>
            <progress value={points} max="100"></progress>
            <ul>
                {chores.map(chore => (
                    <li key={chore.id} style={{ textDecoration: chore.completed ? "line-through" : "none" }}>
                        {chore.text} - {chore.completed ? "Completed" : "Pending"} ({chore.points} pts)
                        
                        {/* Hide button if task is completed */}
                        {!chore.completed && (
                            <button onClick={() => toggleChoreCompletion(chore.id)}>
                                Complete
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChoresList;