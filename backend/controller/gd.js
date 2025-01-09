import JobProfile from "../models/jobprofile.js";

  export const getEligibleUpcomingGDs = async (req, res) => {
    try {
      const studentId = req.user.userId;
      const jobsWithOAs = await JobProfile.find({
        "Hiring_Workflow.eligible_students": studentId,
        "Hiring_Workflow.step_type": "OA",
      })
        .select(
          "company_name company_logo Hiring_Workflow"
        )
        .lean();
      console.log("jobswithoa",jobsWithOAs);
      const upcomingOAs = jobsWithOAs.flatMap((job) => {
      const workflow = Array.isArray(job.Hiring_Workflow) ? job.Hiring_Workflow : [];
        
        return workflow
          .filter(
            (step) => 
              step.step_type === "OA" && 
              new Date(step.details.oa_date) > new Date()
          )
          .map((step) => ({
            company_name: job.company_name,
            company_logo: job.company_logo,
            oa_date: step.details.oa_date,
            oa_login_time: step.details.oa_login_time || step.details.login_time, // Handle both field names
            oa_duration: step.details.oa_duration,
            oa_info: step.details.oa_info,
            oa_link: step.details.oa_link,
          }));
      });
      res.status(200).json({ upcomingOAs });
    } catch (error) {
      console.error("Error fetching upcoming OAs:", error);
      res.status(500).json({ message: "Server error while fetching upcoming OAs." });
    }
  };
  
  

  export const getEligiblePastGDs = async (req, res) => {
    try {
      const studentId = req.user.userId;
      const jobsWithOAs = await JobProfile.find({
        "Hiring_Workflow.eligible_students": studentId,
        "Hiring_Workflow.step_type": "OA"
      })
        .select("company_name company_logo Hiring_Workflow")
        .lean();
  
      const pastOAs = jobsWithOAs.flatMap((job) => {
        const workflow = Array.isArray(job.Hiring_Workflow) ? job.Hiring_Workflow : [];
        
        return workflow
          .filter(
            (step) => 
              step.step_type === "OA" && 
              new Date(step.details.oa_date) < new Date()
          )
          .map((step) => ({
            company_name: job.company_name,
            company_logo: job.company_logo,
            oa_date: step.details.oa_date,
            oa_login_time: step.details.oa_login_time || step.details.login_time,
            oa_duration: step.details.oa_duration,
            oa_info: step.details.oa_info,
            oa_link: step.details.oa_link,
            was_shortlisted: step.shortlisted_students?.length === 0 
            ? "Result yet to be declared"
            : step.shortlisted_students?.includes(studentId) || false
          }));
      });
  
      pastOAs.sort((a, b) => new Date(b.oa_date) - new Date(a.oa_date));
      res.status(200).json({ 
        pastOAs 
      });
  
    } catch (error) {
      console.error("Error fetching past OAs:", error);
      res.status(500).json({ 
        message: "Server error while fetching past OAs."
      });
    }
  };

