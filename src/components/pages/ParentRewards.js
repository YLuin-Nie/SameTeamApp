// File Name: ParentRewards.js

import React, { useState, useEffect } from "react";
import { getCurrentUser, getUsers, saveUsers } from "../utils/localStorageUtils";

function ParentRewards() {
    const [children, setChildren] = useState([]);
    const [selectedChild, setSelectedChild] = useState("");
    const [rewardName, setRewardName] = useState("");
    const [rewardPoints, setRewardPoints] = useState(10);
    const [rewards, setRewards] = useState([
        { id: 1, name: "Go out and eat", cost: 50 },
        { id: 2, name: "No Chores Day", cost: 75 },
        { id: 3, name: "Go to the Movies", cost: 100 }
    ]);
    const [editingReward, setEditingReward] = useState(null);
    const [editedRewardName, setEditedRewardName] = useState("");
    const [editedRewardCost, setEditedRewardCost] = useState(0);

    useEffect(() => {
        const users = getUsers();
        const childUsers = users.filter(user => user.role === "Child");
        setChildren(childUsers);
    }, []);

    const rewardChild = () => {
        if (!selectedChild || !rewardName || rewardPoints <= 0) {
            alert("Please select a child, enter a reward, and set a valid point amount.");
            return;
        }

        const users = getUsers();
        const updatedUsers = users.map(user => {
            if (user.username === selectedChild) {
                const newPoints = (user.points || 0) + rewardPoints;
                return { ...user, points: newPoints };
            }
            return user;
        });

        saveUsers(updatedUsers);
        alert(`Successfully rewarded ${rewardPoints} points to ${selectedChild} for ${rewardName}!`);
        
        setSelectedChild("");
        setRewardName("");
        setRewardPoints(10);
    };

    const addReward = () => {
        if (!rewardName.trim() || rewardPoints <= 0) {
            alert("Please enter a valid reward name and cost.");
            return;
        }

        const newReward = { id: Date.now(), name: rewardName, cost: rewardPoints };
        setRewards([...rewards, newReward]);

        setRewardName("");
        setRewardPoints(10);
    };

    const deleteReward = (id) => {
        setRewards(rewards.filter(reward => reward.id !== id));
    };

    const startEdit = (reward) => {
        setEditingReward(reward.id);
        setEditedRewardName(reward.name);
        setEditedRewardCost(reward.cost);
    };

    const saveEdit = () => {
        setRewards(rewards.map(reward => 
            reward.id === editingReward ? { ...reward, name: editedRewardName, cost: editedRewardCost } : reward
        ));
        setEditingReward(null);
        setEditedRewardName("");
        setEditedRewardCost(0);
    };

    return (
        <div className="rewards-container">
            <h2>Parent Rewards Management</h2>

            <h3>Reward A Child (Extra Points)</h3>
            <select value={selectedChild} onChange={(e) => setSelectedChild(e.target.value)}>
                <option value="">Select a child...</option>
                {children.map(child => (
                    <option key={child.username} value={child.username}>{child.username}</option>
                ))}
            </select>

            <label>Reward Name:</label>
            <input type="text" value={rewardName} onChange={(e) => setRewardName(e.target.value)} placeholder="Enter reward (e.g., Extra Playtime)" />

            <label>Points:</label>
            <input type="number" value={rewardPoints} onChange={(e) => setRewardPoints(Number(e.target.value))} min="1" />

            <button onClick={rewardChild}>Reward Points</button>

            <hr />

            <h3>Define New Rewards</h3>
            <input type="text" placeholder="Reward Name" value={rewardName} onChange={(e) => setRewardName(e.target.value)} />
            <input type="number" placeholder="Cost" value={rewardPoints} onChange={(e) => setRewardPoints(Number(e.target.value))} />
            <button onClick={addReward}>Add Reward</button>

            <hr />

            <h3>Manage Rewards</h3>
            <ul className="reward-list">
                {rewards.map((reward) => (
                    <li key={reward.id} className="reward-item">
                        {editingReward === reward.id ? (
                            <>
                                <input type="text" value={editedRewardName} onChange={(e) => setEditedRewardName(e.target.value)} />
                                <input type="number" value={editedRewardCost} onChange={(e) => setEditedRewardCost(Number(e.target.value))} />
                                <button title="Save Changes" onClick={saveEdit}>💾</button>
                                <button title="Cancel Editing" onClick={() => setEditingReward(null)}>❌</button>
                            </>
                        ) : (
                            <>
                                <span>{reward.name} - {reward.cost} Points</span>
                                <div className="reward-actions">
                                    <button title="Edit Reward" onClick={() => startEdit(reward)}>✏️</button>
                                    <button title="Delete Reward" onClick={() => deleteReward(reward.id)}>🗑️</button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ParentRewards;
