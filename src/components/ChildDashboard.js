import React, { useState } from 'react';

function ChildDashboard() {
    const [chores, setChores] = useState([
        { id: 1, text: 'Take out the trash', completed: false, points: 10 },
        { id: 2, text: 'Clean the dishes', completed: true, points: 20 }
    ]);
    
    const [totalPoints, setTotalPoints] = useState(30);
    const [messages, setMessages] = useState([
        { id: 1, text: 'Great job cleaning the dishes!' },
        { id: 2, text: 'Don’t forget to take out the trash.' }
    ]);

    // Custom levels would come from the parent dashboard; hardcoded for now
    const customLevels = [
        { name: 'Beginner', minPoints: 0, maxPoints: 99 },
        { name: 'Intermediate', minPoints: 100, maxPoints: 199 },
        { name: 'Master', minPoints: 200, maxPoints: Infinity }
    ];

    // Function to get the current level based on total points
    const getLevel = (points) => {
        const level = customLevels.find(lvl => points >= lvl.minPoints && points <= lvl.maxPoints);
        return level ? level.name : 'Unknown';
    };

    // Mark chore as complete and update total points
    const completeChore = (id) => {
        setChores(chores.map(chore => chore.id === id && !chore.completed ? { ...chore, completed: true } : chore));
        const completedChore = chores.find(chore => chore.id === id);
        if (completedChore && !completedChore.completed) {
            setTotalPoints(totalPoints + completedChore.points);
        }
    };

    return (
        <div>
            <h2>Child Dashboard</h2>
            <div>
                <h3>Total Points: {totalPoints}</h3>
                <h3>Level: {getLevel(totalPoints)}</h3> {/* Display the current level */}
            </div>

            <div>
                <h3>Your Chores</h3>
                <ul>
                    {chores.map((chore) => (
                        <li key={chore.id}>
                            {chore.text} - {chore.completed ? "Completed" : "Incomplete"} 
                            {!chore.completed && (
                                <button onClick={() => completeChore(chore.id)}>Mark as Complete</button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3>Messages from Parent</h3>
                <ul>
                    {messages.map((message) => (
                        <li key={message.id}>{message.text}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ChildDashboard;
