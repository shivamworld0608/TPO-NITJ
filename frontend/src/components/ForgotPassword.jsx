import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Eye, EyeOff, Check, X } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otpValues, setOtpValues] = useState(Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  
  const otpRefs = useRef([...Array(6)].map(() => React.createRef()));
  const navigate = useNavigate();

  const passwordCriteria = [
    { id: 1, text: "At least 8 characters", regex: /^.{8,}$/ },
    { id: 2, text: "At least one lowercase letter", regex: /[a-z]/ },
    { id: 3, text: "At least one uppercase letter", regex: /[A-Z]/ },
    { id: 4, text: "At least one number", regex: /\d/ },
    { id: 5, text: "At least one special character @,$,!,%,*,?,&", regex: /[@$!%*?&]/ },
  ];

  const validatePassword = (password) => {
    return passwordCriteria.every((criterion) => criterion.regex.test(password));
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(
        axios.post(`${import.meta.env.REACT_APP_BASE_URL}/auth/send-otp`, { email }),
        {
          loading: "Sending OTP...",
          success: "OTP sent successfully!",
          error: "Failed to send OTP. Please try again.",
        }
      );
      setStep(2);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred.");
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    if (value !== "" && index < 5) {
      otpRefs.current[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1].current.focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otp = otpValues.join("");
    if (otp.length !== 6) {
      setError("Please enter a complete OTP");
      return;
    }
    try {
      await toast.promise(
        axios.post(`${import.meta.env.REACT_APP_BASE_URL}/auth/verify-otp`, { email, otp }),
        {
          loading: "Verifying OTP...",
          success: "OTP verified successfully!",
          error: "Invalid OTP. Please try again.",
        }
      );
      setStep(3);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!validatePassword(newPassword)) {
      setError("Please ensure all password criteria are met.");
      return;
    }
    try {
      await toast.promise(
        axios.post(`${import.meta.env.REACT_APP_BASE_URL}/auth/reset-password`, {
          email,
          newPassword,
        }),
        {
          loading: "Resetting password...",
          success: "Password reset successfully!",
          error: "Failed to reset password. Please try again.",
        }
      );
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred.");
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const pastedNumbers = pastedData.match(/\d/g);
    
    if (pastedNumbers && pastedNumbers.length) {
      const newOtpValues = [...otpValues];
      for (let i = 0; i < Math.min(6, pastedNumbers.length); i++) {
        newOtpValues[i] = pastedNumbers[i];
      }
      setOtpValues(newOtpValues);
      const nextEmptyIndex = newOtpValues.findIndex(value => !value);
      if (nextEmptyIndex !== -1 && nextEmptyIndex < 6) {
        otpRefs.current[nextEmptyIndex].current.focus();
      } else {
        otpRefs.current[5].current.focus();
      }
    }
  };

  return (
    <div className="flex justify-center items-center -mt-20">
      <div className="border border-custom-blue relative w-full max-w-sm mx-4 p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-custom-blue">
            {step === 1 ? "Forgot Password" : step === 2 ? "Verify OTP" : "Reset Password"}
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            {step === 1
              ? "Enter your email to receive an OTP"
              : step === 2
              ? "Enter the OTP sent to your email"
              : "Enter your new password"}
          </p>
        </div>

        {step === 1 && (
          <form onSubmit={handleSendOtp} className="mt-6 space-y-4 flex flex-col">
            <input
              className="w-full px-4 py-3 rounded-md font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-custom-blue"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-xs text-center">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-md bg-custom-blue text-white font-semibold hover:bg-blue-500 transition duration-300"
            >
              Send OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="mt-6 space-y-4 flex flex-col">
            <div className="flex justify-between gap-2" onPaste={handlePaste}>
              {otpValues.map((value, index) => (
                <input
                  key={index}
                  ref={otpRefs.current[index]}
                  className="w-12 h-12 text-center text-xl font-semibold rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:border-custom-blue focus:ring-1 focus:ring-custom-blue"
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  required
                />
              ))}
            </div>
            {error && <p className="text-red-500 text-xs text-center">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-md bg-custom-blue text-white font-semibold hover:bg-blue-500 transition duration-300"
            >
              Verify OTP
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="mt-6 space-y-4 flex flex-col">
            <div className="relative w-full">
              <input
                className="w-full px-4 py-3 rounded-md font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-custom-blue"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
              >
                {showPassword ? (
                  <Eye className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                )}
              </span>
            </div>
            <input
              className="w-full px-4 py-3 rounded-md font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-custom-blue"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-xs text-center">{error}</p>}
            <div className="mt-4 space-y-2">
              {passwordCriteria.map((criterion) => (
                <div key={criterion.id} className="flex items-center">
                  {criterion.regex.test(newPassword) ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                  <span
                    className={`ml-2 text-sm ${
                      criterion.regex.test(newPassword) ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {criterion.text}
                  </span>
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-md bg-custom-blue text-white font-semibold hover:bg-blue-500 transition duration-300"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;