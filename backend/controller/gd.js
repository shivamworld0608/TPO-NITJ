import JobProfile from "../models/jobprofile.js";

  export const getEligibleUpcomingGDs = async (req, res) => {
    try {
      const studentId = req.user.userId;
      const jobsWithGDs = await JobProfile.find({
        "Hiring_Workflow.eligible_students": studentId,
        "Hiring_Workflow.step_type": "GD",
      })
        .select(
          "company_name company_logo Hiring_Workflow"
        )
        .lean();
      const upcomingGDs = jobsWithGDs.flatMap((job) => {
      const workflow = Array.isArray(job.Hiring_Workflow) ? job.Hiring_Workflow : [];
        
        return workflow
          .filter(
            (step) => 
              step.step_type === "GD" && 
              new Date(step.details.gd_date) > new Date()
          )
          .map((step) => ({
            company_name: job.company_name,
            company_logo: job.company_logo,
            gd_date: step.details.gd_date,
            gd_time: step.details.gd_time,
            gd_info: step.details.gd_info,
            gd_link: step.details.gd_link,
          }));
      });
      res.status(200).json({ upcomingGDs });
    } catch (error) {
      console.error("Error fetching upcoming GDs:", error);
      res.status(500).json({ message: "Server error while fetching upcoming gds." });
    }
  };
  
  

  export const getEligiblePastGDs = async (req, res) => {
    try {
      const studentId = req.user.userId;
      const jobsWithGDs = await JobProfile.find({
        "Hiring_Workflow.eligible_students": studentId,
        "Hiring_Workflow.step_type": "GD"
      })
        .select("company_name company_logo Hiring_Workflow")
        .lean();
  
      const pastGDs = jobsWithGDs.flatMap((job) => {
        const workflow = Array.isArray(job.Hiring_Workflow) ? job.Hiring_Workflow : [];
        
        return workflow
          .filter(
            (step) => 
              step.step_type === "GD" && 
              new Date(step.details.gd_date) < new Date()
          )
          .map((step) => ({
            company_name: job.company_name,
            company_logo: job.company_logo,
            gd_date: step.details.gd_date,
            gd_time: step.details.gd_time,
            gd_info: step.details.gd_info,
            gd_link: step.details.gd_link,
            was_shortlisted: step.shortlisted_students?.length === 0 
            ? "Result yet to be declared"
            : step.shortlisted_students?.includes(studentId) || false
          }));
      });
  
      pastGDs.sort((a, b) => new Date(b.gd_date) - new Date(a.gd_date));
      res.status(200).json({ 
        pastGDs 
      });
  
    } catch (error) {
      console.error("Error fetching past GDs:", error);
      res.status(500).json({ 
        message: "Server error while fetching past GDs."
      });
    }
  };

