/* // Create a new form for a job
export const createJobForm = async (req, res) => {
    try {
      const { jobId, formFields } = req.body;
      const companyId = req.company._id; // Assuming company is authenticated
  
      const newForm = await JobForm.create({
        jobId,
        companyId,
        formFields
      });
  
      return res.status(201).json({
        message: 'Job application form created successfully',
        form: newForm
      });
    } catch (error) {
      console.error('Error creating job form:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Submit a job application
  export const submitApplication = async (req, res) => {
    try {
      const { jobId, formId } = req.params;
      const studentId = req.user._id; // Assuming student is authenticated
      const { responses } = req.body;
      const files = req.files; // Using multer for file uploads
  
      // Validate all required fields are present
      const form = await JobForm.findById(formId);
      const missingFields = form.formFields
        .filter(field => field.required)
        .filter(field => !responses.find(r => r.fieldName === field.fieldName));
  
      if (missingFields.length > 0) {
        return res.status(400).json({
          message: 'Missing required fields',
          fields: missingFields.map(f => f.fieldName)
        });
      }
  
      // Handle file uploads
      const attachments = await Promise.all(
        Object.entries(files).map(async ([fieldName, file]) => {
          const uploadResult = await uploadToStorage(file); // Implement your file upload logic
          return {
            fieldName,
            fileUrl: uploadResult.url
          };
        })
      );
  
      // Create application submission
      const submission = await ApplicationSubmission.create({
        jobId,
        studentId,
        formId,
        responses,
        attachments
      });
  
      return res.status(201).json({
        message: 'Application submitted successfully',
        submission
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Generate Excel report of applications
  export const generateApplicationsReport = async (req, res) => {
    try {
      const { jobId } = req.params;
      const companyId = req.company._id; // Ensure company owns this job
  
      // Fetch all submissions for this job
      const submissions = await ApplicationSubmission.find({ jobId })
        .populate('studentId', 'name email rollno')
        .populate('formId', 'formFields');
  
      // Create Excel workbook
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Applications');
  
      // Add headers
      const form = await JobForm.findOne({ jobId });
      const headers = ['Timestamp', 'Student Name', 'Email', 'Roll No', 
        ...form.formFields.map(f => f.label)];
      worksheet.addRow(headers);
  
      // Add data rows
      submissions.forEach(submission => {
        const row = [
          submission.submittedAt,
          submission.studentId.name,
          submission.studentId.email,
          submission.studentId.rollno,
          ...form.formFields.map(field => {
            const response = submission.responses.find(r => r.fieldName === field.fieldName);
            return response ? response.response : '';
          })
        ];
        worksheet.addRow(row);
      });
  
      // Generate Excel file
      const buffer = await workbook.xlsx.writeBuffer();
  
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=applications-${jobId}.xlsx`);
      return res.send(buffer);
  
    } catch (error) {
      console.error('Error generating report:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }; */