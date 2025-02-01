import Mail from "../models/mail.js";
import Student from "../models/user_model/student.js";
import Professor from "../models/user_model/professor.js";
import Recuiter from "../models/user_model/recuiter.js";

// Send mail to professors (student-specific)
export const sendMailToProfessors = async (req, res) => {
    const { sender, subject, body, senderType } = req.body;
  
    try {
      const professors = await Professor.find({}, { email: 1 });
      const recipients = professors.map((prof) => prof.email);
  
      const mail = new Mail({
        sender,
        recipients,
        subject,
        body,
        senderType,
        recipientType: "Professor",
        category: "Sent",
      });
  
      await mail.save();
      res.status(201).json({ message: "Mail sent to all professors", mail });
    } catch (error) {
      res.status(500).json({ message: "Error sending mail", error });
    }
  };

// Send mail to students (professor-specific)
export const sendMailToStudents = async (req, res) => {
    const { sender, subject, body, senderType, metadata } = req.body;
  
    try {
      let students;
      if (metadata.batch) {
        students = await Student.find({ batch: metadata.batch }, { email: 1 });
      } else if (metadata.course) {
        students = await Student.find({ course: metadata.course }, { email: 1 });
      } else if (metadata.department) {
        students = await Student.find({ department: metadata.department }, { email: 1 });
      } else {
        students = await Student.find({}, { email: 1 });
      }
  
      const recipients = students.map((student) => student.email);
  
      const mail = new Mail({
        sender,
        recipients,
        subject,
        body,
        senderType,
        recipientType: "Student",
        category: "Sent",
        metadata,
      });
  
      await mail.save();
      res.status(201).json({ message: "Mail sent to selected students", mail });
    } catch (error) {
      res.status(500).json({ message: "Error sending mail", error });
    }
  };

// Send mail to recruiters (professor-specific)
export const sendMailToRecruiters = async (req, res) => {
    const { sender, subject, body, senderType, metadata } = req.body;
  
    try {
      const recruiters = await Recruiter.find({ company: metadata.company }, { email: 1 });
      const recipients = recruiters.map((rec) => rec.email);
  
      const mail = new Mail({
        sender,
        recipients,
        subject,
        body,
        senderType,
        recipientType: "Recruiter",
        category: "Sent",
        metadata,
      });
  
      await mail.save();
      res.status(201).json({ message: "Mail sent to recruiters", mail });
    } catch (error) {
      res.status(500).json({ message: "Error sending mail", error });
    }
  };

// Fetch mails for a user
export const fetchMails = async (req, res) => {
  const { email } = req.params;

  try {
    const mails = await Mail.find({ recipients: email });
    res.status(200).json(mails);
  } catch (error) {
    res.status(500).json({ message: "Error fetching mails", error });
  }
};