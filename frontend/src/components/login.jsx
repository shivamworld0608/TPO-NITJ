import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../Redux/authSlice";
import { Eye, EyeOff } from "lucide-react";
import { Altcha } from "react-altcha";
import OTPVerification from "./lockedotpverification";
const LoginSignup = ({ Login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [isLogin, setIsLogin] = useState(Login);
  const [userType, setUserType] = useState("Student");
  const [rollno, setRollno] = useState("");
  const [department, setDepartment] = useState("");
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOTPVerification, setShowOTPVerification] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const altchaRef = useRef(null);

  useEffect(() => {
    setName("");
    setEmail("");
    setCode("");
    setPassword("");
    setRollno("");
    setDepartment("");
    setCompany("");
    setDesignation("");
    setFacultyId("");
    setError("");
    setEmailError("");
    setPasswordError("");
    setCodeError("");
  }, [userType]);

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@nitj\.ac\.in$/;
    return emailRegex.test(email);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      setIsSubmitting(false);
      return;
    }
  
    try {
      const captchaValue = altchaRef.current?.value;
  
      const response = await toast.promise(
        axios.post(
          `${import.meta.env.REACT_APP_BASE_URL}/auth/login`,
          { email, password, code, captcha: captchaValue },
          { withCredentials: true }
        ),
        {
          loading: "Logging in...",
          success: "Login successful!",
          error: "Invalid Email or Password",
        }
      );
      console.log(response);
      if (response.data.message === "Account locked. Please check your email for OTP.") {
        setShowOTPVerification(true);
        return;
    }

    console.log(showOTPVerification);
  
      dispatch(
        setAuthUser({
          authUser: true,
          userData: response.data.user,
          userType: response.data.userType,
        })
      );
  
      if (response.data.userType === "Student") {
        navigate("/sdashboard/home");
      } else if (response.data.userType === "Recuiter") {
        navigate("/rdashboard/home");
      } else if (response.data.userType === "Professor") {
        navigate("/pdashboard/dashboard");
      }
    } catch (error) {
        setError(error.response?.data?.message || "An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };
  // Handle signup form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    if (userType !== "Recruiter" && !validateEmail(email)) {
      setEmailError("Please enter a valid NITJ email address.");
      setIsSubmitting(false);
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
  
    const captchaValue = altchaRef.current?.value;
    signupData.captcha = captchaValue;
  
    const apiEndpoint =
      userType === "Student"
        ? "/auth/student/signup"
        : userType === "Recruiter"
        ? "/auth/recuiter/signup"
        : "/auth/professor/signup";
  
    try {
      const response = await toast.promise(
        axios.post(
          `${import.meta.env.REACT_APP_BASE_URL}${apiEndpoint}`,
          signupData,
          { withCredentials: true }
        ),
        {
          loading: "Signing up...",
          success: "Signup successful!",
          error: "Signup failed. Try again.",
        }
      );
  
      dispatch(setAuthUser({ authUser: true, userData: response.data.user }));
      userType === "Student"
        ? navigate("/sdashboard/home")
        : userType === "Recruiter"
        ? navigate("/rdashboard/createdjob")
        : navigate("/pdashboard");
      setIsLogin(true);
    } catch (error) {
        setError(error.response?.data?.message || "An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      {showOTPVerification ? (
            <OTPVerification
                email={email}
                onSuccess={() => {
                    setShowOTPVerification(false);
                    handleLogin(e);
                }}
            />
        ) : (
      <div className="border border-custom-blue relative w-full max-w-sm mx-4 p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-gray-900">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            {isLogin
              ? "Please enter your login details"
              : "Please fill in the details to sign up"}
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

            <input
              className="w-full px-4 py-3 rounded-md font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-custom-blue"
              type="text"
              placeholder="Enter your code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            {codeError && <p className="text-red-500 text-xs">{codeError}</p>}

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
            {passwordError && (
              <p className="text-red-500 text-xs">{passwordError}</p>
            )}

            <Altcha
              ref={altchaRef}
              challengeurl={`${import.meta.env.REACT_APP_BASE_URL}/captcha/challenge`}
              verifyurl={`${import.meta.env.REACT_APP_BASE_URL}/captcha/verify`}
            />

            <button
              type="submit"
              className="w-full py-3 rounded-md bg-custom-blue text-white font-semibold hover:bg-blue-500 transition duration-300 z-10"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
            <p
              className="text-custom-blue cursor-pointer"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </p>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="mt-6 space-y-4 flex flex-col">
            {/* User Type Buttons */}
            <div className="flex justify-center space-x-4 mb-4">
              <button
                type="button"
                className={`px-4 py-2 rounded-md font-medium ${
                  userType === "Student"
                    ? "bg-custom-blue text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setUserType("Student")}
              >
                Student
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-md font-medium ${
                  userType === "Recruiter"
                    ? "bg-custom-blue text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setUserType("Recruiter")}
              >
                Recruiter
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-md font-medium ${
                  userType === "Professor"
                    ? "bg-custom-blue text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setUserType("Professor")}
              >
                Professor
              </button>
            </div>

            {/* Name Input */}
            <input
              className="w-full px-4 py-3 rounded-md font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-custom-blue"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            {/* Email Input */}
            <input
              className="w-full px-4 py-3 rounded-md font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-custom-blue"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <p className="text-red-500 text-xs">{emailError}</p>}

            {/* Password Input */}
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

            {/* ALTCHA Widget */}
            <Altcha
              ref={altchaRef}
              challengeurl={`${import.meta.env.REACT_APP_BASE_URL}/captcha/challenge`}
              verifyurl={`${import.meta.env.REACT_APP_BASE_URL}/captcha/verify`}
            />

            {/* Additional Fields Based on User Type */}
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

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-xs text-center">{error}</p>
            )}

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-md bg-custom-blue text-white font-semibold hover:bg-blue-500 transition duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing up..." : "Signup"}
            </button>

            {/* Login Link */}
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
      )}
    </div>
  );
};

export default LoginSignup;