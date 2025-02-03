import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../Redux/authSlice";
import { Eye, EyeOff, User } from "lucide-react";

const LoginSignup = ({Login}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLogin, setIsLogin] = useState(Login);
  const [userType, setUserType] = useState("Student");
  const [rollno, setRollno] = useState("");
  const [department, setDepartment] = useState("");
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
    setRollno("");
    setDepartment("");
    setCompany("");
    setDesignation("");
    setFacultyId("");
    setError("");
    setEmailError("");
    setPasswordError("");
  }, [userType]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@nitj\.ac\.in$/;
    return emailRegex.test(email);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    let valid = true;

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;

    try {
      await toast
        .promise(
          axios.post(`${import.meta.env.REACT_APP_BASE_URL}/auth/login`, { email, password }, { withCredentials: true }),
          {
            loading: "Logging in...",
            success: "Login successful!",
            error: "Invalid Email or Password",
          }
        )
        .then((response) => {
          dispatch(setAuthUser({ authUser: true, userData: response.data.user,userType:response.data.userType }));
          if (response.data.userType === "Student") {
            navigate("/sdashboard/home");
          } else if (response.data.userType === "Recuiter") {
            navigate("/rdashboard/home");
          } else if (response.data.userType === "Professor") {
            navigate("/pdashboard/dashboard");
          }
        });
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (userType != "Recruiter" && !validateEmail(email)) {
      setEmailError("Please enter a valid NITJ email address.");
      return;
    }

    const signupData = { email, password, name };

    if (userType === "Student") {
      signupData.rollno = rollno;
      signupData.department = department;
    } else if (userType === "Recuiter") {
      signupData.company = company;
      signupData.designation = designation;
    } else if (userType === "Professor") {
      signupData.facultyId = facultyId;
      signupData.department = department;
    }

    const apiEndpoint =
      userType === "Student"
        ? "/auth/student/signup"
        : userType === "Recruiter"
        ? "/auth/recuiter/signup"
        : "/auth/professor/signup";

    try {
      await toast
        .promise(
          axios.post(`${import.meta.env.REACT_APP_BASE_URL}${apiEndpoint}`, signupData, { withCredentials: true }),
          {
            loading: "Signing up...",
            success: "Signup successful!",
            error: "Signup failed. Try again.",
          }
        )
        .then((response) => {
          dispatch(setAuthUser({ authUser: true, userData: response.data.user, }));
          userType === "Student" ? navigate("/sdashboard/home") : userType === "Recruiter" ? navigate("/rdashboard/createdjob") : navigate("/pdashboard")
          setIsLogin(true);
        });
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="border border-custom-blue relative w-full max-w-sm mx-4 p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-gray-900">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            {isLogin ? "Please enter your login details" : "Please fill in the details to sign up"}
          </p>
        </div>

        {isLogin ? (
          <form onSubmit={handleLogin} className="mt-6 space-y-4 flex flex-col">
            <input
              className="w-full px-4 py-3 rounded-md font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-custom-blue"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
            <div className="relative w-full">
            <input
              className="w-full px-4 py-3 rounded-md font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-custom-blue"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
        <span
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
        >
          {showPassword ? (
            <Eye className="h-5 w-5 text-gray-500" />
          ) : (
            <EyeOff className="h-5 w-5 text-gray-500" />
          )}
        </span>
        </div>
            {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}

            {error && <p className="text-red-500 text-xs text-center">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 rounded-md bg-custom-blue text-white font-semibold hover:bg-blue-500 transition duration-300 z-10"
            >
              Login
            </button>
           {/*  <p className="text-custom-blue text-xs text-center">
              Don't have an account?{" "}
              <span
                className="text-gray-500 cursor-pointer"
                onClick={() => setIsLogin(false)}
              >
                Signup
              </span>
            </p> */}
          </form>
        ) : (
          <form onSubmit={handleSignup} className="mt-6 space-y-4 flex flex-col">
            <div className="flex justify-center space-x-4 mb-4">
              <button
                type="button"
                className={`px-4 py-2 rounded-md font-medium ${
                  userType === "Student" ? "bg-custom-blue text-white" : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setUserType("Student")}
              >
                Student
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-md font-medium ${
                  userType === "Recruiter" ? "bg-custom-blue text-white" : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setUserType("Recruiter")}
              >
                Recruiter
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-md font-medium ${
                  userType === "Professor" ? "bg-custom-blue text-white" : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setUserType("Professor")}
              >
                Professor
              </button>
            </div>

            <input
              className="w-full px-4 py-3 rounded-md font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-custom-blue"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              className="w-full px-4 py-3 rounded-md font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-custom-blue"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <p className="text-red-500 text-xs">{emailError}</p>}

        <div className="relative w-full">
        <input
          className="w-full px-4 py-3 rounded-md font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-custom-blue"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
        >
          {showPassword ? (
            <Eye className="h-5 w-5 text-gray-500" />
          ) : (
            <EyeOff className="h-5 w-5 text-gray-500" />
          )}
        </span>
        </div>
            {userType === "Student" && (
              <>
                <input
                  className="w-full px-4 py-3 rounded-md font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-custom-blue"
                  type="text"
                  value={rollno}
                  onChange={(e) => setRollno(e.target.value)}
                  placeholder="Enter your roll number"
                  required
                />
                <input
                  className="w-full px-4 py-3 rounded-md font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-custom-blue"
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="Enter your department"
                  required
                />
              </>
            )}

            {userType === "Recruiter" && (
              <>
                <input
                  className="w-full px-4 py-3 rounded-md font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-custom-blue"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Enter your company name"
                  required
                />
                <input
                  className="w-full px-4 py-3 rounded-md font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-custom-blue"
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="Enter your job title"
                  required
                />
              </>
            )}

            {userType === "Professor" && (
              <>
                <input
                  className="w-full px-4 py-3 rounded-md font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-custom-blue"
                  type="text"
                  value={facultyId}
                  onChange={(e) => setFacultyId(e.target.value)}
                  placeholder="Enter your faculty ID"
                  required
                />
                <input
                  className="w-full px-4 py-3 rounded-md font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-custom-blue"
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="Enter your department"
                  required
                />
              </>
            )}

            {error && <p className="text-red-500 text-xs text-center">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 rounded-md bg-custom-blue text-white font-semibold hover:bg-blue-500 transition duration-300"
            >
              Signup
            </button>
            <p className="text-custom-blue text-xs text-center">
              Already have an account?{" "}
              <span
                className="text-gray-500 cursor-pointer"
                onClick={() => setIsLogin(true)}
              >
                Login
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
