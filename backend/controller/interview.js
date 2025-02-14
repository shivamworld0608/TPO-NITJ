import JobProfile from "../models/jobprofile.js";
import mongoose from "mongoose";
import axios from 'axios';

export const getEligibleUpcomingInterviews = async (req, res) => {
  try {
    const rollNumbers=['21110019','21102091','21102064','21102067'];
    const response=await axios.post("https://erp-tpo.vercel.app/api/students/fetch",{rollNumbers});
    console.log("hello",response.data.data.students);
    const studentId = req.user.userId;
    const studentObjectId = new mongoose.Types.ObjectId(studentId);

    const jobsWithInterviews = await JobProfile.find({
      "Hiring_Workflow.eligible_students": studentObjectId,
    })
      .select("company_name company_logo Hiring_Workflow")
      .lean();

    const upcomingInterviews = jobsWithInterviews.flatMap((job) => {
      const workflow = Array.isArray(job.Hiring_Workflow) ? job.Hiring_Workflow : [];

      return workflow
        .filter((step) => {
          const isInterview = step.step_type === "Interview";
          const isEligible = step.eligible_students.some((id) => id.equals(studentObjectId));
          const isFutureDate = new Date(step.details.interview_date) > new Date();

          return isInterview && isEligible && isFutureDate;
        })
        .map((step) => {
          const interviewLinks = Array.isArray(step.details.interview_link)
            ? step.details.interview_link
            : [];

          const studentInterviewLink = interviewLinks.find((link) => {
            if (!link.studentId) return false;

            const linkStudentId =
              typeof link.studentId === "string"
                ? new mongoose.Types.ObjectId(link.studentId)
                : link.studentId;

            return linkStudentId.equals(studentObjectId);
          });

          // Check visibility
          const isLinkVisible = studentInterviewLink?.visibility !== false;

          return {
            company_name: job.company_name,
            company_logo: job.company_logo,
            interview_type: step.details.interview_type,
            interview_date: step.details.interview_date,
            interview_time: step.details.interview_time,
            interview_info: step.details.interview_info,
            interview_link: isLinkVisible ? studentInterviewLink?.interviewLink || "No link available" : "Link not visible",
            isLinkVisible, // Add this field to indicate visibility
          };
        });
    });

    res.status(200).json({ upcomingInterviews });
  } catch (error) {
    console.error("Error fetching upcoming Interviews:", error);
    res.status(500).json({ message: "Server error while fetching upcoming Interviews." });
  }
};

export const getEligiblePastInterviews = async (req, res) => {
  try {
    const studentId = req.user.userId;
    const studentObjectId = new mongoose.Types.ObjectId(studentId);

    const jobsWithInterviews = await JobProfile.find({
      "Hiring_Workflow.eligible_students": studentObjectId,
    })
      .select("company_name company_logo Hiring_Workflow")
      .lean();

    const pastInterviews = jobsWithInterviews.flatMap((job) => {
      const workflow = Array.isArray(job.Hiring_Workflow) ? job.Hiring_Workflow : [];

      return workflow
        .filter(
          (step) =>
            step.step_type === "Interview" &&
            step.eligible_students.some((id) => id.equals(studentObjectId)) &&
            new Date(step.details.interview_date) < new Date()
        )
        .map((step) => {
          const interviewLinks = Array.isArray(step.details.interview_link)
            ? step.details.interview_link
            : [];

          const studentInterviewLink = interviewLinks.find((link) => {
            if (!link.studentId) return false;

            const linkStudentId =
              typeof link.studentId === "string"
                ? new mongoose.Types.ObjectId(link.studentId)
                : link.studentId;

            return linkStudentId.equals(studentObjectId);
          });

          // Check visibility
          const isLinkVisible = studentInterviewLink?.visibility !== false;

          return {
            company_name: job.company_name,
            company_logo: job.company_logo,
            interview_type: step.details.interview_type,
            interview_date: step.details.interview_date,
            interview_time: step.details.interview_time,
            interview_info: step.details.interview_info,
            interview_link: isLinkVisible ? studentInterviewLink?.interviewLink || "No link available" : "Link not visible",
            isLinkVisible, // Add this field to indicate visibility
            was_shortlisted:
              step.shortlisted_students?.length === 0
                ? "Result yet to be declared"
                : step.shortlisted_students.some((id) => id.equals(studentObjectId)) || false,
          };
        });
    });

    pastInterviews.sort((a, b) => new Date(b.interview_date) - new Date(a.interview_date));
    res.status(200).json({ pastInterviews });
  } catch (error) {
    console.error("Error fetching past Interviews:", error);
    res.status(500).json({ message: "Server error while fetching past Interviews." });
  }
};