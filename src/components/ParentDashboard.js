// File Name: ParentDashboard.js

import React, { useState, useEffect } from 'react';
import { getCurrentUser, getUsers, getChores, addChoreToStorage } from "./utils/localStorageUtils"; 

function ParentDashboard() {
    const [chores, setChores] = useState([]); // ✅ State to store chores
    const [newChore, setNewChore] = useState(''); // ✅ State to track new chore input
    const [assignedTo, setAssignedTo] = useState(''); // ✅ State to track chore assignment
    const [chorePoints, setChorePoints] = useState(10); // ✅ Default points for each chore

    // ✅ Get list of children from localStorage
    const familyMembers = getUsers().filter(user => user.role === "Child");

    // ✅ Get logged-in parent details
    const currentUser = getCurrentUser(); 

    // ✅ Load chores from localStorage when component mounts
    useEffect(() => {
        setChores(getChores());
    }, []);

    // ✅ Function to add a new chore
    const addChore = () => {
        if (newChore.trim() && assignedTo) {
            const newChoreObj = {
                id: Date.now(), // ✅ Use unique ID based on timestamp
                text: newChore,
                completed: false,
                points: chorePoints,
                assignedTo
            };

            addChoreToStorage(newChoreObj); // ✅ Save chore in localStorage
            setChores([...chores, newChoreObj]); // ✅ Update state
            setNewChore('');
            setChorePoints(10);
            setAssignedTo('');
        }
    };

    return (
        <div>
            <h2>Parent Dashboard</h2>
            <p>Welcome, {currentUser ? currentUser.username : "Parent"}! Manage your family's chores here.</p>
            
            {/* ✅ Form to Add a New Chore */}
            <div>
                <h3>Add a Chore</h3>
                <input 
                    type="text" 
                    value={newChore} 
                    onChange={(e) => setNewChore(e.target.value)} 
                    placeholder="Enter a new chore" 
                />
                <input 
                    type="number" 
                    value={chorePoints} 
                    onChange={(e) => setChorePoints(Number(e.target.value))} 
                    placeholder="Points" 
                />
                <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
                    <option value="">Assign to...</option>
                    {familyMembers.map(member => (
                        <option key={member.username} value={member.username}>{member.username}</option>
                    ))}
                </select>
                <button onClick={addChore}>Add Chore</button>
            </div>

            {/* ✅ Display Existing Chores */}
            <div>
                <h3>Chore List</h3>
                <ul>
                    {chores.map(chore => (
                        <li key={chore.id} style={{ textDecoration: chore.completed ? "line-through" : "none" }}>
                            {chore.text} (Assigned to: {chore.assignedTo}) - {chore.completed ? "Completed" : "Pending"}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ParentDashboard;
