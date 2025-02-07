import Student from "../models/user_model/student.js";

export const addStudent = async (req, res) => {
    try {
        const {
            name,
            email,
            rollno,
            cgpa,
            password,
            gender,
            course,
            department,
            batch,
            disability,
            activeBacklogs,
            backlogsHistory,
        } = req.body;

        const studentExists = await Student.findOne({ email });
        if (studentExists) {
            return res.status(400).json({ message: "User already Registered" });
        }
        const student = await Student.create({
            name,
            email,
            rollno,
            cgpa,
            password,
            gender,
            course,
            department,
            batch,
            disability,
            activeBacklogs,
            backlogsHistory,
        });

        if (student) {
            return res.status(201).json({ message: "Added successfully" });
        } else {
            return res.status(400).json({ message: "Failed to add student" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};