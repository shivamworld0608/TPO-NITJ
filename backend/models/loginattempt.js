import mongoose from "mongoose";

const loginAttemptSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    attempts: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now },
    otp: { type: String, default: null },
    isLocked: { type: Boolean, default: false },
});

loginAttemptSchema.index({ timestamp: 1 }, { expireAfterSeconds: 18000 });

const LoginAttempt = mongoose.model('LoginAttempt', loginAttemptSchema);
export default LoginAttempt;