//create, edit and delete interview
//approve and reject interview
//negotiate interview time

import Interview from '../models/interview.js';
import Student from "../models/user_model/student.js";
import moment from 'moment';


//for checking shortlisting status of own by student,  modify if it is upcoming then don't show yet to be decided
export const checkShortlistStatus = async (req, res) => {
  const { userId, job_id, interview_code } = req.params;
  try {
    const student = await Student.findById(userId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    const studentRollNo = student.rollno;
    const interview = await Interview.findOne({ job_id, interview_code });
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }
    const { shortlisted_students } = interview;
    if (shortlisted_students.length === 0) {
      return res.status(200).json({ message: 'Yet to be decided' });
    }
    const isShortlisted = shortlisted_students.some(
      (student) => student.rollno === studentRollNo
    );
    if (isShortlisted) {
      return res.status(200).json({ message: 'Shortlisted', interview });
    }
    return res.status(200).json({ message: 'Not shortlisted' });
  } catch (error) {
    console.error('Error checking shortlist status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



//for getting today's shortlists
export const getTodayShortlistsGroupedByCompany = async (req, res) => {
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


//for getting interview all info using jobid and interview code
export const getInterviewDetails = async (req, res) => {
    const { jobId, interviewCode } = req.params;
    try {
      const interview = await Interview.findOne({ 
        job_id: jobId, 
        interview_code: interviewCode 
      });
      if (!interview) {
        return res.status(404).json({ message: 'Interview not found' });
      }
      return res.status(200).json({ 
        message: 'Interview details retrieved successfully',
        interview 
      });
    } catch (error) {
      console.error('Error fetching interview details:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };



  export const getEligibleUpcomingInterviews = async (req, res) => {
    try {
      const userId = req.params.userId;
      const student = await Student.findById(userId);
      if (!student) {
        throw new Error("Student not found");
      }
      const userRollNo = student.rollno;
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      const interviews = await Interview.find({
        $expr: {
          $gte: [
            { $dateFromString: { dateString: "$interview_date" } },
            currentDate
          ]
        },
        "eligible_students.rollno": userRollNo
      });
      return res.status(200).json({ interviews });
    } catch (error) {
      console.error("Error fetching eligible upcoming interviews:", error);
      throw error;
    }
  };
  
  

//past interview
export const getEligiblePastInterviews = async (req,res) => {
    try {
      const userId = req.params.userId;
      const student = await Student.findById(userId);
      if (!student) {
        throw new Error('Student not found');
      }
  
      const userRollNo = student.rollno;
      const currentDate = moment().startOf('day');
      
/*       console.log("User Roll Number:", userRollNo);
      console.log("Current Date:", currentDate.toISOString()); */
  
      const interviews = await Interview.find({
        $expr: {
          $lt: [
            { $dateFromString: { dateString: "$interview_date" } },
            new Date(currentDate.toISOString())
          ]
        },
        "eligible_students.rollno": userRollNo
      });
  
/*       // Debug logging
      console.log("Found past interviews:", interviews.map(interview => ({
        id: interview._id,
        date: interview.interview_date,
        company: interview.company_name
      })));
   */
      return res.status(200).json({ interviews });
    } catch (error) {
      console.error("Error fetching eligible past interviews: ", error);
      throw error;
    }
  };





