/* import React, { useState } from "react";
import { FaSearch, FaEnvelope, FaTimes, FaArrowLeft } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const sampleMessages = [
  {
    id: 1,
    sender: "john.doe@example.com",
    subject: "Job Application Update",
    preview: "Your application has been reviewed and...",
    fullMessage:
      "Your application has been reviewed and we would like to inform you that you have been shortlisted for the next round of interviews.",
    timestamp: new Date().getTime() - 3600000, // 1 hour ago
    read: false,
    category: "Inbox",
  },
  {
    id: 2,
    sender: "jane.smith@example.com",
    subject: "Interview Invitation",
    preview: "We would like to invite you for an interview...",
    fullMessage:
      "We would like to invite you for an interview on Monday at 10 AM. Please confirm your availability.",
    timestamp: new Date().getTime() - 7200000, // 2 hours ago
    read: true,
    category: "Sent",
  },
  {
    id: 3,
    sender: "hr@company.com",
    subject: "Offer Letter",
    preview: "Congratulations! We are pleased to offer you the position...",
    fullMessage:
      "Congratulations! We are pleased to offer you the position of Software Engineer. Please find the attached offer letter for your review.",
    timestamp: new Date().getTime() - 10800000, // 3 hours ago
    read: false,
    category: "Pending",
  },
];

const MessageItem = ({ message, onMarkAsRead, onDelete, onSelect }) => {
  const { sender, subject, preview, timestamp, read } = message;

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
      className={`flex items-center p-4 mb-4 rounded-md border transition-all duration-300 ${
        read
          ? "bg-gray-100 border-gray-300"
          : "bg-white border-custom-blue  hover:border-blue-500"
      }`}
      onClick={() => onSelect(message)}
    >
      <div className="flex-shrink-0">
        <FaEnvelope className="text-custom-blue" />
      </div>
      <div className="ml-3 flex-1">
        <p className="font-semibold">{sender}</p>
        <p className="text-sm">{subject}</p>
        <p className="text-xs text-gray-500">{preview}</p>
        <p className="text-xs text-gray-500">{timeAgo(timestamp)}</p>
      </div>
      {!read && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMarkAsRead(message.id);
          }}
          className="ml-3 text-custom-blue hover:text-blue-400"
        >
          Mark as Read
        </button>
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(message.id);
        }}
        className="ml-3 text-red-500 hover:text-red-600"
      >
        <FaTimes />
      </button>
    </div>
  );
};

const MailboxComponent = () => {
  const [messages, setMessages] = useState(sampleMessages);
  const [searchTerm, setSearchTerm] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [newMessage, setNewMessage] = useState({
    sender: "",
    subject: "",
    body: "",
  });
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleDeleteMessage = (id) => {
    const updatedMessages = messages.filter((message) => message.id !== id);
    setMessages(updatedMessages);
  };

  const handleMarkAsRead = (id) => {
    const updatedMessages = messages.map((message) =>
      message.id === id ? { ...message, read: true } : message
    );
    setMessages(updatedMessages);
  };

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "All" || message.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleComposeMessage = () => {
    setIsComposing(true);
    setSelectedMessage(null);
  };

  const handleMessageChange = (e) => {
    const { name, value } = e.target;
    setNewMessage({
      ...newMessage,
      [name]: value,
    });
  };

  const handleSendMessage = () => {
    const newMessageObj = {
      id: messages.length + 1,
      sender: newMessage.sender,
      subject: newMessage.subject,
      preview: newMessage.body.substring(0, 50) + "...",
      fullMessage: newMessage.body,
      timestamp: new Date().getTime(),
      read: false,
      category: "Inbox",
    };
    setMessages([...messages, newMessageObj]);
    setIsComposing(false);
    setNewMessage({ sender: "", subject: "", body: "" });
  };

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };

  const handleBackToMailbox = () => {
    setSelectedMessage(null);
  };

  return (
    <div className="p-6 w-full flex flex-col space-y-4">
  
        <h1 className="font-bold text-3xl lg:text-4xl text-center tracking-wide mb-4">
        Mail
        <span className="bg-custom-blue text-transparent bg-clip-text">
          Box
        </span>
      </h1>
        <div className="mb-4 flex flex-col lg:flex-row items-center gap-y-4">
         <div className="flex items-center gap-2  w-full ">
          <FaSearch className="text-custom-blue " />
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-2xl w-full lg:w-1/2"
            placeholder="Search Messages"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          </div>

<div className="flex items-center gap-4">
          {["All", "Inbox", "Sent", "Pending", "Draft"].map((filter) => (
        
          <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`flex-1 px-4 p-2 rounded-3xl ${
                selectedFilter === filter
                  ? "bg-custom-blue text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {filter}
            </button>
          ))}
          <button
            onClick={handleComposeMessage}
            className="bg-custom-blue text-white px-4 py-2 rounded-3xl hover:bg-blue-600"
          >
            <FontAwesomeIcon icon={faPenToSquare} className="p-0.5" />
          </button>
          </div>
        </div>
        {isComposing && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
            <div className="p-6 bg-white shadow-md rounded-md w-1/3">
              <div className="flex justify-between">
                <h3 className="text-xl font-semibold mb-4">Compose Message</h3>
                <button
                  onClick={() => setIsComposing(false)}
                  className="text-gray-500 mb-4"
                >
                  <FaTimes className="text-custom-blue " />
                </button>
                


              </div>
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
                className="w-full p-2 border rounded-md mb-4"
                value={newMessage.body}
                onChange={handleMessageChange}
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSendMessage}
                  className="bg-custom-blue text-white px-4 py-2 rounded-md hover:bg-blue-600"
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

        {selectedMessage ? (
          <div className="p-6 bg-white shadow-md rounded-md mb-4">
            <button
              onClick={handleBackToMailbox}
              className="text-gray-500 mb-4"
            >
              <FaArrowLeft className="mr-2 text-custom-blue" /> Back
            </button>
            <h3 className="text-xl font-semibold mb-4">
              {selectedMessage.subject}
            </h3>
            <p className="text-gray-500 mb-4">{selectedMessage.sender}</p>
            <p>{selectedMessage.fullMessage}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message) => (
                <MessageItem
                  key={message.id}
                  message={message}
                  onMarkAsRead={handleMarkAsRead}
                  onDelete={handleDeleteMessage}
                  onSelect={handleSelectMessage}
                />
              ))
            ) : (
              <div className="text-center text-gray-500">
                No messages found.
              </div>
            )}
          </div>
        )}
    </div>
  );
};

export default MailboxComponent;
 */