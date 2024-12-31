/* const FormFieldSchema = new mongoose.Schema({
    fieldName: String,
    label: String,
    type: {
      type: String,
      enum: ['text', 'number', 'email', 'select', 'file', 'date', 'textarea']
    },
    required: Boolean,
    options: [String], // For select/dropdown fields
    validation: String // Optional regex or validation rules
  });
  
  const JobFormSchema = new mongoose.Schema({
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true
    },
    formFields: [FormFieldSchema],
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  const ApplicationSubmissionSchema = new mongoose.Schema({
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job'
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobForm'
    },
    responses: [{
      fieldName: String,
      response: mongoose.Schema.Types.Mixed
    }],
    attachments: [{
      fieldName: String,
      fileUrl: String
    }],
    submittedAt: {
      type: Date,
      default: Date.now
    }
  }); */