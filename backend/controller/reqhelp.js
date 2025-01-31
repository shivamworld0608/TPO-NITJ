import Issue from "../models/reqhelp.js";
import mongoose from "mongoose";

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
      const userId = req.user.userId;
  
      const unresolvedIssues = await Issue.find({
        "details.userId": userId,
        "details.status": "Pending",
      });
  
      const resolvedIssues = await Issue.find({
        "details.userId": userId,
        "details.status": "Resolved",
      });
  
/*       const populateDetails = async (issues) => {
        return Promise.all(
          issues.map(async (issue) => {
            const populatedDetails = await Promise.all(
              issue.details.map(async (detail) => {
                if (detail.userId && detail.onModel) {
                  const model = mongoose.model(detail.onModel);
                  const populatedUser = await model.findById(detail.userId, "name email");
                  return { ...detail.toObject(), userId: populatedUser };
                }
                return detail;
              })
            );
            return { ...issue.toObject(), details: populatedDetails };
          })
        );
      };
  
      const populatedUnresolvedIssues = await populateDetails(unresolvedIssues);
      const populatedResolvedIssues = await populateDetails(resolvedIssues); */
  
      res.status(200).json({
        success: true,
        unresolved: unresolvedIssues,
        resolved:  resolvedIssues,
      });
    } catch (error) {
      console.error("Error:", error);
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
    )
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
      const issues = await Issue.find({ "details.status": "Pending" });
      console.log(issues);
      const populateDetails = async (issueList) => {
        return Promise.all(
          issueList.map(async (issue) => {
            const populatedDetails = await Promise.all(
              issue.details.map(async (detail) => {
                if (detail.userId && detail.onModel) {
                  const model = mongoose.model(detail.onModel);
                  const populatedUser = await model.findById(detail.userId, "name email");
                  return { ...detail.toObject(), userId: populatedUser };
                }
                return detail;
              })
            );
            return { ...issue.toObject(), details: populatedDetails };
          })
        );
      };
      const populatedIssues = await populateDetails(issues);
      res.status(200).json({ success: true, data: populatedIssues });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Server Error", error });
    }
  };
  