import Issue from "../models/reqhelp.js";

export const createIssue = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.userId;
    const userType=req.user.userType;

    let issue = await Issue.findOne({ title });
    if (!issue) {
      issue = await Issue.create({ title, details: [] });
    }

    const newDetail = {
      userId,
      onModel: userType,
      description,
      status: "Pending",
      raisedAt: new Date(),
    };

    issue.details.push(newDetail);
    await issue.save();

    res.status(201).json({ success: true, data: issue });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const getUserIssues = async (req, res) => {
    try {
        console.log("yha aagye");
      const userId = req.user.userId;
      try{
      const unresolvedIssues = await Issue.find({
        "details.userId": userId,
        "details.status": "Pending",
      }).populate({
        path: "details.userId",
        select: "name email",
        model: "details.onModel",
      });}
      catch(error){
        console.log(error);
      }
      console.log("yha aagye",unresolvedIssues);
      const resolvedIssues = await Issue.find({
        "details.userId": userId,
        "details.status": "Resolved",
      }).populate({
        path: "details.userId",
        select: "name email",
        model: "details.onModel",
      });
      res.status(200).json({
        success: true,
        unresolved: unresolvedIssues,
        resolved: resolvedIssues,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server Error", error });
    }
  };
  

export const resolveIssue = async (req, res) => {
  try {
    const { issueId, detailId } = req.params;
    const professorId = req.user.userId;

    const issue = await Issue.findOneAndUpdate(
      { _id: issueId, "details._id": detailId },
      {
        $set: {
          "details.$.status": "Resolved",
          "details.$.resolvedBy": professorId,
          "details.$.resolvedAt": new Date(),
        },
      },
      { new: true }
    ).populate({
      path: "details.userId",
      select: "name email",
      model: "details.onModel",
    });

    if (!issue) {
      return res.status(404).json({ success: false, message: "Issue or Detail not found" });
    }

    res.status(200).json({ success: true, data: issue });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const getAllIssues = async (req, res) => {
    try {
      const { status } = req.query;
      const filter = status ? { "details.status": status } : {};
  
      const issues = await Issue.find(filter).populate({
        path: "details.userId",
        select: "name email",
        model: "details.onModel",
      });
  
      res.status(200).json({ success: true, data: issues });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server Error", error });
    }
  };

export const getUnresolvedIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ "details.status": "Pending" }).populate({
      path: "details.userId",
      select: "name email",
      model: "details.onModel",
    });

    res.status(200).json({ success: true, data: issues });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};
