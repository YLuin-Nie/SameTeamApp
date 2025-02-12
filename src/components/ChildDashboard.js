// File Name: ChildDashboard.js

import React, { useState, useEffect } from 'react';
import { getCurrentUser, getUsers } from "./utils/localStorageUtils";

function ChildDashboard() {
    const [chores, setChores] = useState([]);
    const currentUser = getCurrentUser();

    // ✅ Load assigned chores when component mounts
    useEffect(() => {
        const storedChores = JSON.parse(localStorage.getItem("chores")) || [];
        if (currentUser) {
            const userChores = storedChores.filter(chore => chore.assignedTo === currentUser.username);
            setChores(userChores);
        }
    }, [currentUser]);

    // ✅ Function to toggle chore completion
    const toggleComplete = (id) => {
        const updatedChores = chores.map(chore =>
            chore.id === id ? { ...chore, completed: !chore.completed } : chore
        );
        setChores(updatedChores);

        // ✅ Persist updated chores to localStorage
        localStorage.setItem("chores", JSON.stringify(updatedChores));
    };

    return (
        <div>
            <h2>Child Dashboard</h2>
            <p>Welcome, {currentUser ? currentUser.username : "User"}! Here are your assigned chores.</p>
            <ul>
                {chores.map(chore => (
                    <li key={chore.id} style={{ textDecoration: chore.completed ? "line-through" : "none" }}>
                        {chore.text}
                        <button onClick={() => toggleComplete(chore.id)}>
                            {chore.completed ? "Undo" : "Complete"}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ChildDashboard;
