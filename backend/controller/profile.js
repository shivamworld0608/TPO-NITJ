import Recuiter from "../models/user_model/recuiter.js";
import Professor from "../models/user_model/professor.js";
import Student from "../models/user_model/student.js";

import cloudinary from "../utils/cloudinary.js";
import fs from 'fs';


export const sprofile = async (req, res) => {
    try {
        const student = await Student.findById(req.user.userId).select('-password');;
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
export const updatesProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { name, email, phone,rollno,department,year,batch,address,cgpa,gender } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: 'Name, email are required' });
        }
        const student = await Student.findById(userId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        student.name = name;
        student.email = email;
        if(phone!="") student.phone = phone;
        if(rollno!="") student.rollno = rollno;
        if(department!="") student.department = department;
        if(year!="") student.year = year;
        if(batch!="") student.batch = batch;
        if(address!="") student.address = address;
        if(cgpa!="") student.cgpa = cgpa;
        if(gender!="") student.gender = gender;

        await student.save();
        res.status(200).json({ message: 'Profile updated successfully', user:student });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


//handle student profile photo
export const handlesProfilePhoto = async (req, res) => {
    const image = req.file.path;
    try{
      const x = await cloudinary.uploader.upload(image);
      fs.unlinkSync(image);
      const student = await Student.findOne({_id:req.user.userId});
      if (student) {
        student.image= x.secure_url;
        await student.save();
      }
      res.json({ success: true, image: x.secure_url, student });
    } catch (error) {
      console.error("Error updating profile photo:", error);
      res.status(500).json({ success: false, error: "Profile Updation failed" });
    }
  };