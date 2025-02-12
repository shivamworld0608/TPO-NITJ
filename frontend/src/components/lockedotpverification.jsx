import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const OTPVerification = ({ email, onSuccess }) => {
    const [otp, setOtp] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await toast.promise(
                axios.post(`${import.meta.env.REACT_APP_BASE_URL}/auth/locked-verify-otp`, { email, otp }),
                {
                    loading: "Verifying OTP...",
                    success: "OTP verified successfully!",
                    error: "Invalid OTP",
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
                    <h1 className="text-2xl font-extrabold text-gray-900">OTP Verification</h1>
                    <p className="text-sm text-gray-500 mt-2">Please enter the OTP sent to your email</p>
                </div>

                <form onSubmit={handleVerifyOTP} className="mt-6 space-y-4 flex flex-col">
                    <input
                        className="w-full px-4 py-3 rounded-md font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-custom-blue"
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="w-full py-3 rounded-md bg-custom-blue text-white font-semibold hover:bg-blue-500 transition duration-300 z-10"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Verifying..." : "Verify OTP"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OTPVerification;