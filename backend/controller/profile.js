import Recuiter from "../model/user_model/recuiter.js";
import Professor from "../model/user_model/professor.js";
import Student from "../model/user_model/student.js";

export const sprofile = async (req, res) => {
    try {
        const student = await Student.findById(req.user.userId);
        if (!student) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Profile fetched successfully", user: student });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const rprofile = async (req, res) => {
    try {
        const recuiter = await Recuiter.findById(req.user.userId);
        if (!recuiter) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Profile fetched successfully", user: recuiter });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const pprofile = async (req, res) => {
    try {
        const professor = await Professor.findById(req.user.userId);
        if (!professor) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Profile fetched successfully", user: professor });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//update profile


