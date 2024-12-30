import React, { useState, useEffect } from 'react';

const MailboxComponent = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Fetch messages from an API or database
        // This is just a placeholder, replace with actual data fetching logic
        const fetchMessages = async () => {
            const response = await fetch('/api/messages');
            const data = await response.json();
            setMessages(data);
        };

        fetchMessages();
    }, []);

    return (
        <div className="mailbox">
            <h2>Mailbox</h2>
            {messages.length === 0 ? (
                <p>No new messages</p>
            ) : (
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}>
                            <h3>{message.title}</h3>
                            <p>{message.body}</p>
                            <small>{new Date(message.date).toLocaleDateString()}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MailboxComponent;