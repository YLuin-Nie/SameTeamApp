// File Name: ParentRewards.js

import React, { useState, useEffect } from "react";
import { getCurrentUser, getUsers, saveUsers } from "../utils/localStorageUtils";

function ParentRewards() {
    const [children, setChildren] = useState([]);
    const [selectedChild, setSelectedChild] = useState("");
    const [rewardName, setRewardName] = useState("");
    const [rewardPoints, setRewardPoints] = useState(10);

    // Load children from localStorage
    useEffect(() => {
        const users = getUsers();
        const childUsers = users.filter(user => user.role === "Child");
        setChildren(childUsers);
    }, []);

    // Function to reward a child
    const rewardChild = () => {
        if (!selectedChild || !rewardName || rewardPoints <= 0) {
            alert("Please select a child, enter a reward, and set a valid point amount.");
            return;
        }

        // Retrieve users from localStorage
        const users = getUsers();
        const updatedUsers = users.map(user => {
            if (user.username === selectedChild) {
                const newPoints = (user.points || 0) + rewardPoints;
                return { ...user, points: newPoints };
            }
            return user;
        });

        // Save updated users
        saveUsers(updatedUsers);
        alert(`Successfully rewarded ${rewardPoints} points to ${selectedChild} for ${rewardName}!`);
        
        // Reset fields
        setSelectedChild("");
        setRewardName("");
        setRewardPoints(10);
    };

    return (
        <div className="rewards-container">
            <h2>Rewards System</h2>
            <p>Select a child and assign a reward with points.</p>

            {/* Child Selection */}
            <label>Select Child:</label>
            <select value={selectedChild} onChange={(e) => setSelectedChild(e.target.value)}>
                <option value="">Select a child...</option>
                {children.map(child => (
                    <option key={child.username} value={child.username}>{child.username}</option>
                ))}
            </select>

            {/* Reward Input */}
            <label>Reward Name:</label>
            <input
                type="text"
                value={rewardName}
                onChange={(e) => setRewardName(e.target.value)}
                placeholder="Enter reward (e.g., Extra Playtime)"
            />

            {/* Points Input */}
            <label>Points:</label>
            <input
                type="number"
                value={rewardPoints}
                onChange={(e) => setRewardPoints(Number(e.target.value))}
                min="1"
            />

            {/* Reward Button */}
            <button onClick={rewardChild}>Reward Points</button>
        </div>
    );
}

export default ParentRewards;
