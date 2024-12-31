import React, { useState } from "react";
import { FaSearch, FaEnvelope, FaPen, FaTimes } from "react-icons/fa";

// Sample message data
const sampleMessages = [
  {
    id: 1,
    sender: "john.doe@example.com",
    subject: "Job Application Update",
    preview: "Your application has been reviewed and...",
    timestamp: new Date().getTime() - 3600000, // 1 hour ago
    read: false,
  },
  {
    id: 2,
    sender: "jane.smith@example.com",
    subject: "Interview Invitation",
    preview: "We would like to invite you for an interview...",
    timestamp: new Date().getTime() - 7200000, // 2 hours ago
    read: true,
  },
  {
    id: 3,
    sender: "hr@company.com",
    subject: "Offer Letter",
    preview: "Congratulations! We are pleased to offer you the position...",
    timestamp: new Date().getTime() - 10800000, // 3 hours ago
    read: false,
  },
];

const MessageItem = ({ message, onMarkAsRead, onDelete }) => {
  const { sender, subject, preview, timestamp, read } = message;

  // Function to calculate time ago
  const timeAgo = (time) => {
    const seconds = Math.floor((new Date().getTime() - time) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  };

  return (
    <div
      className={`flex items-center p-4 mb-4 rounded-md border-2 transition-all duration-300 ${
        read ? "bg-gray-100" : "bg-white"
      } ${read ? "border-gray-300" : "border-blue-500"}`}
    >
      <div className="flex-shrink-0">
        <FaEnvelope className="text-blue-500" />
      </div>
      <div className="ml-3 flex-1">
        <p className="font-semibold">{sender}</p>
        <p className="text-sm">{subject}</p>
        <p className="text-xs text-gray-500">{preview}</p>
        <p className="text-xs text-gray-500">{timeAgo(timestamp)}</p>
      </div>
      {!read && (
        <button
          onClick={() => onMarkAsRead(message.id)}
          className="ml-3 text-blue-500 hover:text-blue-600"
        >
          Mark as Read
        </button>
      )}
      <button
        onClick={() => onDelete(message.id)}
        className="ml-3 text-red-500 hover:text-red-600"
      >
        <FaTimes />
      </button>
    </div>
  );
};

const Mailbox = () => {
  const [messages, setMessages] = useState(sampleMessages);
  const [searchTerm, setSearchTerm] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [newMessage, setNewMessage] = useState({
    sender: "",
    subject: "",
    body: "",
  });

  // Handle message delete
  const handleDeleteMessage = (id) => {
    const updatedMessages = messages.filter((message) => message.id !== id);
    setMessages(updatedMessages);
  };

  // Mark message as read
  const handleMarkAsRead = (id) => {
    const updatedMessages = messages.map((message) =>
      message.id === id ? { ...message, read: true } : message
    );
    setMessages(updatedMessages);
  };

  // Filter messages based on search term
  const filteredMessages = messages.filter((message) =>
    message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Start composing a new message
  const handleComposeMessage = () => {
    setIsComposing(true);
  };

  // Handle compose message input change
  const handleMessageChange = (e) => {
    const { name, value } = e.target;
    setNewMessage({
      ...newMessage,
      [name]: value,
    });
  };

  // Send new message (for now just adding it to the list)
  const handleSendMessage = () => {
    const newMessageObj = {
      id: messages.length + 1,
      sender: newMessage.sender,
      subject: newMessage.subject,
      preview: newMessage.body.substring(0, 50) + "...",
      timestamp: new Date().getTime(),
      read: false,
    };
    setMessages([...messages, newMessageObj]);
    setIsComposing(false);
    setNewMessage({ sender: "", subject: "", body: "" });
  };

  return (
    <div className="p-6 w-full flex flex-col space-y-4 bg-gray-100">
      <div className="bg-white p-6 shadow-md rounded-md w-full">
        <h2 className="text-2xl font-semibold mb-4 flex justify-between items-center">
          Mailbox
          <button
            onClick={handleComposeMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
          >
            Compose
          </button>
        </h2>

        {/* Search Bar */}
        <div className="mb-4 flex items-center">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            className="ml-2 p-2 border rounded-md w-full"
            placeholder="Search Messages"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Compose Message Modal */}
        {isComposing && (
          <div className="p-6 bg-white shadow-md rounded-md mb-4">
            <h3 className="text-xl font-semibold">Compose Message</h3>
            <div className="mt-4">
              <input
                type="text"
                name="sender"
                placeholder="Sender"
                className="w-full p-2 border rounded-md mb-2"
                value={newMessage.sender}
                onChange={handleMessageChange}
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="w-full p-2 border rounded-md mb-2"
                value={newMessage.subject}
                onChange={handleMessageChange}
              />
              <textarea
                name="body"
                placeholder="Message Body"
                className="w-full p-2 border rounded-md mb-2"
                value={newMessage.body}
                onChange={handleMessageChange}
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Send
                </button>
                <button
                  onClick={() => setIsComposing(false)}
                  className="ml-4 text-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Message List */}
        <div className="space-y-4">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((message) => (
              <MessageItem
                key={message.id}
                message={message}
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDeleteMessage}
              />
            ))
          ) : (
            <div className="text-center text-gray-500">No messages found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mailbox;
