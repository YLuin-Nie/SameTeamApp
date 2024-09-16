import React from 'react';

function MessageModal({ isOpen, onClose, messages }) {
    if (!isOpen) return null; // If modal is not open, don't render anything

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Messages</h3>
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}>{message.text}</li>
                    ))}
                </ul>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default MessageModal;
