import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
    
    const OTPVerification = ({ email, onSuccess }) => {
      const [otpValues, setOtpValues] = useState(Array(6).fill(""));
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [resendCooldown, setResendCooldown] = useState(300); // 5 minutes in seconds
      const [canResend, setCanResend] = useState(false);
      const otpRefs = useRef([...Array(6)].map(() => React.createRef()));
    
      useEffect(() => {
        let timer;
        if (resendCooldown > 0) {
          timer = setInterval(() => {
            setResendCooldown((prev) => prev - 1);
          }, 1000);
        } else {
          setCanResend(true);
        }
        return () => clearInterval(timer);
      }, [resendCooldown]);
    
      const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
      };
    
      const handleResendOTP = async () => {
        if (!canResend) return;
    
        try {
          await toast.promise(
            axios.post(`${import.meta.env.REACT_APP_BASE_URL}/auth/locked-resend-otp`, { email }),
            {
              loading: "Sending new OTP...",
              success: "New OTP sent!",
              error: "Failed to resend OTP",
            }
          );
          setResendCooldown(300);
          setCanResend(false);
        } catch (error) {
          console.error(error);
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

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const otp = otpValues.join("");
    
    if (otp.length !== 6) {
      toast.error("Please enter a complete OTP");
      return;
    }

    setIsSubmitting(true);

    try {
      await toast.promise(
        axios.post(`${import.meta.env.REACT_APP_BASE_URL}/auth/locked-verify-otp`, {
          email,
          otp,
        }),
        {
          loading: "Verifying OTP...",
          success: "Account Unlocked!",
          error: (err) =>
          err.response?.data?.message || "Something went wrong",
        }
      );

      onSuccess();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="border border-custom-blue relative w-full max-w-sm mx-4 p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-gray-900"><span className="text-custom-blue">OTP </span>Verification</h1>
          <p className="text-sm text-gray-500 mt-2">
            Please enter the OTP sent to your email to unlock
          </p>
        </div>

        <form onSubmit={handleVerifyOTP} className="mt-6 space-y-6 flex flex-col">
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

          <button
            type="submit"
            className="w-full py-3 rounded-md bg-custom-blue text-white font-semibold hover:bg-blue-500 transition duration-300 z-10"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          {!canResend ? (
            <p>Resend OTP in {formatTime(resendCooldown)}</p>
          ) : (
            <button
              type="button"
              onClick={handleResendOTP}
              className="text-custom-blue hover:text-blue-500 font-medium"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;