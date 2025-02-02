import JobProfile from "../models/jobprofile.js";
import mongoose from "mongoose";

export const getEligibleUpcomingGDs = async (req, res) => {
  try {
    const studentId = req.user.userId;
    const studentObjectId = new mongoose.Types.ObjectId(studentId);
    const jobsWithGDs = await JobProfile.find({
      "Hiring_Workflow.eligible_students": studentObjectId,
    })
      .select("company_name company_logo Hiring_Workflow")
      .lean();

    const upcomingGDs = jobsWithGDs.flatMap((job) => {
      const workflow = Array.isArray(job.Hiring_Workflow) ? job.Hiring_Workflow : [];

      return workflow
        .filter((step) => {
          const isGD = step.step_type === "GD";
          const isEligible = step.eligible_students.some((id) => id.equals(studentObjectId));
          const isFutureDate = new Date(step.details.gd_date) > new Date();
          return isGD && isEligible && isFutureDate;
        })
        .map((step) => {
          const gdLinks = Array.isArray(step.details.gd_link)
            ? step.details.gd_link
            : [];

          const studentGDLink = gdLinks.find((link) => {
            if (!link.studentId) return false;

            const linkStudentId =
              typeof link.studentId === "string"
                ? new mongoose.Types.ObjectId(link.studentId)
                : link.studentId;

            return linkStudentId.equals(studentObjectId);
          })?.gdLink || "No link available";

          return {
            company_name: job.company_name,
            company_logo: job.company_logo,
            gd_type: step.details.gd_type,
            gd_date: step.details.gd_date,
            gd_time: step.details.gd_time,
            gd_info: step.details.gd_info,
            gd_link: studentGDLink,
          };
        });
    });
    res.status(200).json({ upcomingGDs });
  } catch (error) {
    console.error("Error fetching upcoming GDs:", error);
    res.status(500).json({ message: "Server error while fetching upcoming GDs." });
  }
};

export const getEligiblePastGDs = async (req, res) => {
  try {
    const studentId = req.user.userId;
    const studentObjectId = new mongoose.Types.ObjectId(studentId);

    const jobsWithGDs = await JobProfile.find({
      "Hiring_Workflow.eligible_students": studentObjectId,
    })
      .select("company_name company_logo Hiring_Workflow")
      .lean();

    const pastGDs = jobsWithGDs.flatMap((job) => {
      const workflow = Array.isArray(job.Hiring_Workflow) ? job.Hiring_Workflow : [];

      return workflow
        .filter(
          (step) =>
            step.step_type === "GD" &&
            step.eligible_students.some((id) => id.equals(studentObjectId)) &&
            new Date(step.details.gd_date) < new Date()
        )
        .map((step) => {
          const gdLinks = Array.isArray(step.details.gd_link)
            ? step.details.gd_link
            : [];

          const studentGDLink = gdLinks.find((link) => {
            if (!link.studentId) return false;

            const linkStudentId =
              typeof link.studentId === "string"
                ? new mongoose.Types.ObjectId(link.studentId)
                : link.studentId;

            return linkStudentId.equals(studentObjectId);
          })?.gdLink || "No link available";

          return {
            company_name: job.company_name,
            company_logo: job.company_logo,
            gd_type: step.details.gd_type,
            gd_date: step.details.gd_date,
            gd_time: step.details.gd_time,
            gd_info: step.details.gd_info,
            gd_link: studentGDLink,
            was_shortlisted:
              step.shortlisted_students?.length === 0
                ? "Result yet to be declared"
                : step.shortlisted_students.some((id) => id.equals(studentObjectId)) || false,
          };
        });
    });

    pastGDs.sort((a, b) => new Date(b.gd_date) - new Date(a.gd_date));
    res.status(200).json({ pastGDs });
  } catch (error) {
    console.error("Error fetching past GDs:", error);
    res.status(500).json({ message: "Server error while fetching past GDs." });
  }
};