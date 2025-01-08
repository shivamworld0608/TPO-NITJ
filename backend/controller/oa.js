import Student from "../models/user_model/student.js";
import JobProfile from "../models/jobprofile.js";

/* export const getTodayShortlistsGroupedByCompany = async (req, res) => {
    try {
      const startOfDay = moment().startOf('day');
      const endOfDay = moment().endOf('day');
      const oas = await OA.find({
        $expr: {
          $and: [
            {
              $gte: [
                { $dateFromString: { dateString: "$result_date" } },
                new Date(startOfDay.toISOString())
              ]
            },
            {
              $lte: [
                { $dateFromString: { dateString: "$result_date" } },
                new Date(endOfDay.toISOString())
              ]
            }
          ]
        }
      });
  
      if (oas.length === 0) {
        return res.status(200).json({ 
          message: 'No oas with results today',
          data: [] 
        });
      }
  
      const result = oas.map((oa) => ({
        company_name: oa.company_name,
        company_logo: oa.company_logo,
        shortlisted_students: oa.shortlisted_students?.map((student) => ({
          name: student.name,
          email: student.email,
          rollno: student.rollno,
        })) || [],
      }));
  
      return res.status(200).json({
        message: 'Today\'s shortlisted students grouped by company',
        data: result,
      });
  
    } catch (error) {
      console.error('Error fetching today\'s shortlists:', error);
      console.error('Error details:', error.stack);
      res.status(500).json({ 
        message: 'Internal server error',
        error: error.message 
      });
    }
  };
 */
  export const getEligibleUpcomingOAs = async (req, res) => {
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
      
      if (upcomingOAs.length === 0) {
        return res.status(404).json({ message: "No upcoming OAs found for the student." });
      }
      res.status(200).json({ upcomingOAs });
    } catch (error) {
      console.error("Error fetching upcoming OAs:", error);
      res.status(500).json({ message: "Server error while fetching upcoming OAs." });
    }
  };
  
  

  export const getEligiblePastOAs = async (req, res) => {
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
  
      if (pastOAs.length === 0) {
        return res.status(404).json({ 
          message: "No past OAs found for the student."
        });
      }
  
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




