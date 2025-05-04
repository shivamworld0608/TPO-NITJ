import Placement from '../models/placement.js';
import Internship from '../models/internship.js';
import Student from '../models/user_model/student.js';
export const getPlacementReports = async (req, res) => {
  console.log('Received request for placement reports');
  try {
    const { batch, degree, department, type } = req.query;
    const filter = {};
    if (batch) filter.batch = batch;
    if (degree) filter.degree = degree;
    let results = [];
    if (!type || type === 'placement') {
      const placements = await Placement.find(filter);
      const placementData = placements.flatMap(placement => {
        return placement.shortlisted_students
          .filter(student => !department || student.department?.toLowerCase() === department.toLowerCase())
          .map(async (student, index) => {
            const studentData = await Student.findOne({ email: student.email });
            console.log(studentData);
            return {
              id: `P-${placement._id}-${index}`,
              roll_no: studentData ? studentData.rollno : 'N/A',  
              name: student.name,
              branch: student.department,
              gender: student.gender.slice(0,1),
              category: student.category,
              date_result: new Date(placement.createdAt).toLocaleDateString(),
              profile: placement.role,
              company: placement.company_name,
              package: placement.ctc ? (placement.ctc): 'N/A',
              student_status: placement.placement_type|| 'Placed',
              placement_type: 'Placement',
              batch: placement.batch,
              degree: placement.degree
            };
          });
      });

      const resolvedPlacementData = await Promise.all(placementData);
      results = [...results, ...resolvedPlacementData];
    }

    else if (!type || type === 'internship') {
      const internships = await Internship.find(filter);
      const internshipData = internships.flatMap(internship => {
        return internship.shortlisted_students
          .filter(student => !department || student.department?.toLowerCase() === department.toLowerCase())
          .map(async (student, index) => {
            const studentData = await Student.findOne({ email: student.email });
            return {
              id: `I-${internship._id}-${index}`,
              roll_no: studentData ? studentData.rollno : 'N/A',
              name: student.name,
              branch: student.department,
              gender: student.gender.slice(0,1),
              category: student.category,
              date_result: new Date(internship.createdAt).toLocaleDateString(),
              profile: internship.role,
              company: internship.company_name,
              package: internship.stipend ? (internship.stipend): 'N/A',
              student_status: internship.internship_type || 'Intern',
              placement_type: 'Internship',
              duration: internship.internship_duration,
              batch: internship.batch,
              degree: internship.degree
            };
          });
      });

      const resolvedInternshipData = await Promise.all(internshipData);
      results = [...results, ...resolvedInternshipData];
    }
    results = results.map((item, index) => ({
    sr_no: index + 1,
    ...item
  }));

  const studentCounts = {};
  results.forEach(item => {
    if (!studentCounts[item.roll_no]) {
      studentCounts[item.roll_no] = 1;
    } else {
      studentCounts[item.roll_no]++;
    }
    console.log(item, studentCounts[item.roll_no]);
  });
//   results = results.map(item => {
//     if (studentCounts[item.roll_no] > 1) {
//       return { ...item, student_status: 'Double Placed' };
//     }
//     return item;
//   });

  res.status(200).json({
    success: true,
    results,
    count: results.length
  });
} catch (error) {
  console.error("Error fetching placement reports:", error);
  res.status(500).json({
    success: false,
    message: "Failed to fetch placement reports",
    error: error.message
  });
}
};

export const getFilterOptions = async (req, res) => {
  try {
    const placementBatches = await Placement.distinct('batch');
    const internshipBatches = await Internship.distinct('batch');
    const batches = [...new Set([...placementBatches, ...internshipBatches])].sort();

    const placementDegrees = await Placement.distinct('degree');
    const internshipDegrees = await Internship.distinct('degree');
    const degrees = [...new Set([...placementDegrees, ...internshipDegrees])];

    const placementDepartments = await Placement.aggregate([
      { $unwind: '$shortlisted_students' },
      { $group: { _id: '$shortlisted_students.department' } }
    ]);

    const internshipDepartments = await Internship.aggregate([
      { $unwind: '$shortlisted_students' },
      { $group: { _id: '$shortlisted_students.department' } }
    ]);

    const departments = [...new Set([
      ...placementDepartments.map(item => item._id),
      ...internshipDepartments.map(item => item._id)
    ])].filter(Boolean).sort();

    res.status(200).json({
      success: true,
      filterOptions: {
        batches,
        degrees,
        departments
      }
    });
  } catch (error) {
    console.error("Error fetching filter options:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch filter options",
      error: error.message
    });
  }
};