// File Name: AddChore.js

import React, { useState, useEffect } from 'react';
import { 
  getUsers, addChoreToStorage, getChores, saveChores, 
  getUserPoints, updateUserPoints 
} from "../utils/localStorageUtils";

const AddChore = () => {
  const [newChore, setNewChore] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [chorePoints, setChorePoints] = useState(10);
  const [choreDate, setChoreDate] = useState('');
  const [chores, setChores] = useState([]);
  const [editingChoreId, setEditingChoreId] = useState(null);
  const [editedChoreText, setEditedChoreText] = useState('');
  const familyMembers = getUsers().filter(user => user.role === "Child");

  useEffect(() => {
    setChores(getChores());
  }, []);

  // Add a new chore
  const addChore = () => {
    if (newChore.trim() && assignedTo && choreDate) {
        // Create a date object in local time
        const localDate = new Date(choreDate + 'T00:00:00'); 
        const newChoreObj = {
            id: Date.now(),
            text: newChore,
            completed: false,
            points: chorePoints,
            assignedTo,
            date: localDate.toISOString(), // Store as ISO format, but with a fixed time
        };

        addChoreToStorage(newChoreObj);
        setChores([...chores, newChoreObj]);
        setNewChore('');
        setChorePoints(10);
        setAssignedTo('');
        setChoreDate('');
    }
  };

  // Complete/Undo Complete Chore
  const toggleCompletion = (choreId) => {
    const updatedChores = chores.map(chore =>
      chore.id === choreId ? { ...chore, completed: !chore.completed } : chore
    );

    setChores(updatedChores);
    saveChores(updatedChores);

    const chore = chores.find(c => c.id === choreId);
    if (chore) {
      const currentPoints = getUserPoints(chore.assignedTo);
      updateUserPoints(chore.assignedTo, chore.completed ? currentPoints - chore.points : currentPoints + chore.points);
    }
  };

  // Delete a chore
  const deleteChore = (choreId) => {
    setChores(chores.filter(chore => chore.id !== choreId));
    saveChores(chores.filter(chore => chore.id !== choreId));
  };

  // Reassign a chore
  const reassignChore = (choreId, newAssignee) => {
    const updatedChores = chores.map(chore =>
      chore.id === choreId ? { ...chore, assignedTo: newAssignee } : chore
    );

    setChores(updatedChores);
    saveChores(updatedChores);
  };

  // Start editing a chore
  const startEdit = (chore) => {
    setEditingChoreId(chore.id);
    setEditedChoreText(chore.text);
  };

  // Save edited chore
  const saveEdit = (choreId) => {
    setChores(chores.map(chore =>
      chore.id === choreId ? { ...chore, text: editedChoreText } : chore
    ));
    saveChores(chores.map(chore =>
      chore.id === choreId ? { ...chore, text: editedChoreText } : chore
    ));
    setEditingChoreId(null);
  };

  return (
    <div>
      <h2>Chore Management</h2>
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
      <input 
        type="date" 
        value={choreDate} 
        onChange={(e) => setChoreDate(e.target.value)} 
        placeholder="Date" 
      />
      <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
        <option value="">Assign to...</option>
        {familyMembers.map(member => (
          <option key={member.username} value={member.username}>{member.username}</option>
        ))}
      </select>
      <button onClick={addChore}>Add Chore</button>

      <h3>Chore List</h3>
      <ul>
        {chores.map(chore => (
          <li key={chore.id} className="chore-list-item">
            {editingChoreId === chore.id ? (
              <>
                <input 
                  type="text" 
                  value={editedChoreText} 
                  onChange={(e) => setEditedChoreText(e.target.value)} 
                />
                <button title="Save changes" onClick={() => saveEdit(chore.id)}>💾</button>
                <button title="Cancel editing" onClick={() => setEditingChoreId(null)}>❌</button>
              </>
            ) : (
              <>
                <span style={{ textDecoration: chore.completed ? "line-through" : "none" }}>
                  {chore.text} (Assigned to: {chore.assignedTo})
                </span>

                <div className="chore-actions">
                  {!chore.completed && (
                    <button title="Edit Chore" onClick={() => startEdit(chore)}>✏️</button>
                  )}
                  <button 
                    title={chore.completed ? "Undo Completion" : "Mark as Complete"} 
                    onClick={() => toggleCompletion(chore.id)}
                  >
                    {chore.completed ? "🔄" : "✔️"}
                  </button>
                  {!chore.completed && (
                    <button title="Delete Chore" onClick={() => deleteChore(chore.id)}>🗑️</button>
                  )}
                  
                  {/* Reassign Dropdown */}
                  {!chore.completed && (
                    <select 
                      title="Reassign Chore" 
                      value={chore.assignedTo} 
                      onChange={(e) => reassignChore(chore.id, e.target.value)}
                    >
                      {familyMembers.map(member => (
                        <option key={member.username} value={member.username}>
                          {member.username}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </>
            )}
          </li>
        ))}
      </ul>


    </div>
  );
};

export default AddChore;
