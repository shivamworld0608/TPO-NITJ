import JobProfile from "../models/jobprofile.js";
//for getting today's shortlists
/* export const getTodayShortlistsGroupedByCompany = async (req, res) => {
    try {
      const startOfDay = moment().startOf('day');
      const endOfDay = moment().endOf('day');
  
      console.log("Searching for results between:", {
        startOfDay: startOfDay.toISOString(),
        endOfDay: endOfDay.toISOString()
      });
  
      const interviews = await Interview.find({
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
  
  
      if (interviews.length === 0) {
        return res.status(200).json({ 
          message: 'No interviews with results today',
          data: [] 
        });
      }
  
      const result = interviews.map((interview) => ({
        company_name: interview.company_name,
        company_logo: interview.company_logo,
        shortlisted_students: interview.shortlisted_students?.map((student) => ({
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



  export const getEligibleUpcomingInterviews = async (req, res) => {
    try {
      const studentId = req.user.userId;
      const jobsWithInterviews = await JobProfile.find({
        "Hiring_Workflow.eligible_students": studentId,
        "Hiring_Workflow.step_type": "Interview",
      })
        .select(
          "company_name company_logo Hiring_Workflow"
        )
        .lean();
      
      const upcomingInterviews = jobsWithInterviews.flatMap((job) => {
      const workflow = Array.isArray(job.Hiring_Workflow) ? job.Hiring_Workflow : [];
        
        return workflow
          .filter(
            (step) => 
              step.step_type === "Interview" && 
              new Date(step.details.interview_date) > new Date()
          )
          .map((step) => ({
            company_name: job.company_name,
            company_logo: job.company_logo,
            interview_type:step.details.interview_type,
            interview_date: step.details.interview_date,
            interview_time: step.details.interview_time,
            interview_info: step.details.interview_info,
            interview_link: step.details.interview_link,
          }));
      });
      
      if (upcomingInterviews.length === 0) {
        return res.status(404).json({ message: "No upcoming Interviews found for the student." });
      }
      res.status(200).json({ upcomingInterviews });
    } catch (error) {
      console.error("Error fetching upcoming Interviews:", error);
      res.status(500).json({ message: "Server error while fetching upcoming Interviews." });
    }
  };
  
  export const getEligiblePastInterviews = async (req, res) => {
    try {
      const studentId = req.user.userId;
      const jobsWithInterviews = await JobProfile.find({
        "Hiring_Workflow.eligible_students": studentId,
        "Hiring_Workflow.step_type": "Interview",
      })
        .select(
          "company_name company_logo Hiring_Workflow"
        )
        .lean();
      
      const pastInterviews = jobsWithInterviews.flatMap((job) => {
      const workflow = Array.isArray(job.Hiring_Workflow) ? job.Hiring_Workflow : [];
        
        return workflow
          .filter(
            (step) => 
              step.step_type === "Interview" && 
              new Date(step.details.interview_date) < new Date()
          )
          .map((step) => ({
            company_name: job.company_name,
            company_logo: job.company_logo,
            interview_type:step.details.interview_type,
            interview_date: step.details.interview_date,
            interview_time: step.details.interview_time,
            interview_info: step.details.interview_info,
            interview_link: step.details.interview_link,
            was_shortlisted: step.shortlisted_students?.length === 0 
            ? "Result yet to be declared"
            : step.shortlisted_students?.includes(studentId) || false
          }));
      });
      pastInterviews.sort((a, b) => new Date(b.interview_date) - new Date(a.interview_date));
      if (pastInterviews.length === 0) {
        return res.status(404).json({ message: "No Past Interview found for the student." });
      }
      res.status(200).json({ pastInterviews });
    } catch (error) {
      console.error("Error fetching past Interviews:", error);
      res.status(500).json({ message: "Server error while fetching past Interviews." });
    }
  };
  
  



