import mongoose from "mongoose";

const SharedExperienceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    createdAt: { type: Date, default: Date.now },
});

const SharedExperience = mongoose.model('SharedExperience', SharedExperienceSchema);

export default SharedExperience;