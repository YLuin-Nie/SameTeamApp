import React, { useState, useEffect } from 'react';
import { getCurrentUser, getUserPoints, updateUserPoints, getChores } from "../utils/localStorageUtils";
import { useNavigate, Link } from 'react-router-dom';
import ChoresCalendar from '../Calendar';


function ChildDashboard() {
    const [chores, setChores] = useState([]);
    const [points, setPoints] = useState(0);
    const currentUser = getCurrentUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            setPoints(getUserPoints(currentUser.username));

            const storedChores = getChores();
            const userChores = storedChores.filter(chore => chore.assignedTo === currentUser.username);
            setChores(userChores);
            console.log('User chores:', userChores); // Add this line to verify chores data
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
        <div className="dashboard child-dashboard">
            <h2>Child Dashboard</h2>
            <hr />
            <p className="welcome-message">Welcome, {currentUser ? currentUser.username : "Child"}! View your assigned chores below.</p>
            <p><strong>Your Points:</strong> {points}</p>
            <progress value={points} max="100"></progress>
            <div className="content">
                <div className="calendar-container">
                    <ChoresCalendar chores={chores} toggleChoreCompletion={toggleChoreCompletion} />
                </div>
            </div>
        </div>
    );
}

export default ChildDashboard;