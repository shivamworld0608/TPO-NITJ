/* import React, { useState, useEffect } from "react";
import { FaSearch, FaEnvelope, FaTimes, FaArrowLeft } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import io from "socket.io-client";
import axios from "axios";
import { useSelector } from "react-redux";
import Select from "react-select";
import toast from "react-hot-toast";



const socket = io(`${import.meta.env.REACT_APP_BASE_URL}`);


const batchOptions = [
  { value: "2025", label: "2025" },
  { value: "2026", label: "2026" },
  { value: "2027", label: "2027" },
];

const courseOptions = [
  { value: "B.Tech", label: "B.Tech" },
  { value: "M.Tech", label: "M.Tech" },
  { value: "MBA", label: "MBA" },
  { value: "MSc", label: "MSc" },
  { value: "PhD", label: "PhD" },
];

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];


const btechdepartmentOptions = [
  {
    label: "Biotechnology",
    options: [{ value: "Biotechnology", label: "Biotechnology" }],
  },
  {
    label: "Chemical Engineering",
    options: [{ value: "Chemical Engineering", label: "Chemical Engineering" }],
  },
  {
    label: "Civil Engineering",
    options: [{ value: "Civil Engineering", label: "Civil Engineering" }],
  },
  {
    label: "Computer Science & Engineering",
    options: [
      { value: "Computer Science & Engineering", label: "Computer Science & Engineering" },
      { value: "Data Science and Engineering", label: "Data Science and Engineering" },
    ],
  },
  {
    label: "Electrical Engineering",
    options: [{ value: "Electrical Engineering", label: "Electrical Engineering" }],
  },
  {
    label: "Electronics & Communication Engineering",
    options: [
      { value: "Electronics & Communication Engineering", label: "Electronics & Communication Engineering" },
      { value: "Electronics and VLSI Engineering", label: "Electronics and VLSI Engineering" },
    ],
  },
  {
    label: "Industrial and Production Engineering",
    options: [{ value: "Industrial and Production Engineering", label: "Industrial and Production Engineering" }],
  },
  {
    label: "Information Technology",
    options: [{ value: "Information Technology", label: "Information Technology" }],
  },
  {
    label: "Instrumentation and Control Engineering",
    options: [{ value: "Instrumentation and Control Engineering", label: "Instrumentation and Control Engineering" }],
  },
  {
    label: "Mathematics and Computing",
    options: [{ value: "Mathematics and Computing", label: "Mathematics and Computing" }],
  },
  {
    label: "Mechanical Engineering",
    options: [{ value: "Mechanical Engineering", label: "Mechanical Engineering" }],
  },
  {
    label: "Textile Technology",
    options: [{ value: "Textile Technology", label: "Textile Technology" }],
  },
];


const mtechdepartmentOptions = [
  {
    label: "Biotechnology",
    options: [{ value: "Biotechnology", label: "Biotechnology" }],
  },
  {
    label: "Chemical Engineering",
    options: [{ value: "Chemical Engineering", label: "Chemical Engineering" }],
  },
  {
    label: "Civil Engineering",
    options: [
      { value: "Structural and Construction Engineering", label: "Structural and Construction Engineering" },
      { value: "Geotechnical and Geo-Environmental Engineering", label: "Geotechnical and Geo-Environmental Engineering" },
    ],
  },
  {
    label: "Computer Science & Engineering",
    options: [
      { value: "Computer Science & Engineering", label: "Computer Science & Engineering" },
      { value: "Information Security", label: "Information Security" },
      { value: "Data Science and Engineering", label: "Data Science and Engineering" },
    ],
  },
  {
    label: "Electrical Engineering",
    options: [{ value: "Electric Vehicle Design", label: "Electric Vehicle Design" }],
  },
  {
    label: "Electronics & Communication Engineering",
    options: [
      { value: "Signal Processing and Machine Learning", label: "Signal Processing and Machine Learning" },
      { value: "VLSI Design", label: "VLSI Design" },
    ],
  },
  {
    label: "Industrial & Production Engineering",
    options: [
      { value: "Industrial Engineering and Data Analytics", label: "Industrial Engineering and Data Analytics" },
      { value: "Manufacturing Technology With Machine Learning", label: "Manufacturing Technology With Machine Learning" },
    ],
  },
  {
    label: "Information Technology",
    options: [{ value: "Data Analytics", label: "Data Analytics" }],
  },
  {
    label: "Instrumentation and Control Engineering",
    options: [
      { value: "Control and Instrumentation", label: "Control and Instrumentation" },
      { value: "Machine Intelligence and Automation", label: "Machine Intelligence and Automation" },
    ],
  },
  {
    label: "Mathematics and Computing",
    options: [{ value: "Mathematics and Computing", label: "Mathematics and Computing" }],
  },
  {
    label: "Mechanical Engineering",
    options: [
      { value: "Design Engineering", label: "Design Engineering" },
      { value: "Thermal and Energy Engineering", label: "Thermal and Energy Engineering" },
    ],
  },
  {
    label: "Textile Engineering",
    options: [{ value: "Textile Engineering and Management", label: "Textile Engineering and Management" }],
  },
  {
    label: "Renewable Energy",
    options: [{ value: "Renewable Energy", label: "Renewable Energy" }],
  },
  {
    label: "Artificial Intelligence",
    options: [{ value: "Artificial Intelligence", label: "Artificial Intelligence" }],
  },
  {
    label: "Power Systems and Reliability",
    options: [{ value: "Power Systems and Reliability", label: "Power Systems and Reliability" }],
  },
];


const mbadepartmentOptions = [
  { value: "Finance", label: "Finance" },
  { value: "Human Resource", label: "Human Resource" },
  { value: "Marketing", label: "Marketing" },
];


const mscdepartmentOptions = [
  { value: "Chemistry", label: "Chemistry" },
  { value: "Mathematics", label: "Mathematics" },
  { value: "Physics", label: "Physics" },
];


const phddepartmentOptions = [
  { value: "Biotechnology", label: "Biotechnology" },
  { value: "Chemical Engineering", label: "Chemical Engineering" },
  { value: "Civil Engineering", label: "Civil Engineering" },
  { value: "Computer Science and Engineering", label: "Computer Science and Engineering" },
  { value: "Electrical Engineering", label: "Electrical Engineering" },
  { value: "Electronics and Communication Engineering", label: "Electronics and Communication Engineering" },
  { value: "Industrial and Production Engineering", label: "Industrial and Production Engineering" },
  { value: "Information Technology", label: "Information Technology" },
  { value: "Instrumentation and Control Engineering", label: "Instrumentation and Control Engineering" },
  { value: "Mechanical Engineering", label: "Mechanical Engineering" },
  { value: "Textile Technology", label: "Textile Technology" },
];


const departmentOptionsMapping = {
  "B.Tech": btechdepartmentOptions,
  "M.Tech": mtechdepartmentOptions,
  "MBA": mbadepartmentOptions,
  "MSc": mscdepartmentOptions,
  "PhD": phddepartmentOptions,
};


const MailboxComponent = ({ userType = "Professor" }) => {
  const { userData } = useSelector((state) => state.auth);
  const userEmail = userData.email;
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedMessage, setSelectedMessage] = useState(null);

  
  const [newMessage, setNewMessage] = useState({
    sender: userEmail,
    subject: "",
    body: "",
    metadata: {
      batch: [],
      course: [],
      department: [],
      gender: [],
      branch: [],
    },
  });

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

  
  const getBranchOptions = () => {
    let options = [];
    newMessage.metadata.course.forEach((courseOption) => {
      const courseValue = courseOption.value;
      if (departmentOptionsMapping[courseValue]) {
        options = options.concat(departmentOptionsMapping[courseValue]);
      }
    });
    return options;
  };

  const handleSendMessage = async () => {
    try {
      const payload = {
        ...newMessage,
        senderType: userType,
      };
      let endpoint = "";
      if (userType === "Student") {
        endpoint = "/mailbox/send-to-professors";
      } else if (userType === "Professor") {
        endpoint = "/mailbox/send-to-students";
      } else if (userType === "Recruiter") {
        endpoint = "/mailbox/send-to-students";
      }
      const response = await axios.post(
        `${import.meta.env.REACT_APP_BASE_URL}${endpoint}`,
        payload,
        { withCredentials: true }
      );
      socket.emit("sendMail", response.data.mail);
      console.log("hello");
      setIsComposing(false);
      
      setNewMessage({
        sender: userEmail,
        subject: "",
        body: "",
        metadata: {
          batch: [],
          course: [],
          department: [],
          gender: [],
          branch: [],
        },
      });
    } catch (error) {
      console.error("Error sending mail:", error);
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.REACT_APP_BASE_URL}/mailbox/delete/${id}`,
        { data: { email: userEmail }, withCredentials: true }
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
        { email: userEmail },
        { withCredentials: true }
      );
      setMessages((prev) =>
        prev.map((message) => {
          
          const updatedStatuses = message.userStatuses.map((status) =>
            status.userId === userEmail ? { ...status, read: true } : status
          );
          return { ...message, userStatuses: updatedStatuses };
        })
      );
    } catch (error) {
      console.error("Error marking mail as read:", error);
    }
  };

  
  const filteredMessages = messages.filter((message) => {
    const userStatus = message.userStatuses.find(
      (status) => status.userId === userEmail
    );
    
    const matchesSearch =
      message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "All" || (userStatus && userStatus.category === selectedFilter);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 w-full flex flex-col space-y-4">
      <h1 className="font-bold text-3xl lg:text-4xl text-center tracking-wide mb-4">
        Mail<span className="bg-custom-blue text-transparent bg-clip-text">Box</span>
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
          {["All", "Inbox", "Sent", "Draft"].map((filter) => (
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
          <div className="p-6 bg-white shadow-md rounded-md w-1/2">
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
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Select Batch(es)
              </label>
              <Select
                isMulti
                options={batchOptions}
                value={newMessage.metadata.batch}
                onChange={(selected) =>
                  setNewMessage({
                    ...newMessage,
                    metadata: { ...newMessage.metadata, batch: selected },
                  })
                }
              />

              <label className="block text-sm font-medium text-gray-700">
                Select Course(s)
              </label>
              <Select
                isMulti
                options={courseOptions}
                value={newMessage.metadata.course}
                onChange={(selected) =>
                  setNewMessage({
                    ...newMessage,
                    metadata: { ...newMessage.metadata, course: selected, branch: [] },
                  })
                }
              />

              <label className="block text-sm font-medium text-gray-700">
                Select Department(s)
              </label>
              <Select
                isMulti
                options={
                  
                  [].concat(...Object.values(departmentOptionsMapping))
                }
                value={newMessage.metadata.department}
                onChange={(selected) =>
                  setNewMessage({
                    ...newMessage,
                    metadata: { ...newMessage.metadata, department: selected },
                  })
                }
              />

              <label className="block text-sm font-medium text-gray-700">
                Select Gender(s)
              </label>
              <Select
                isMulti
                options={genderOptions}
                value={newMessage.metadata.gender}
                onChange={(selected) =>
                  setNewMessage({
                    ...newMessage,
                    metadata: { ...newMessage.metadata, gender: selected },
                  })
                }
              />

              {newMessage.metadata.course.length > 0 && (
                <>
                  <label className="block text-sm font-medium text-gray-700">
                    Select Branch(es)
                  </label>
                  <Select
                    isMulti
                    options={getBranchOptions()}
                    value={newMessage.metadata.branch}
                    onChange={(selected) =>
                      setNewMessage({
                        ...newMessage,
                        metadata: { ...newMessage.metadata, branch: selected },
                      })
                    }
                  />
                </>
              )}
            </div>

            <div className="flex justify-end mt-4">
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
                  
                  message.userStatuses.find((s) => s.userId === userEmail)?.read
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
                {!message.userStatuses.find((s) => s.userId === userEmail)?.read && (
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

export default MailboxComponent; */