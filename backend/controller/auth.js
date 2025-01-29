import Recuiter from "../models/user_model/recuiter.js";
import Professor from "../models/user_model/professor.js";
import Student from "../models/user_model/student.js";
import Alumni from "../models/user_model/alumni.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const student = await Student.findOne({ email });
        const recuiter = await Recuiter.findOne({ email });
        const professor = await Professor.findOne({ email });
        const alumni = await Alumni.findOne({ email });

        if (!student && !recuiter && !professor && !alumni) {
            return res.status(401).json({ message: "Email is not Registered" });
        }

        const user = student || recuiter || professor || alumni;

        let isPasswordValid;
        if (user.password.startsWith('$2')) {
            isPasswordValid = await bcrypt.compare(password, user.password);
        } else {
            isPasswordValid = password === user.password;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            await user.updateOne({ password: hashedPassword });
        }
        
        if (!isPasswordValid) {
            console.log("hello");
            return res.status(401).json({ message: "Invalid password" });
        }
        let userType = "";
        if (user == student) userType = "Student";
        else if (user == recuiter) userType = "Recuiter";
        else if (user == professor) userType = "Professor";
        else if (user == alumni) userType = "Alumni";

        const token = jwt.sign({ userId: user._id, userType: userType }, process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
        if (!token) {
            return res.status(500).json({ message: "Failed to generate token" });
        }
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            secure: process.env.NODE_ENV === "production",
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });
        res.status(200).json({ message: "Login Successful", user: user, userType: userType }); } 
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        }
}

export const logout = (req, res) => {
    res.cookie('token', '', { httpOnly: true, expires: new Date(0), path: '/' });
    res.status(200).json({ message: 'Logged out successfully' });
  }


export const ssignup = async (req, res) => {
    try {
        const {name, email, password, rollno, department } = req.body;
        const student = await Student.findOne({ email });
        if (student) {
            return res.status(401).json({ message: "Email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newStudent = new Student({name, email, password: hashedPassword, rollno, department });
        await newStudent.save();
        const token = jwt.sign({ userId: newStudent._id, userType: "Student" }, process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
        if (!token) {
            return res.status(500).json({ message: "Failed to generate token" });
        }
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            secure: process.env.NODE_ENV === "production",
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });   
        res.status(200).json({ message: "Signup successful", user: newStudent });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
 }

export const psignup = async (req, res) => {
    try {
        const {name, email, password, facultyId, department } = req.body;
        const professor = await Professor.findOne({ email });
        if (professor) {
            return res.status(401).json({ message: "Email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newProfessor = new Professor({name, email, password: hashedPassword, facultyId, department });
        await newProfessor.save();
        const token = jwt.sign({ userId: newProfessor._id, userType: "Professor" }, process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
        if (!token) {
            return res.status(500).json({ message: "Failed to generate token" });
        }
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            secure: process.env.NODE_ENV === "production",
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });   
        res.status(200).json({ message: "Signup successful", user: newProfessor });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
    }

export const rsignup = async (req, res) => {
    try {
        console.log("salt generated");
        const {name, email, password, company, designation } = req.body;
        const recuiter = await Recuiter.findOne({ email });
        if (recuiter) {
            return res.status(401).json({ message: "Email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newRecuiter = new Recuiter({name, email, password: hashedPassword, company, designation });
        await newRecuiter.save();
        const token = jwt.sign({ userId: newRecuiter._id, userType: "Recuiter" }, process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
        if (!token) {
            return res.status(500).json({ message: "Failed to generate token" });
        }
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            secure: process.env.NODE_ENV === "production",
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });   
        res.status(200).json({ message: "Signup successful", user: newRecuiter });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
    }


export const asignup = async (req, res) => {
    try {
        console.log("salt generated");
        const {name, email, password, company, designation } = req.body;
        const recuiter = await Recuiter.findOne({ email });
        if (recuiter) {
            return res.status(401).json({ message: "Email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newRecuiter = new Recuiter({name, email, password: hashedPassword, company, designation });
        await newRecuiter.save();
        const token = jwt.sign({ userId: newRecuiter._id, userType: "Recuiter" }, process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
        if (!token) {
            return res.status(500).json({ message: "Failed to generate token" });
        }
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            secure: process.env.NODE_ENV === "production",
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });   
        res.status(200).json({ message: "Signup successful", user: newRecuiter });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
    }




