export const getPlacementReportPDF = async (_, res) => {
  try {
    res.sendFile(`${process.cwd()}/reports/pdfs/placement-report.pdf`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
