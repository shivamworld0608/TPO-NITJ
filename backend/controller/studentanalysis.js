import Student from '../models/user_model/student.js';
import JobProfile from '../models/jobprofile.js';
import OfferTracker from '../models/offertracker.js';
import mongoose from 'mongoose';
import axios from 'axios';

export const getStudentAnalytics = async (req, res) => {
    try {
        // Extract filter query parameters
        const {
            department,
            course,
            batch,
            cgpa,
            gender,
            rollno,
            debarred,
            active_backlogs,
            backlogs_history,
            name,
            placementstatus,
            category,
            internshipstatus
        } = req.query;

        console.log('Query parameters:', req.query);

        // Build the filter object for MongoDB query
        const filter = {};

        if (department && department !== 'All') {
            filter.department = department;
        }
        if (course && course !== 'All') {
            filter.course = course;
        }
        if (batch && batch !== 'All') {
            filter.batch = batch;
        }
        if (cgpa && cgpa !== 'All') {
            filter.cgpa = { $gt: parseFloat(cgpa.replace('> ', '')) };
        }
        if (gender && gender !== 'All') {
            filter.gender = gender;
        }
        if (rollno) {
            filter.rollno = { $regex: rollno, $options: 'i' }; // Case-insensitive partial match
        }
        if (debarred && debarred !== 'All') {
            filter.debarred = debarred === 'true';
        }
        if (active_backlogs && active_backlogs !== 'All') {
            filter.active_backlogs = active_backlogs === 'true';
        }
        if (backlogs_history && backlogs_history !== 'All') {
            filter.backlogs_history = backlogs_history === 'true';
        }
        if (name) {
            filter.name = { $regex: name, $options: 'i' }; // Case-insensitive partial match
        }
        if (placementstatus && placementstatus !== 'All') {
            filter.placementstatus = placementstatus;
        }
        if (category && category !== 'All') {
            filter.category = category;
        }
        if (internshipstatus && internshipstatus !== 'All') {
            filter.internshipstatus = internshipstatus;
        }

        // Fetch students with applied filters
        const students = await Student.find(filter);

        const jobProfiles = await JobProfile.find();

        const rollNumbers = students.map(student => student.rollno);
        let erpDataMap = new Map();

        // Attempt to fetch ERP data, but continue even if it fails
        try {
            const response = await axios.post(`${process.env.ERP_SERVER}`, rollNumbers);
            const erpStudents = response.data.data || [];
            console.log("erpStudents:", erpStudents);
            erpStudents.forEach(erpStudent => {
                erpDataMap.set(erpStudent.rollno, {
                    ...erpStudent,
                    batch: erpStudent.batch,
                    active_backlogs: erpStudent.active_backlogs === 'true',
                    backlogs_history: erpStudent.backlogs_history === 'true'
                });
            });
        } catch (error) {
            console.error("Error fetching ERP data:", error.message);
            // Continue without ERP data, relying on database
        }

        const studentsAnalytics = await Promise.all(
            students.map(async (student) => {
                try {
                    const erpData = erpDataMap.get(student.rollno);
                    const course = student.course;
                    const courseDurations = {
                        "B.Tech": 4,
                        "M.Tech": 2,
                        "B.Sc.-B.Ed.": 4,
                        "MBA": 2,
                        "M.Sc.": 2
                    };
                    const adjustment = courseDurations[course] || 0;
                    let adjustedBatch = student.batch;
                    if (erpData && erpData.batch && !isNaN(Number(erpData.batch))) {
                        adjustedBatch = String(Number(erpData.batch) + adjustment);
                    }

                    const offers = await OfferTracker.findOne({ studentId: student._id });

                    const studentData = {
                        _id: student._id,
                        name: student.name || '',
                        email: student.email || '',
                        phone: student.phone || '',
                        rollno: student.rollno || '',
                        department: student.department || '',
                        course: student.course || '',
                        batch: adjustedBatch,
                        gender: student.gender || '',
                        category: student.category || '',
                        cgpa: erpData?.cgpa ?? student.cgpa ?? 0,
                        placementstatus: student.placementstatus || 'Not Placed',
                        internshipstatus: student.internshipstatus || 'No Intern',
                        debarred: student.debarred ?? false,
                        active_backlogs: erpData?.active_backlogs ?? student.active_backlogs ?? false,
                        backlogs_history: erpData?.backlogs_history ?? student.backlogs_history ?? false,
                        offers:  offers? offers?.offer : [],
                        applications: {
                            total: 0,
                            jobProfiles: []
                        },
                        assessments: {
                            resumeshortlisting: {
                                total: 0,
                                shortlisted: 0,
                                rejected: 0
                            },
                            oa: {
                                total: 0,
                                shortlisted: 0,
                                rejected: 0,
                                absent: 0
                            },
                            interview: {
                                total: 0,
                                shortlisted: 0,
                                rejected: 0,
                                absent: 0
                            },
                            gd: {
                                total: 0,
                                shortlisted: 0,
                                rejected: 0,
                                absent: 0
                            },
                            others: {
                                total: 0,
                                shortlisted: 0,
                                rejected: 0,
                                absent: 0
                            }
                        }
                    };

                    for (const job of jobProfiles) {
                        const hasApplied = job.Applied_Students?.includes(student._id) || false;
                        if (hasApplied) {
                            studentData.applications.total++;
                            studentData.applications.jobProfiles.push({
                                job_id: job.job_id || '',
                                company_name: job.company_name || '',
                                job_role: job.job_role || '',
                                job_type: job.job_type || '',
                                job_class: job.job_class || ''
                            });
                        }
                        job.Hiring_Workflow?.forEach(step => {
                            const assessmentType = step.step_type?.toLowerCase().replace(/\s+/g, '') || 'others';
                            if (step.eligible_students?.includes(student._id)) {
                                studentData.assessments[assessmentType].total++;
                                if (step.shortlisted_students?.includes(student._id)) {
                                    studentData.assessments[assessmentType].shortlisted++;
                                } else if (step.absent_students?.includes(student._id)) {
                                    studentData.assessments[assessmentType].absent++;
                                } else {
                                    studentData.assessments[assessmentType].rejected++;
                                }
                            }
                        });
                    }

                    Object.keys(studentData.assessments).forEach(assessmentType => {
                        const assessment = studentData.assessments[assessmentType];
                        if (assessment.total > 0) {
                            assessment.successRate = ((assessment.shortlisted / assessment.total) * 100).toFixed(2) + '%';
                        }
                    });

                    return studentData;
                } catch (error) {
                    console.error(`Error processing student ${student.rollno}:`, error.message);
                    // Return a minimal student object to avoid failing the entire Promise.all
                    return {
                        _id: student._id,
                        rollno: student.rollno || '',
                        name: student.name || 'Unknown',
                        error: `Failed to process: ${error.message}`
                    };
                }
            })
        );

        console.log(`Processed ${studentsAnalytics.length} students`);

        return res.status(200).json({
            success: true,
            message: "Student analytics retrieved successfully",
            data: studentsAnalytics,
            summary: {
                totalStudents: students.length,
                placementStatus: {
                    notPlaced: students.filter(s => s.placementstatus === 'Not Placed').length,
                    belowDream: students.filter(s => s.placementstatus === 'Below Dream').length,
                    dream: students.filter(s => s.placementstatus === 'Dream').length,
                    superDream: students.filter(s => s.placementstatus === 'Super Dream').length
                }
            }
        });

    } catch (error) {
        console.error('Error in getStudentAnalytics:', error);
        return res.status(500).json({
            success: false,
            message: "Error retrieving student analytics",
            error: error.message
        });
    }
};

export const Studentprofileupdate = async (req, res) => {
    try {
        const userId = req.params.id;
        const editedStudent=req.body;
        const { name, rollno, email, phone, department, batch, course,debarred, cgpa, gender, placementstatus, active_backlogs, backlogs_history } = editedStudent;
        const student = await Student.findById(userId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        if(name!="") student.name = name;
        if(rollno!="") student.rollno = rollno;
        if(email!="") student.email = email;
        if(phone!="") student.phone = phone;
        if(department!="") student.department = department;
        if(batch!="") student.batch = batch;
        if(course!="") student.course = course;
        if(cgpa!="") student.cgpa = cgpa;
        if(gender!="") student.gender = gender;
        if(debarred!="")student.debarred=debarred;
        if(placementstatus!="") student.placementstatus = placementstatus;
        if(active_backlogs!="") student.active_backlogs = active_backlogs;
        if(backlogs_history!="") student.backlogs_history = backlogs_history;
        await student.save();
        res.status(200).json({ message: 'Profile updated successfully'});
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const updateOfferTracker = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { offer } = req.body;

    // Validate student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Validate offer data
    if (!Array.isArray(offer)) {
      return res.status(400).json({ message: 'Offer must be an array' });
    }

    const validOfferTypes = ['Intern', 'Intern+PPO', 'Intern+FTE', 'FTE'];
    // const validCategories = ['Not Considered', 'Below Dream', 'Dream', 'Super Dream'];
    const validSectors = ['PSU', 'Private'];

    for (const offerItem of offer) {
      if (!validOfferTypes.includes(offerItem.offer_type)) {
        return res.status(400).json({ message: `Invalid offer type: ${offerItem.offer_type}` });
      }
    //   if (!validCategories.includes(offerItem.offer_category)) {
    //     return res.status(400).json({ message: `Invalid offer category: ${offerItem.offer_category}` });
    //   }
      if (!validSectors.includes(offerItem.offer_sector)) {
        return res.status(400).json({ message: `Invalid offer sector: ${offerItem.offer_sector}` });
      }
      console.log(offerItem.jobId);
      if (offerItem.jobId && !mongoose.Types.ObjectId.isValid(offerItem.jobId)) {
        return res.status(400).json({ message: `Invalid jobId: ${offerItem.jobId}` });
      }
      // Validate jobId exists
      if (offer.jobId) {
        const job = await JobProfile.findById(offerItem.jobId);
        if (!job) {
          return res.status(404).json({ message: `Job profile not found for jobId: ${offerItem.jobId}` });
        }
      }
    }

    // Update or create offer tracker
    let offerTracker = await OfferTracker.findOne({ studentId });
    
    if (offerTracker) {
      offerTracker.offer = offer;
      await offerTracker.save();
    } else {
      offerTracker = await OfferTracker.create({
        studentId,
        offer
      });
    }

    res.status(200).json({ message: 'Offer tracker updated successfully', data: offerTracker });
  } catch (error) {
    console.error('Error updating offer tracker:', error);
    res.status(500).json({ message: 'Server error' });
  }
};