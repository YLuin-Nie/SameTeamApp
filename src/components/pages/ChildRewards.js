// File Name: ChildRewards.js

import React, { useState, useEffect } from "react";
import { getCurrentUser, getUsers, saveUsers } from "../utils/localStorageUtils";


function ChildRewards() {
    const [points, setPoints] = useState(0);
    const currentUser = getCurrentUser();

    useEffect(() => {
        if (currentUser) {
            const users = getUsers();
            const currentUserData = users.find(user => user.username === currentUser.username);
            if (currentUserData) {
                setPoints(currentUserData.points || 0);
            }
        }
    }, [currentUser]);

    // Predefined rewards
    const rewards = [
        { name: "Go out and eat", cost: 50 },
        { name: "No Chores Day", cost: 75 },
        { name: "Go to the Movies", cost: 100 }
    ];

    // Function to purchase a reward
    const purchaseReward = (reward) => {
        if (points >= reward.cost) {
            const users = getUsers();
            const updatedUsers = users.map(user => {
                if (user.username === currentUser.username) {
                    return { ...user, points: user.points - reward.cost };
                }
                return user;
            });
            saveUsers(updatedUsers);
            setPoints(prevPoints => prevPoints - reward.cost);
            alert(`You have successfully purchased: ${reward.name}`);
        } else {
            alert("Not enough points to purchase this reward.");
        }
    };

    return (
        <div className="rewards-container">
            <h2>Available Rewards</h2>
            <p>Your Points: {points}</p>
            <ul>
                {rewards.map(reward => (
                    <li key={reward.name}>
                        {reward.name} - {reward.cost} Points
                        <button onClick={() => purchaseReward(reward)}>Redeem</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ChildRewards;
