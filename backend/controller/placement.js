import Placement from '../models/placement.js'; // Adjust the path as needed
import moment from 'moment'; // For date handling

export const getTodayPlacements = async (req, res) => {
  try {
    const startOfDay = moment().startOf('day').toDate();
    const endOfDay = moment().endOf('day').toDate();

    const todayPlacements = await Placement.find({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    res.json(todayPlacements);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all placements
export const getAllPlacements = async (req, res) => {
  try {
    const allPlacements = await Placement.find().sort({ createdAt: -1 });
    res.json(allPlacements);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPlacementInsights = async (req, res) => {
  try {
    const batchToFilter = req.query.batch || "2022"; // Default to 2022 if no batch is provided
    const degreeToFilter = req.query.degree || "B.Tech"; // Default to B.Tech if no degree is provided

    // Fetch placements with both batch and degree filtering
    const allPlacements = await Placement.find({
      batch: batchToFilter,
      degree: degreeToFilter,
    })
    .sort({ createdAt: -1 });

    const uniqueStudents = new Set();
    let totalCtc = 0;
    let totalStudents = 0;
    const companiesVisited = new Set();
    
    allPlacements.forEach((placement) => {
      companiesVisited.add(placement.company_name);
      totalStudents += placement.shortlisted_students.length;
      placement.shortlisted_students.forEach((student) => {        
        uniqueStudents.add(student.email); // Ensure students are counted only once
        totalCtc += placement.ctc; // Add the CTC to the total sum
      });
    });
    
    const averagePackage = totalStudents > 0 ? (totalCtc / totalStudents).toFixed(2) : 0;

    totalStudents = uniqueStudents.size; // Total unique students placed
    const totalCompanies = companiesVisited.size; // Total unique companies visited
    
    res.json({
      totalStudentsPlaced: totalStudents,
      companiesVisited: totalCompanies,
      averagePackage: averagePackage,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getFilteredPlacements = async (req, res) => {
  try {
    const {
      company_name,
      student_name,
      placement_type,
      batch,
      degree,
      gender,
      department,
      ctc,
    } = req.query;

    // Build dynamic filters for placements
    const filters = {};
    if (company_name) filters.company_name = { $regex: company_name, $options: "i" };
    if (placement_type) filters.placement_type = placement_type;
    if (batch) filters.batch = batch;
    if (degree) filters.degree = degree;

    // Handling CTC filtering based on ranges
    if (ctc) {
      if (ctc === "one") {
        filters.ctc = { $lt: "1000000" }; // Less than 10 LPA
      } else if (ctc === "two") {
        filters.ctc = { $gte: "1000000", $lt: "2000000" }; // Between 10 and 20 LPA
      } else if (ctc === "three") {
        filters.ctc = { $gte: "2000000" }; // Greater than 20 LPA
      }
    }

 

    const placements = await Placement.find(filters);

    const filteredPlacements = placements.map((placement) => {
      const filteredStudents = placement.shortlisted_students.filter((student) => {
        const matchesGender = !gender || student.gender.toLowerCase() === gender.toLowerCase();
        const matchesDepartment =
          !department || student.department.toLowerCase() === department.toLowerCase();
        const matchesStudentName =
          !student_name || student.name.toLowerCase().includes(student_name.toLowerCase());
        return matchesGender && matchesDepartment && matchesStudentName;
      });

      return { ...placement.toObject(), shortlisted_students: filteredStudents };
    });

    // Remove placements without any shortlisted students after filtering
    const finalPlacements = filteredPlacements.filter(
      (placement) => placement.shortlisted_students.length > 0
    );

    // Return the filtered placements
    res.status(200).json(finalPlacements);
  } catch (error) {
    console.error("Error fetching placements:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getLastSevenDaysPlacements = async (req, res) => {
  try {
    const allPlacements = await Placement.find({});
    const today = new Date();
    const startOfLastSevenDays = new Date(today);
    startOfLastSevenDays.setDate(today.getDate() - 7);
    startOfLastSevenDays.setHours(0, 0, 0, 0);

    const endOfToday = new Date(today);
    endOfToday.setHours(23, 59, 59, 999);

    const placements = await Placement.find({
      $expr: {
        $and: [
          {
            $gte: [
              {
                $cond: {
                  if: { $eq: [{ $type: "$createdAt" }, "date"] },
                  then: "$createdAt",
                  else: { $dateFromString: { dateString: "$createdAt" } },
                },
              },
              startOfLastSevenDays,
            ],
          },
          {
            $lte: [
              {
                $cond: {
                  if: { $eq: [{ $type: "$createdAt" }, "date"] },
                  then: "$createdAt",
                  else: { $dateFromString: { dateString: "$createdAt" } },
                },
              },
              endOfToday,
            ],
          },
        ],
      },
    }).sort({ createdAt: -1 });

    res.status(200).json(placements);
  } catch (error) {
    console.error("Error with details:", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCombinedInsights = async (req, res) => {
  try {
    const batch = req.query.batch || "2022"; // Default to 2022 if no batch is provided
    const degree = req.query.degree || "B.Tech"; // Default to B.Tech if no degree is provided

    const filter = {};
    if (batch) filter.batch = batch;
    if (degree) filter.degree = degree;

    const departmentData = await Placement.aggregate([
      { $match: filter },
      { $unwind: "$shortlisted_students" },
      {
        $group: {
          _id: "$shortlisted_students.department",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    const packageData = await Placement.aggregate([
      { $match: filter },
      { $unwind: "$shortlisted_students" },
      {
        $group: {
          _id: {
            $cond: [
              { $lt: ["$ctc", 1000000] },
              "<10 LPA",
              {
                $cond: [
                  { $and: [{ $gte: ["$ctc", 1000000] }, { $lt: ["$ctc", 2000000] }] },
                  "10-20 LPA",
                  ">20 LPA",
                ],
              },
            ],
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      departmentWise: departmentData,
      packageWise: packageData,
    });
  } catch (error) {
    console.error("Error fetching combined insights:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// With uniquessness of one student multiple offers counted once
// export const getCombinedInsights = async (req, res) => {
//   try {
//     const batch = req.query.batch || "2022"; // Default to 2022 if no batch is provided
//     const degree = req.query.degree || "B.Tech"; // Default to B.Tech if no degree is provided

//     const filter = {};
//     if (batch) filter.batch = batch;
//     if (degree) filter.degree = degree;

//     // Department-Wise Data
//     const departmentData = await Placement.aggregate([
//       { $match: filter },
//       { $unwind: "$shortlisted_students" },
//       {
//         $group: {
//           _id: {
//             department: "$shortlisted_students.department",
//             email: "$shortlisted_students.email", // Group by student email to ensure uniqueness
//           },
//         },
//       },
//       {
//         $group: {
//           _id: "$_id.department",
//           count: { $sum: 1 }, // Count unique students in each department
//         },
//       },
//       { $sort: { count: -1 } },
//     ]);

//     // Package-Wise Data
//     const packageData = await Placement.aggregate([
//       { $match: filter },
//       { $unwind: "$shortlisted_students" },
//       {
//         $group: {
//           _id: {
//             packageRange: {
//               $cond: [
//                 { $lt: ["$ctc", 1000000] },
//                 "<10 LPA",
//                 {
//                   $cond: [
//                     { $and: [{ $gte: ["$ctc", 1000000] }, { $lt: ["$ctc", 2000000] }] },
//                     "10-20 LPA",
//                     ">20 LPA",
//                   ],
//                 },
//               ],
//             },
//             email: "$shortlisted_students.email", // Group by student email to ensure uniqueness
//           },
//         },
//       },
//       {
//         $group: {
//           _id: "$_id.packageRange",
//           count: { $sum: 1 }, // Count unique students in each package range
//         },
//       },
//       { $sort: { _id: 1 } },
//     ]);

//     res.status(200).json({
//       departmentWise: departmentData,
//       packageWise: packageData,
//     });
//   } catch (error) {
//     console.error("Error fetching combined insights:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
