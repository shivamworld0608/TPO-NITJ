/* import React, { useState, useEffect } from "react";
import { FaSearch, FaEnvelope, FaTimes, FaArrowLeft, FaTrash } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import axios from "axios";

const socket = io(`${import.meta.env.REACT_APP_BASE_URL}`);

const MailboxComponent = ({ userType = "Student" }) => {
  const { userData } = useSelector((state) => state.auth);
  const userEmail = userData.email;
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [newMessage, setNewMessage] = useState({
    sender: userEmail,
    subject: "",
    body: "",
    metadata: {},
  });
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const [filterValue, setFilterValue] = useState("");

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

    socket.on("newMail", (mail) => {
      if (mail.recipients.includes(userEmail)) {
        setMessages((prev) => [...prev, mail]);
      }
    });

    return () => {
      socket.off("newMail");
    };
  }, [userEmail]);

  const handleSendMessage = async () => {
    try {
      const payload = {
        ...newMessage,
        senderType: userType,
        metadata: userType === "Professor" ? { filter: filterType, value: filterValue } : {},
      };

      let endpoint = "";
      if (userType === "Student") endpoint = "/mailbox/send-to-professors";
      else if (userType === "Professor" || userType === "Recruiter") endpoint = "/mailbox/send-to-students";

      const response = await axios.post(
        `${import.meta.env.REACT_APP_BASE_URL}${endpoint}`,
        payload,
        { withCredentials: true }
      );

      socket.emit("sendMail", response.data.mail);
      setIsComposing(false);
      setNewMessage({ sender: userEmail, subject: "", body: "", metadata: {} });
      if (userType === "Professor") {
        setFilterType("all");
        setFilterValue("");
      }
    } catch (error) {
      console.error("Error sending mail:", error);
    }
  };

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

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "All" || message.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 w-full flex flex-col space-y-4 max-w-7xl mx-auto">
      <h1 className="font-bold text-3xl lg:text-4xl text-center tracking-wide mb-6">
        Mail<span className="bg-custom-blue text-transparent bg-clip-text">Box</span>
      </h1>
      
      <div className="mb-6 flex flex-col lg:flex-row items-center gap-y-4">
        <div className="flex items-center gap-2 w-full max-w-xl">
          <FaSearch className="text-custom-blue text-lg" />
          <input
            type="text"
            className="p-3 border border-gray-200 rounded-xl w-full focus:ring-2 focus:ring-custom-blue focus:border-transparent"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {["All", "Inbox", "Sent", "Pending", "Draft"].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-xl transition-colors ${
                selectedFilter === filter
                  ? "bg-custom-blue text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {filter}
            </button>
          ))}
          <button
            onClick={() => setIsComposing(true)}
            className="bg-custom-blue text-white px-4 py-2 rounded-xl hover:bg-blue-600 flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPenToSquare} />
            Compose
          </button>
        </div>
      </div>

      {isComposing && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-semibold">New Message</h3>
              <button
                onClick={() => setIsComposing(false)}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Enter subject"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-blue focus:border-transparent"
                  value={newMessage.subject}
                  onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                />
              </div>
              
              {userType === "Professor" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Filter Students By</label>
                    <select
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-blue focus:border-transparent"
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                    >
                      <option value="all">All Students</option>
                      <option value="batch">Batch</option>
                      <option value="course">Course</option>
                      <option value="department">Department</option>
                    </select>
                  </div>
                  {filterType !== "all" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                      </label>
                      <input
                        type="text"
                        placeholder={`Enter ${filterType}`}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-blue focus:border-transparent"
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  name="body"
                  placeholder="Write your message here..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-blue focus:border-transparent h-48"
                  value={newMessage.body}
                  onChange={(e) => setNewMessage({ ...newMessage, body: e.target.value })}
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setIsComposing(false)}
                className="px-6 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                className="px-6 py-2 bg-custom-blue text-white rounded-lg hover:bg-blue-600"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedMessage ? (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setSelectedMessage(null)}
              className="text-custom-blue hover:text-blue-600 flex items-center gap-2"
            >
              <FaArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Inbox</span>
            </button>
            <button
              onClick={() => handleDeleteMessage(selectedMessage._id)}
              className="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50"
            >
              <FaTrash className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedMessage.subject}</h2>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">{selectedMessage.sender}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500">{selectedMessage.senderType}</span>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(selectedMessage.timestamp).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap border-t border-gray-100 pt-6">
            {selectedMessage.body}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((message) => (
              <div
                key={message._id}
                className={`group flex items-center p-4 rounded-xl border border-gray-200 hover:border-custom-blue hover:shadow-md transition-all cursor-pointer ${
                  !message.read ? "bg-white border-custom-blue/30 shadow-sm" : "bg-gray-50"
                }`}
                onClick={() => {
                  if (!message.read) handleMarkAsRead(message._id);
                  setSelectedMessage(message);
                }}
              >
                <div className="flex-shrink-0 mr-4 relative">
                  <FaEnvelope
                    className={`w-5 h-5 ${message.read ? "text-gray-400" : "text-custom-blue"}`}
                  />
                  {!message.read && (
                    <div className="absolute top-0 right-0 w-2 h-2 bg-custom-blue rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-sm font-medium truncate ${
                        !message.read ? "text-custom-blue" : "text-gray-900"
                      }`}
                    >
                      {message.sender}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(message.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-900 font-medium truncate">{message.subject}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {message.body.substring(0, 80)}...
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteMessage(message._id);
                  }}
                  className="ml-4 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              No messages found in {selectedFilter.toLowerCase()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MailboxComponent; */