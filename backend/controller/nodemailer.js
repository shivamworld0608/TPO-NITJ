import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

export const sendEmails = async (req, res) => {
    const { emails, subject, text } = req.body;
  
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: emails.join(","),
        subject: subject,
        text: text,
      };
  
      await transporter.sendMail(mailOptions);
      res.status(200).send("Emails sent successfully");
    } catch (error) {
      console.error("Error sending emails:", error);
      res.status(500).send("Failed to send emails");
    }
};