import React, { useState, useEffect } from 'react';
import { getCurrentUser, getUsers, getChores, addChoreToStorage, saveChores, getUserPoints, updateUserPoints } from "../utils/localStorageUtils";
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function ParentDashboard() {
    const [chores, setChores] = useState([]);
    const [newChore, setNewChore] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [chorePoints, setChorePoints] = useState(10);
    const [deductPointsOnReassign, setDeductPointsOnReassign] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date()); // State for the selected date
    const [tasksForSelectedDate, setTasksForSelectedDate] = useState([]); // State for tasks on the selected date

    const navigate = useNavigate();
    const familyMembers = getUsers().filter(user => user.role === "Child");
    const currentUser = getCurrentUser();

    useEffect(() => {
        setChores(getChores());
    }, []);

    useEffect(() => {
        // Filter chores for the selected date
        const tasksOnDate = chores.filter(chore => {
            const choreDate = new Date(chore.date); // Convert chore.date to Date
            return !isNaN(choreDate) && choreDate.toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0];
        });
        setTasksForSelectedDate(tasksOnDate);
    }, [selectedDate, chores]);

    const addChore = () => {
        if (newChore.trim() && assignedTo) {
            const newChoreObj = {
                id: Date.now(),
                text: newChore,
                completed: false,
                points: chorePoints,
                assignedTo,
                date: selectedDate.toISOString().split('T')[0], // Ensure valid date format
            };

            addChoreToStorage(newChoreObj);
            setChores([...chores, newChoreObj]);
            setNewChore('');
            setChorePoints(10);
            setAssignedTo('');
        }
    };

    const completeChore = (choreId) => {
        const updatedChores = chores.map(chore =>
            chore.id === choreId ? { ...chore, completed: true } : chore
        );
        setChores(updatedChores);
        saveChores(updatedChores);

        const chore = chores.find(c => c.id === choreId);
        if (chore) {
            const currentPoints = getUserPoints(chore.assignedTo);
            updateUserPoints(chore.assignedTo, currentPoints + chore.points);
        }
    };

    const undoCompleteChore = (choreId) => {
        const updatedChores = chores.map(chore =>
            chore.id === choreId ? { ...chore, completed: false } : chore
        );
        setChores(updatedChores);
        saveChores(updatedChores);

        const chore = chores.find(c => c.id === choreId);
        if (chore) {
            const currentPoints = getUserPoints(chore.assignedTo);
            updateUserPoints(chore.assignedTo, Math.max(currentPoints - chore.points, 0));
        }
    };

    const reassignChore = (choreId, newAssignee) => {
        const chore = chores.find(c => c.id === choreId);
        if (!chore) return;

        if (chore.completed && deductPointsOnReassign[choreId]) {
            const currentPoints = getUserPoints(chore.assignedTo);
            updateUserPoints(chore.assignedTo, Math.max(currentPoints - chore.points, 0));
        }

        const updatedChores = chores.map(chore =>
            chore.id === choreId ? { ...chore, assignedTo: newAssignee } : chore
        );

        setChores(updatedChores);
        saveChores(updatedChores);
    };

    return (
        <div className="dashboard parent-dashboard">
            <h2>Parent Dashboard</h2>
            <hr />
            <p className="welcome-message">Welcome, {currentUser ? currentUser.username : "Parent"}! Manage your family's chores here.</p>
            
            <div className="calendar-tasks-container">
                <div className="calendar-section">
                    <Calendar onChange={setSelectedDate} value={selectedDate} />
                </div>
                <div className="divider"></div>
                <div className="tasks-section">
                    <h3>Chores for {selectedDate.toDateString()}</h3>
                    {tasksForSelectedDate.length === 0 ? (
                        <p>No chores for this date.</p>
                    ) : (
                        <ul>
                            {tasksForSelectedDate.map(task => (
                                <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                    {task.text} - {task.completed ? 'Completed' : 'Pending'}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ParentDashboard;