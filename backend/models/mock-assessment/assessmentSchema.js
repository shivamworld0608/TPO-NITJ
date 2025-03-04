/* import mongoose from "mongoose";

const AssessmentSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    startTime: { type: Date },
    endTime: { type: Date },
    duration: { type: Number }, // Duration in minutes
    questions: [{
      problemStatement: { type: String },
      inputFormat: { type: String },
      outputFormat: { type: String },
      samples: [{
        input: { type: String },
        output: { type: String },
        description: { type: String }
      }],
      testCases: [{
        input: { type: String },
        output: { type: String }
      }],
      points: { type: Number }
    }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Professor' },
    createdAt: { type: Date, default: Date.now }
  });
  const Assessment = mongoose.model('Assessment', AssessmentSchema);
  export default Assessment; */


import mongoose from "mongoose";

const AssessmentSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  startTime: { type: Date },
  endTime: { type: Date },
  duration: { type: Number }, // Duration in minutes
  questions: [{
    problemStatement: { type: String }, // e.g., "Write a function to merge two arrays"
    functionName: { type: String },     // e.g., "processData"
    returnType: { type: String },       // e.g., "int", "vector<int>", "string", "List<String>"
    arguments: [{                       // List of arguments with names and types
      name: { type: String },           // e.g., "a", "list1"
      type: { type: String }            // e.g., "int", "vector<double>", "string[]"
    }],
    language: { type: String, enum: ['cpp', 'java', 'python'], default: 'cpp' },
    samples: [{
      arguments: { type: Object },      // e.g., { a: 5, b: "hello" }
      output: { type: String }          // e.g., "5hello"
    }],
    testCases: [{
      arguments: { type: Object },      // e.g., { a: 10, b: "world" }
      output: { type: String }          // e.g., "10world"
    }],
    points: { type: Number }
  }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Professor' },
  createdAt: { type: Date, default: Date.now }
});

const Assessment = mongoose.model('Assessment', AssessmentSchema);
export default Assessment;