import React, { useState } from 'react';
import MessageModal from './MessageModal'; // Import the modal component

function ParentDashboard() {
    const [chores, setChores] = useState([]);
    const [newChore, setNewChore] = useState('');
    const [chorePoints, setChorePoints] = useState(10);
    const [points, setPoints] = useState(0);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    // State to control the visibility of the message modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State for family members and their assigned chores
    const [familyMembers, setFamilyMembers] = useState([
        { name: 'Ethan', chores: ['Take out the trash', 'Clean your room'] },
        { name: 'Olivia', chores: ['Do your homework'] }
    ]);

    // Function to handle adding a new chore
    const addChore = () => {
        if (newChore.trim()) {
            setChores([...chores, { id: chores.length + 1, text: newChore, completed: false, points: chorePoints }]);
            setNewChore('');
            setChorePoints(10); // Reset points input
        }
    };

    // Function to open the message modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to close the message modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Function to send a message to the child
    const sendMessage = () => {
        if (newMessage.trim()) {
            setMessages([...messages, { id: messages.length + 1, text: newMessage }]);
            setNewMessage(''); // Reset message input after sending
        }
    };

    return (
        <div>
            <h2>Parent Dashboard</h2>
            <p>Welcome, Parent! You can manage chores, points, messages, and levels from here.</p>

            {/* Chore Management */}
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
                <button onClick={addChore}>Add Chore</button>
            </div>

            {/* Family Members Section */}
            <div>
                <h3>Family Members</h3>
                <ul>
                    {familyMembers.map((member, index) => (
                        <li key={index}>
                            <strong>{member.name}</strong>
                            <ul>
                                {member.chores.map((chore, idx) => (
                                    <li key={idx}>{chore}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Messages Section */}
            <div>
                <h3>Messages</h3>
                <button onClick={openModal}>View Messages</button>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Enter your message"
                />
                <button onClick={sendMessage}>Send Message</button>
            </div>

            {/* Message Modal */}
            <MessageModal isOpen={isModalOpen} onClose={closeModal} messages={messages} />
        </div>
    );
}

export default ParentDashboard;
