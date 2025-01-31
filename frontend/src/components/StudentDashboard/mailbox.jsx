import React, { useState, useEffect } from "react";
import { FaSearch, FaEnvelope, FaTimes, FaArrowLeft } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import io from "socket.io-client";
import axios from "axios";

const socket = io(`${import.meta.env.REACT_APP_BASE_URL}`); // WebSocket server URL

const MailboxComponent = ({ userEmail, userType }) => {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [newMessage, setNewMessage] = useState({
    sender: userEmail,
    subject: "",
    body: "",
    metadata: {}, // Add metadata for filtering
  });
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filterType, setFilterType] = useState("all"); // Track the selected filter type
  const [filterValue, setFilterValue] = useState(""); // Track the filter value

  // Fetch initial emails
  useEffect(() => {
    const fetchMails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.REACT_APP_BASE_URL}/mailbox/fetch/${userEmail}`,
          { withCredentials: true }
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching mails:", error);
      }
    };

    fetchMails();

    // Listen for new mails via WebSocket
    socket.on("newMail", (mail) => {
      if (mail.recipients.includes(userEmail)) {
        setMessages((prev) => [...prev, mail]);
      }
    });

    return () => {
      socket.off("newMail");
    };
  }, [userEmail]);

  // Handle sending a new email
  const handleSendMessage = async () => {
    try {
      const payload = {
        ...newMessage,
        senderType: userType, // Use the userType prop (Student, Professor, Recruiter)
        metadata: {
          filter: filterType, // e.g., "batch", "course", "department"
          value: filterValue, // e.g., "2023", "B.Tech", "Computer Science"
        },
      };

      let endpoint = "";
      if (userType === "Student") {
        endpoint = "/mailbox/send-to-professors"; // Students can only send to professors
      } else if (userType === "Professor") {
        endpoint = "/mailbox/send-to-students"; // Professors can send to students or recruiters
      } else if (userType === "Recruiter") {
        endpoint = "/mailbox/send-to-students"; // Recruiters can send to students
      }

      const response = await axios.post(
        `${import.meta.env.REACT_APP_BASE_URL}${endpoint}`,
        payload,
        { withCredentials: true }
      );

      socket.emit("sendMail", response.data.mail); // Notify via WebSocket
      setIsComposing(false);
      setNewMessage({ sender: userEmail, subject: "", body: "", metadata: {} });
      setFilterType("all"); // Reset filter type
      setFilterValue(""); // Reset filter value
    } catch (error) {
      console.error("Error sending mail:", error);
    }
  };

  // Handle deleting an email
  const handleDeleteMessage = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.REACT_APP_BASE_URL}/mailbox/delete/${id}`,
        { withCredentials: true }
      );
      setMessages((prev) => prev.filter((message) => message._id !== id));
    } catch (error) {
      console.error("Error deleting mail:", error);
    }
  };

  // Handle marking an email as read
  const handleMarkAsRead = async (id) => {
    try {
      await axios.patch(
        `${import.meta.env.REACT_APP_BASE_URL}/mailbox/mark-as-read/${id}`,
        {},
        { withCredentials: true }
      );
      setMessages((prev) =>
        prev.map((message) =>
          message._id === id ? { ...message, read: true } : message
        )
      );
    } catch (error) {
      console.error("Error marking mail as read:", error);
    }
  };

  // Handle filtering messages
  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "All" || message.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 w-full flex flex-col space-y-4">
      <h1 className="font-bold text-3xl lg:text-4xl text-center tracking-wide mb-4">
        Mail
        <span className="bg-custom-blue text-transparent bg-clip-text">Box</span>
      </h1>
      <div className="mb-4 flex flex-col lg:flex-row items-center gap-y-4">
        <div className="flex items-center gap-2 w-full">
          <FaSearch className="text-custom-blue" />
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-2xl w-full lg:w-1/2"
            placeholder="Search Messages"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center sm:gap-4 gap-1">
          {["All", "Inbox", "Sent", "Pending", "Draft"].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`flex-1 sm:px-4 p-2 rounded-3xl ${
                selectedFilter === filter
                  ? "bg-custom-blue text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {filter}
            </button>
          ))}
          <button
            onClick={() => setIsComposing(true)}
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
                <FaTimes className="text-custom-blue" />
              </button>
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="w-full p-2 border rounded-md mb-2"
              value={newMessage.subject}
              onChange={(e) =>
                setNewMessage({ ...newMessage, subject: e.target.value })
              }
            />
            <textarea
              name="body"
              placeholder="Message Body"
              className="w-full p-2 border rounded-md mb-4"
              value={newMessage.body}
              onChange={(e) =>
                setNewMessage({ ...newMessage, body: e.target.value })
              }
            />
            {userType === "Professor" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Filter Students
                </label>
                <select
                  className="w-full p-2 border rounded-md mb-2"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All Students</option>
                  <option value="batch">By Batch</option>
                  <option value="course">By Course</option>
                  <option value="department">By Department</option>
                </select>
                {filterType !== "all" && (
                  <input
                    type="text"
                    placeholder={`Enter ${filterType}`}
                    className="w-full p-2 border rounded-md"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                  />
                )}
              </div>
            )}
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
            onClick={() => setSelectedMessage(null)}
            className="text-gray-500 mb-4"
          >
            <FaArrowLeft className="mr-2 text-custom-blue" /> Back
          </button>
          <h3 className="text-xl font-semibold mb-4">
            {selectedMessage.subject}
          </h3>
          <p className="text-gray-500 mb-4">{selectedMessage.sender}</p>
          <p>{selectedMessage.body}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((message) => (
              <div
                key={message._id}
                className={`flex items-center p-4 mb-4 rounded-md border transition-all duration-300 ${
                  message.read
                    ? "bg-gray-100 border-gray-300"
                    : "bg-white border-custom-blue hover:border-blue-500"
                }`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="flex-shrink-0">
                  <FaEnvelope className="text-custom-blue" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="font-semibold">{message.sender}</p>
                  <p className="text-sm">{message.subject}</p>
                  <p className="text-xs text-gray-500">
                    {message.body.substring(0, 50)}...
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(message.timestamp).toLocaleString()}
                  </p>
                </div>
                {!message.read && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkAsRead(message._id);
                    }}
                    className="ml-3 text-custom-blue hover:text-blue-400"
                  >
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteMessage(message._id);
                  }}
                  className="ml-3 text-red-500 hover:text-red-600"
                >
                  <FaTimes />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No messages found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MailboxComponent;