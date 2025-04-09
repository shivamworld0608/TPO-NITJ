import Recuiter from "../models/user_model/recuiter.js";
import Professor from "../models/user_model/professor.js";
import Student from "../models/user_model/student.js";
import Alumni from "../models/user_model/alumni.js";
import Admin from "../models/user_model/admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import LoginAttempt from "../models/loginattempt.js";
import axios from 'axios';

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  export const sendOtp = async (req, res) => {
    const { email } = req.body;
    const student = await Student.findOne({ email });
    const recuiter = await Recuiter.findOne({ email });
    const professor = await Professor.findOne({ email });
    const alumni = await Alumni.findOne({ email });
    const admin = await Admin.findOne({ email });

    if (!student && !recuiter && !professor && !alumni && !admin) {
        return res.status(401).json({ message: "Email is not Registered" });
    }

    const user = student || recuiter || professor || alumni || admin;

    const otp = generateOTP();
    user.otp = otp;
    await user.save();
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}`,
    };
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: "Failed to send OTP" });
      }
      res.status(200).json({ message: "OTP sent successfully" });
    });
  };

  export const verifyOtp =async (req, res) => {
    const { email, otp } = req.body;
    const student = await Student.findOne({ email });
    const recuiter = await Recuiter.findOne({ email });
    const professor = await Professor.findOne({ email });
    const alumni = await Alumni.findOne({ email });
    const admin = await Admin.findOne({ email });

    if (!student && !recuiter && !professor && !alumni && !admin) {
        return res.status(401).json({ message: "Email is not Registered" });
    }

    const user = student || recuiter || professor || alumni || admin;
  
    if (!user || user.otp !== otp) {
      return res.status(401).json({ message: "Invalid OTP" });
    }
  
    user.otp = null;
    await user.save();
  
    res.status(200).json({ message: "OTP verified successfully" });
  };

export const LockedResendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const loginAttempt = await LoginAttempt.findOne({ email });
        if (!loginAttempt || !loginAttempt.isLocked) {
            return res.status(400).json({ message: "Account not locked" });
        }
        const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 5 * 60 * 1000);
        loginAttempt.otp = newOTP;
        loginAttempt.otpExpires = otpExpires;
        await loginAttempt.save();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });
          const mailOptions = {
              from: process.env.EMAIL_USER,
              to: email,
              subject: 'Security OTP for Account Unlock',
              text: `Your new OTP is: ${newOTP}`,
          };
          await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "New OTP sent" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

  export const LockedverifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const loginAttempt = await LoginAttempt.findOne({ email });
        if (!loginAttempt || !loginAttempt.isLocked) {
            return res.status(401).json({ message: "Invalid request" });
        }

        if (loginAttempt.otp !== otp) {
            return res.status(401).json({ message: "Invalid OTP" });
        }
        if (Date.now() > loginAttempt.otpExpires) {
            return res.status(401).json({ message: "OTP has expired" });
        }
        loginAttempt.isLocked = false;
        loginAttempt.attempts = 0;
        loginAttempt.otp = null;
        loginAttempt.otpExpires = null;
        await loginAttempt.save();

        res.status(200).json({ message: "Account unlocked. Please login again." });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
  export const resetPassword =async (req, res) => {
    const { email, newPassword } = req.body;
    const student = await Student.findOne({ email });
    const recuiter = await Recuiter.findOne({ email });
    const professor = await Professor.findOne({ email });
    const alumni = await Alumni.findOne({ email });
    const admin = await Admin.findOne({ email });

    if (!student && !recuiter && !professor && !alumni && !admin) {
        return res.status(401).json({ message: "Email is not Registered" });
    }

    const user = student || recuiter || professor || alumni || admin;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
  
    res.status(200).json({ message: "Password reset successfully" });
  };
  
  
  export const login = async (req, res) => {
      try {
          const { email, password/* code */ } = req.body;
          let loginAttempt = await LoginAttempt.findOne({ email });
          if (loginAttempt && loginAttempt.isLocked) {
              return res.status(400).json({ message: "Account locked. Please check your email for OTP." });
          }
          const student = await Student.findOne({ email });
          const recuiter = await Recuiter.findOne({ email });
          const professor = await Professor.findOne({ email });
          const alumni = await Alumni.findOne({ email });
          const admin = await Admin.findOne({ email });
  
          if (!student && !recuiter && !professor && !alumni && !admin) {
              return res.status(401).json({ message: "Email is not Registered" });
          }
  
          const user = student || recuiter || professor || alumni || admin;
  
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
              if (!loginAttempt) {
                  loginAttempt = new LoginAttempt({ email, attempts: 1 });
              } else {
                  loginAttempt.attempts += 1;
              }
              if (loginAttempt.attempts >= 10) {
                  loginAttempt.isLocked = true;
                  const otp = Math.floor(100000 + Math.random() * 900000).toString();
                  loginAttempt.otp = otp;
                  loginAttempt.otpExpires = new Date(Date.now() + 5 * 60 * 1000);
                  const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                      user: process.env.EMAIL_USER,
                      pass: process.env.EMAIL_PASS,
                    },
                  });
                  const mailOptions = {
                      from: process.env.EMAIL_USER,
                      to: email,
                      subject: 'Security OTP for Account Unlock',
                      text: `Your OTP for account unlock is: ${otp}`,
                  };
  
                  console.log("will send mail now");
                  await transporter.sendMail(mailOptions);
                  console.log("mail sent");
              }
  
              await loginAttempt.save();
              console.log("saved");
              return res.status(401).json({ message: "Invalid password" });
          }
  
/*           if (code && code !== '21cm') {
              return res.status(401).json({ message: "Invalid code" });
          } */
  
          if (loginAttempt) {
              await LoginAttempt.deleteOne({ email });
          }
  
          let userType = "";
          if (user == student) userType = "Student";
          else if (user == recuiter) userType = "Recuiter";
          else if (user == professor) userType = "Professor";
          else if (user == alumni) userType = "Alumni";
          else if (user == admin) userType = "Admin";
  
          const token = jwt.sign({ userId: user._id, userType: userType }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
          if (!token) {
              return res.status(500).json({ message: "Failed to generate token" });
          }
   
          res.cookie("token", token, {
              httpOnly: true,
              sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
              secure: process.env.NODE_ENV === "production",
              expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          });

          if (userType === "Student" && student) {
            try {
                const rollNumbers = [student.rollno];
                const response = await axios.post(`${process.env.ERP_SERVER}`, { rollNumbers });
                const erpStudents = response.data.data.students;
                const erpData = erpStudents[0];
                console.log(erpData)
                const updatedStudent = {
                    ...student.toObject(),
                    cgpa: erpStudents.cgpa,
                    batch: erpStudents.batch,
                    active_backlogs: erpStudents.active_backlogs,
                    backlogs_history: erpStudents.backlogs_history,
                };

                return res.status(200).json({ message: "Login Successful", user: updatedStudent, userType });
            } catch (error) {
                console.error("Error fetching ERP data:", error);
                return res.status(500).json({ message: "Login Successful, but failed to fetch ERP data", user, userType });
            }
        }
          res.status(200).json({ message: "Login Successful", user: user, userType: userType });
      } catch (error) {
          res.status(500).json({ message: "Internal Server Error" });
      }
  };

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


