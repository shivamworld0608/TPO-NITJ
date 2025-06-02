// import Notification from "../models/notification.js";

// export const getNotifications = async (req, res) => {
//   try {
//     const notifications = await Notification.find().sort({ timestamp: -1 });
//     res.status(200).json(notifications);
//   } catch (error) {
//     console.error("Error fetching notifications:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

import Notification from "../models/notification.js";

export const getNotifications = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const notifications = await Notification.find({
      timestamp: { $gte: sevenDaysAgo }
    }).sort({ timestamp: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
