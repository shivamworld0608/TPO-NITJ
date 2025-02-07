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
/* export const sendMailToStudents = async (req, res) => {
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
 */


// Send mail to students (professor-specific)
export const sendMailToStudents = async (req, res) => {
  const { sender, subject, body, senderType, metadata } = req.body;
  console.log("heii");
  try {
    // Build a query from provided filters.
    let query = {};
    if (metadata.batch && metadata.batch.length > 0) {
      query.batch = { $in: metadata.batch.map(item => item.value) };
    }
    if (metadata.course && metadata.course.length > 0) {
      query.course = { $in: metadata.course.map(item => item.value) };
    }
    if (metadata.department && metadata.department.length > 0) {
      query.department = { $in: metadata.department.map(item => item.value) };
    }
    if (metadata.gender && metadata.gender.length > 0) {
      query.gender = { $in: metadata.gender.map(item => item.value) };
    }
    if (metadata.branch && metadata.branch.length > 0) {
      query.branch = { $in: metadata.branch.map(item => item.value) };
    }
    
    const students = Object.keys(query).length > 0
      ? await Student.find(query, { email: 1 })
      : await Student.find({}, { email: 1 });
    console.log(`${students.length} students found`);
    
    const recipients = students.map((student) => student.email);
    
    // Build userStatuses: recipients see the mail as Inbox/unread.
    let userStatuses = recipients.map(email => ({
      userId: email,
      category: "Inbox",
      read: false,
    }));
    // Add sender status as Sent.
    userStatuses.push({
      userId: sender,
      category: "Sent",
      read: true,
    });
    
    // Process metadata: extract only the value property for each array.
    const processedMetadata = {
      batch: metadata.batch ? metadata.batch.map(item => item.value) : [],
      course: metadata.course ? metadata.course.map(item => item.value) : [],
      department: metadata.department ? metadata.department.map(item => item.value) : [],
      gender: metadata.gender ? metadata.gender.map(item => item.value) : [],
      branch: metadata.branch ? metadata.branch.map(item => item.value) : [],
      company: metadata.company || ""
    };

    const mail = new Mail({
      sender,
      subject,
      body,
      senderType,
      recipientType: "Student",
      recipients,
      metadata: processedMetadata,
      userStatuses,
    });
    
    try {
      await mail.save();
    }
    catch(error) {
      console.log(error);
    }
    console.log("reached here");
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
/* export const fetchMails = async (req, res) => {
  const { email } = req.params;

  try {
    const mails = await Mail.find({ recipients: email });
    res.status(200).json(mails);
  } catch (error) {
    res.status(500).json({ message: "Error fetching mails", error });
  }
}; */


// controllers/mailController.js
export const fetchMails = async (req, res) => {
  const { email } = req.params;
  try {
    const mails = await Mail.find({ "userStatuses.userId": email });
    res.status(200).json(mails);
  } catch (error) {
    res.status(500).json({ message: "Error fetching mails", error });
  }
};


// controllers/mailController.js
export const markAsRead = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body; // pass the user's email in the request body
  try {
    await Mail.updateOne(
      { _id: id, "userStatuses.userId": email },
      { $set: { "userStatuses.$.read": true } }
    );
    res.status(200).json({ message: "Mail marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Error marking mail as read", error });
  }
};


// controllers/mailController.js
export const deleteMail = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  try {
    await Mail.updateOne(
      { _id: id },
      { $pull: { userStatuses: { userId: email } } }
    );
    res.status(200).json({ message: "Mail deleted for user" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting mail", error });
  }
};
