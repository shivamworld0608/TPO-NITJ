export const getEligibleUpcomingOthers = async (req, res) => {
  try {
    const studentId = req.user.userId;
    const studentObjectId = new mongoose.Types.ObjectId(studentId);
    const jobsWithOthers = await JobProfile.find({
      "Hiring_Workflow.eligible_students": studentObjectId,
    })
      .select("company_name company_logo Hiring_Workflow")
      .lean();

    const upcomingOthers = jobsWithOthers.flatMap((job) => {
      const workflow = Array.isArray(job.Hiring_Workflow) ? job.Hiring_Workflow : [];

      return workflow
        .filter(
          (step) =>
            step.step_type === "Others" &&
            step.eligible_students.some((id) => id.equals(studentObjectId)) &&
            new Date(step.details.others_date) > new Date()
        )
        .map((step) => {
          const othersLinks = Array.isArray(step.details.others_link)
            ? step.details.others_link
            : [];

          const studentOthersLink = othersLinks.find((link) => {
            if (!link.studentId) return false;

            const linkStudentId =
              typeof link.studentId === "string"
                ? new mongoose.Types.ObjectId(link.studentId)
                : link.studentId;

            return linkStudentId.equals(studentObjectId);
          })?.interviewLink || "No link available";

          return {
            company_name: job.company_name,
            company_logo: job.company_logo,
            others_date: step.details.others_date,
            others_round_name: step.details.others_round_name,
            others_time: step.details.others_time,
            others_info: step.details.others_info,
            others_link: studentOthersLink,
          };
        });
    });

    res.status(200).json({ upcomingOthers });
  } catch (error) {
    console.error("Error fetching upcoming Others:", error);
    res.status(500).json({ message: "Server error while fetching upcoming Others." });
  }
};

export const getEligiblePastOthers = async (req, res) => {
  try {
    const studentId = req.user.userId;
    const studentObjectId = new mongoose.Types.ObjectId(studentId);
    const jobsWithOthers = await JobProfile.find({
      "Hiring_Workflow.eligible_students": studentObjectId,
    })
      .select("company_name company_logo Hiring_Workflow")
      .lean();

    const pastOthers = jobsWithOthers.flatMap((job) => {
      const workflow = Array.isArray(job.Hiring_Workflow) ? job.Hiring_Workflow : [];

      return workflow
        .filter(
          (step) =>
            step.step_type === "Others" &&
            step.eligible_students.some((id) => id.equals(studentObjectId)) &&
            new Date(step.details.others_date) < new Date()
        )
        .map((step) => {
          const othersLinks = Array.isArray(step.details.others_link)
            ? step.details.others_link
            : [];

          const studentOthersLink = othersLinks.find((link) => {
            if (!link.studentId) return false;

            const linkStudentId =
              typeof link.studentId === "string"
                ? new mongoose.Types.ObjectId(link.studentId)
                : link.studentId;

            return linkStudentId.equals(studentObjectId);
          })?.interviewLink || "No link available";

          return {
            company_name: job.company_name,
            company_logo: job.company_logo,
            others_date: step.details.others_date,
            others_round_name: step.details.others_round_name,
            others_time: step.details.others_time,
            others_info: step.details.others_info,
            others_link: studentOthersLink,
            was_shortlisted:
              step.shortlisted_students?.length === 0
                ? "Result yet to be declared"
                : step.shortlisted_students.some((id) => id.equals(studentObjectId)) || false,
          };
        });
    });
    pastOthers.sort((a, b) => new Date(b.others_date) - new Date(a.others_date));
    res.status(200).json({ pastOthers });
  } catch (error) {
    console.error("Error fetching past Others:", error);
    res.status(500).json({ message: "Server error while fetching past Others." });
  }
};