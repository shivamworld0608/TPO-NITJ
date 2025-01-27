import Student from '../models/user_model/student.js';
import JobProfile from '../models/jobprofile.js';

export const getStudentAnalytics = async (req, res) => {
    try {
        const students = await Student.find();
        const jobProfiles = await JobProfile.find();
        
        const studentsAnalytics = await Promise.all(students.map(async (student) => {
            const studentData = {
                _id: student._id,
                name: student.name,
                email: student.email,
                rollno: student.rollno,
                department: student.department,
                course: student.course,
                batch: student.batch,
                cgpa: student.cgpa,
                placementstatus: student.placementstatus,
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
                    other: {
                        total: 0,
                        shortlisted: 0,
                        rejected: 0,
                        absent: 0
                    }
                }
            };

            for (const job of jobProfiles) {
                const hasApplied = job.Applied_Students.includes(student._id);
                if (hasApplied) {
                    studentData.applications.total++;
                    studentData.applications.jobProfiles.push({
                        job_id: job.job_id,
                        company_name: job.company_name,
                        job_role: job.job_role,
                        job_type: job.job_type,
                        job_class: job.job_class
                    });
                }
                job.Hiring_Workflow.forEach(step => {
                    const assessmentType = step.step_type.toLowerCase().replace(/\s+/g, '');
                    if (step.eligible_students.includes(student._id)) {
                        studentData.assessments[assessmentType].total++;
                        if (step.shortlisted_students.includes(student._id)) {
                            studentData.assessments[assessmentType].shortlisted++;
                        } else if (step.absent_students.includes(student._id)) {
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
        }));

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