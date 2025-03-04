import Internship from '../models/internship.js';

export const getLastSevenDaysInternships = async (req, res) => {
    try {
      const allInternships = await Internship.find({});
      const today = new Date();
      const startOfLastSevenDays = new Date(today);
      startOfLastSevenDays.setDate(today.getDate() - 7);
      startOfLastSevenDays.setHours(0, 0, 0, 0);
  
      const endOfToday = new Date(today);
      endOfToday.setHours(23, 59, 59, 999);
  
      const Internships = await Internship.find({
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
  
      res.status(200).json(Internships);
    } catch (error) {
      console.error("Error with details:", {
        message: error.message,
        stack: error.stack,
      });
      res.status(500).json({ error: "Internal server error" });
    }
  };