import React, { useState } from 'react';

function ChoreList() {
    // Define state to hold the list of chores
    const [chores, setChores] = useState([
        { id: 1, text: 'Take out the trash', completed: false },
        { id: 2, text: 'Clean the dishes', completed: false }
    ]);

    // Define state to handle input for new chores
    const [newChore, setNewChore] = useState("");

    // Function to add a new chore
    const addChore = () => {
        if (newChore.trim()) {
            setChores([...chores, { id: chores.length + 1, text: newChore, completed: false }]);
            setNewChore(""); // Reset input field
        }
    };

    // Function to mark a chore as completed
    const toggleComplete = (id) => {
        setChores(chores.map(chore =>
            chore.id === id ? { ...chore, completed: !chore.completed } : chore
        ));
    };

    // Function to delete a chore
    const deleteChore = (id) => {
        setChores(chores.filter(chore => chore.id !== id));
    };

    return (
        <div>
            <h2>Chore List</h2>

            <ul>
                {chores.map(chore => (
                    <li key={chore.id} style={{ textDecoration: chore.completed ? "line-through" : "none" }}>
                        {chore.text}
                        <button onClick={() => toggleComplete(chore.id)}>
                            {chore.completed ? "Undo" : "Complete"}
                        </button>
                        <button onClick={() => deleteChore(chore.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <input
                type="text"
                value={newChore}
                onChange={(e) => setNewChore(e.target.value)}
                placeholder="New chore"
            />
            <button onClick={addChore}>Add Chore</button>
        </div>
    );
}

export default ChoreList;

