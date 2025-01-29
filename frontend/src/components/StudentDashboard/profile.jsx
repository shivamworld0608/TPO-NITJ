import React, { useEffect, useState, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../../Redux/authSlice";
import toast from "react-hot-toast";
import BouncingLoader from "../BouncingLoader";

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [sendImage, setSendImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdatingPic, setIsUpdatingPic] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    rollno: "",
    department: "",
    year: "",
    batch: "",
    address: "",
    cgpa: "",
    gender: "",
    course:"",
    active_backlogs:"",
    backlogs_history:"",
    debarred:"",
    image: "",
  });

  const fileInputRef = useRef(null);
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData) {
      setUser(userData);
      setFormData({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        rollno: userData.rollno,
        department: userData.department,
        year: userData.year,
        batch: userData.batch,
        address: userData.address,
        cgpa: userData.cgpa,
        gender: userData.gender,
        course:userData.course,
        debarred:userData.debarred,
        active_backlogs:userData.active_backlogs,
        backlogs_history:userData.backlogs_history,
        image: userData.image,
      });
    }
  }, [userData]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfilePicUpdateToggle = () => {
    setIsUpdatingPic(!isUpdatingPic);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSendImage(e.target.files[0]);
    }
  };

  const handleProfilePicSubmit = async (e) => {
    e.preventDefault();
    if (!sendImage) return;
    try {
      const form = new FormData();
      form.append("file", sendImage);
      await toast
        .promise(
          axios.put(
            `${import.meta.env.REACT_APP_BASE_URL}/profile/update-picture`,
            form,
            { withCredentials: true }
          ),
          {
            loading: "Updating profile picture...",
            success: "Profile picture updated successfully!",
            error: "Failed to update profile picture",
          }
        )
        .then((response) => {
          //I can use response.data.user.profilePic here but for quick working i am using this
          setUser((prevUser) => ({
            ...prevUser,
            image: response.data.student.image,
          }));
          setIsUpdatingPic(false);
          setSendImage(null);
          dispatch(
            setAuthUser({ authUser: true, userData: response.data.student })
          );
        });
    } catch (err) {
      console.error(err);
      setError("Failed to update profile picture");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await toast
        .promise(
          axios.put(
            `${import.meta.env.REACT_APP_BASE_URL}/profile/update`,
            formData,
            { withCredentials: true }
          ),
          {
            loading: "Updating profile...",
            success: "Profile updated successfully!",
            error: "Failed to update profile",
          }
        )
        .then((response) => {
          setUser({ ...user, ...formData });
          setIsEditing(false);
          dispatch(
            setAuthUser({ authUser: true, userData: response.data.user })
          );
        });
    } catch (err) {
      console.error(err);
      setError("Failed to update profile");
    }
  };
  const triggerFileInput = () => {
    fileInputRef.current.click();
    setIsUpdatingPic(!isUpdatingPic);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <BouncingLoader size="medium" text="Loading..." />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 mt-1">
      <div className="shadow rounded-3xl overflow-hidden w-full max-w-xxl border-2 border-custom-blue">
        {/* Cover Section */}
        <div className="relative bg-gradient-to-r from-custom-blue to-custom-blue bg-cover bg-no-repeat h-40">
          <div className="absolute inset-0 opacity-50"></div>
        </div>

        {/* Profile Section */}
        <div className="relative -mt-12 text-center">
          <button onClick={triggerFileInput}>
            <img
              src={
                user.image ||
                "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
              }
              alt="Profile"
              className="w-40 h-40 rounded-full mx-auto border-4 border-custom-blue"
            />
          </button>
          {/* File input is now hidden, but triggered when the profile pic is clicked */}
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          {isUpdatingPic && (
            <div className="mt-4">
              <button
                onClick={handleProfilePicSubmit}
                className="bg-green-500 text-white px-4 py-1 border border-green-400 rounded"
              >
                Upload
              </button>
              <button
                onClick={handleProfilePicUpdateToggle}
                className="ml-2 bg-red-500 text-white px-4 py-1 border border-red-400 rounded"
              >
                Cancel
              </button>
            </div>
          )}

          {isEditing ? (
            <div>
              {/* <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="mt-2 p-2 mx-2 border border-custom-blue rounded"
              /> */}
         {/*      <input
                type="email"
                name="email"
                readOnly
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="mt-2 p-2 mx-2 border border-custom-blue rounded"
              /> */}
              <input
                type="string"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="mt-2 mx-2 p-2 border border-custom-blue rounded"
              />
            {/*   <input
                type="number"
                name="rollno"
                value={formData.rollno}
                onChange={handleChange}
                placeholder="Roll No."
                className="mt-2 mx-2 p-2 border border-custom-blue rounded"
              /> */}
              {/* <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="mt-2 mx-2 p-2 border border-custom-blue rounded"
              >
                <option value="">Select Department</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EE">EE</option>
                <option value="ME">ME</option>
                <option value="CE">CE</option>
                <option value="IT">IT</option>
                <option value="CH">CH</option>
                <option value="ICE">ICE</option>
                <option value="BT">BT</option>
                <option value="TT">TT</option>
                <option value="IPE">IPE</option>
              </select> */}
              {/* <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="mt-2 mx-2 p-2 border border-custom-blue rounded"
              >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select> */}
             {/*  <select
                name="batch"
                value={formData.batch}
                onChange={handleChange}
                className="mt-2 mx-2 p-2 border border-custom-blue rounded"
              >
                <option value="">Select Batch</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
              </select> */}
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="mt-2 p-2 mx-2 border border-custom-blue rounded"
              />
            {/*   <input
                type="text"
                name="cgpa"
                readOnly
                value={formData.cgpa}
                onChange={handleChange}
                placeholder="CGPA"
                className="mt-2 p-2 mx-2 border border-custom-blue rounded"
              /> */}
           {/*    <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-2 mx-2 p-2 border border-custom-blue rounded"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select> */}
              <button
                onClick={handleSubmit}
                className="mt-4 mx-2 bg-custom-blue text-white px-4 py-1 border border-custom-blue-400 rounded"
              >
                Save
              </button>
              <button
                onClick={handleEditToggle}
                className="mt-4 ml-2 bg-red-500 text-white px-4 py-1 border border-red-400 rounded"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <h4 className="mt-4 text-3xl font-semibold text-custom-blue">
                {user.name}
              </h4>
              <button
                onClick={handleEditToggle}
                className="bg-custom-blue text-white mt-5 px-4 py-1 border rounded"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>

      {/* About Section */}
<div className="mt-6 px-6 py-4">
  <h5 className="mb-3 ml-4 font-bold text-custom-blue">About</h5>
  <div className="p-4 bg-white border border-neutral-400 rounded-3xl">
    <div className="flex flex-wrap">
      {/* Left Column */}
      <div className="w-full md:w-1/2 space-y-6">
        <div className="flex items-center">
          <div className="text-white mx-4 bg-custom-blue h-10 w-10 p-2 justify-center items-center rounded-full">
            <CheckCircle2 />
          </div>
          <p className="font-italic tracking-tight">Name: {formData.name}</p>
        </div>
        <div className="flex items-center">
          <div className="text-white mx-4 bg-custom-blue h-10 w-10 p-2 justify-center items-center rounded-full">
            <CheckCircle2 />
          </div>
          <p className="font-italic tracking-tight">Gender: {formData.gender}</p>
        </div>
        <div className="flex items-center">
          <div className="text-white mx-4 bg-custom-blue h-10 w-10 p-2 justify-center items-center rounded-full">
            <CheckCircle2 />
          </div>
          <p className="font-italic tracking-tight">Email: {formData.email}</p>
        </div>
        <div className="flex items-center">
          <div className="text-white mx-4 bg-custom-blue h-10 w-10 p-2 justify-center items-center rounded-full">
            <CheckCircle2 />
          </div>
          <p className="font-italic tracking-tight">Mobile: {formData.phone}</p>
        </div>
        <div className="flex items-center">
          <div className="text-white mx-4 bg-custom-blue h-10 w-10 p-2 justify-center items-center rounded-full">
            <CheckCircle2 />
          </div>
          <p className="font-italic tracking-tight">Batch: {formData.batch}</p>
        </div>
        <div className="flex items-center">
          <div className="text-white mx-4 bg-custom-blue h-10 w-10 p-2 justify-center items-center rounded-full">
            <CheckCircle2 />
          </div>
          <p className="font-italic tracking-tight">
            Course: {formData.course}
          </p>
        </div>
        <div className="flex items-center">
          <div className="text-white mx-4 bg-custom-blue h-10 w-10 p-2 justify-center items-center rounded-full">
            <CheckCircle2 />
          </div>
          <p className="font-italic tracking-tight">
            Branch: {formData.department}
          </p>
        </div>
      </div>
      
      {/* Right Column */}
      <div className="w-full md:w-1/2 space-y-6">
        <div className="flex items-center">
          <div className="text-white mx-4 bg-custom-blue h-10 w-10 p-2 justify-center items-center rounded-full">
            <CheckCircle2 />
          </div>
          <p className="font-italic tracking-tight">CGPA: {formData.cgpa}</p>
        </div>
        <div className="flex items-center">
          <div className="text-white mx-4 bg-custom-blue h-10 w-10 p-2 justify-center items-center rounded-full">
            <CheckCircle2 />
          </div>
          <p className="font-italic tracking-tight">
            Branch: {formData.department}
          </p>
        </div>
        <div className="flex items-center">
          <div className="text-white mx-4 bg-custom-blue h-10 w-10 p-2 justify-center items-center rounded-full">
            <CheckCircle2 />
          </div>
          <p className="font-italic tracking-tight">
            Course: {formData.course}
          </p>
        </div>
        <div className="flex items-center">
          <div className="text-white mx-4 bg-custom-blue h-10 w-10 p-2 justify-center items-center rounded-full">
            <CheckCircle2 />
          </div>
          <p className="font-italic tracking-tight">Active Backlogs: {formData.active_backlogs?"Yes":"No"}</p>
        </div>
        <div className="flex items-center">
          <div className="text-white mx-4 bg-custom-blue h-10 w-10 p-2 justify-center items-center rounded-full">
            <CheckCircle2 />
          </div>
          <p className="font-italic tracking-tight">Backlogs History: {formData.backlogs_history?"Yes":"No"}</p>
        </div>
        <div className="flex items-center">
          <div className="text-white mx-4 bg-custom-blue h-10 w-10 p-2 justify-center items-center rounded-full">
            <CheckCircle2 />
          </div>
          <p className="font-italic tracking-tight">Debarred: {formData.debarred?"Yes":"No"}</p>
        </div>
        <div className="flex items-center">
          <div className="text-white mx-4 bg-custom-blue h-10 w-10 p-2 justify-center items-center rounded-full">
            <CheckCircle2 />
          </div>
          <p className="font-italic tracking-tight">Address: {formData.address}</p>
        </div>
      </div>
    </div>
  </div>
</div>

      </div>
    </div>
  );
}

export default Profile;
