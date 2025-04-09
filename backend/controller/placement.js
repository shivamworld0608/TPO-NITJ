import Placement from '../models/placement.js'; 
import moment from 'moment';

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
    const filters = {};
    if (company_name) filters.company_name = { $regex: company_name, $options: "i" };
    if (placement_type) filters.placement_type = placement_type;
    if (batch) filters.batch = batch;
    if (degree) filters.degree = degree;

    let placements = await Placement.find(filters);

    if (ctc) {
      placements = placements.filter((placement) => {
        const numericCtc = parseFloat(placement.ctc);
        if (isNaN(numericCtc)) return false;
        if (ctc === "one") return numericCtc < 1000000;
        if (ctc === "two") return numericCtc >= 1000000 && numericCtc < 2000000;
        if (ctc === "three") return numericCtc >= 2000000;
        return true;
      });
    }

    let totalOffers = 0;
    let totalCTC = 0;
    let countCTC = 0;
    const companiesVisited = new Set();
    const uniqueStudentKeys = new Set();

    for (const placement of placements) {
      const matchingStudents = placement.shortlisted_students.filter((student) => {
        const matchesGender =
          !gender || student.gender?.toLowerCase() === gender.toLowerCase();
        const matchesDepartment =
          !department || student.department?.toLowerCase() === department.toLowerCase();
        const matchesStudentName =
          !student_name || student.name?.toLowerCase().includes(student_name.toLowerCase());

        return matchesGender && matchesDepartment && matchesStudentName;
      });

      if (matchingStudents.length === 0) continue;

      totalOffers += matchingStudents.length;
      companiesVisited.add(placement.company_name);

      for (const student of matchingStudents) {
        const key = student.studentId?.toString() || `${student.name?.toLowerCase()}|${student.email?.toLowerCase()}`;
        uniqueStudentKeys.add(key);
      }

      const numericCtc = parseFloat(placement.ctc);
      if (!isNaN(numericCtc)) {
        totalCTC += numericCtc * matchingStudents.length;
        countCTC += matchingStudents.length;
      }
    }

    const averageCtcLPA =
      countCTC > 0 ? `${(totalCTC / countCTC / 100000).toFixed(2)}` : "N/A";

    res.status(200).json({
      totalStudentsPlaced: uniqueStudentKeys.size,
      companiesVisited: companiesVisited.size,
      average_ctc: averageCtcLPA,
    });
  } catch (error) {
    console.error("Error in getPlacementInsights:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
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
   
    const filters = {};
    if (company_name) filters.company_name = { $regex: company_name, $options: "i" };
    if (placement_type) filters.placement_type = placement_type;
    if (batch) filters.batch = batch;
    if (degree) filters.degree = degree;
 
    const allPlacements = await Placement.find(filters);
    let placements;
    
    if(ctc){
      const filteredByCtc = allPlacements.filter((placement) => {
        const numericCtc = parseInt(placement.ctc);
        if (isNaN(numericCtc)) return false;
        if (ctc === "one") return numericCtc < 1000000;
        if (ctc === "two") return numericCtc >= 1000000 && numericCtc < 2000000;
        if (ctc === "three") return numericCtc >= 2000000;
        return true;
      });
      placements = filteredByCtc;
    }
    else{
      placements = allPlacements;
    }

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

    const finalPlacements = filteredPlacements.filter(
      (placement) => placement.shortlisted_students.length > 0
    );

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