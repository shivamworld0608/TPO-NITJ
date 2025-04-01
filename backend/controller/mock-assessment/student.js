import AssessmentAttempt from "../../models/mock-assessment/assessmentAttempt.js";
import Assessment from "../../models/mock-assessment/assessmentSchema.js";
import Submission from "../../models/mock-assessment/submission.js";
import axios from "axios";
import { Buffer } from 'buffer';


// Get Upcoming Assessments
export const getUpcomingAssessments = async (req, res) => {
  try {
    const now = new Date();
    const assessments = await Assessment.find({ startTime: { $gt: now } });
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Ongoing Assessments
export const getOngoingAssessments = async (req, res) => {
  try {
    const now = new Date();
    const assessments = await Assessment.find({
      startTime: { $lte: now },
      endTime: { $gt: now }
    });
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Attempted Assessments
export const getAttemptedAssessments = async (req, res) => {
  try {
    const attempts = await AssessmentAttempt.find({ student: req.user.userId })
      .populate('assessment', 'title');
    res.json(attempts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Start Assessment
export const startAssessment = async (req, res) => {
  try {
    console.log("hello");
    const assessment = await Assessment.findById(req.params.id);
    if (!assessment) return res.status(404).json({ message: 'Assessment not found' });
    const now = new Date();
    if (now < assessment.startTime || now > assessment.endTime) {
      return res.status(400).json({ message: 'Assessment not available' });
    }

    let attempt = await AssessmentAttempt.findOne({
      assessment: req.params.id,
      student: req.user.userId
    });
    console.log(attempt);
    if (!attempt) {
      attempt = new AssessmentAttempt({
        assessment: req.params.id,
        student:req.user.userId,
        startTime: now,
        status: 'ongoing'
      });
      await attempt.save();
    }
    res.json(attempt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Submit Code
/* export const submitCode = async (req, res) => {
  const { attemptId, questionIndex, code, language } = req.body;
  try {
    const attempt = await AssessmentAttempt.findById(attemptId);
    if (!attempt || attempt.student.toString() !==req.user.userId.toString()) {
      return res.status(403).json({ message: 'Invalid attempt' });
    }
    const assessment = await Assessment.findById(attempt.assessment);
    const now = new Date();
    const endTime = new Date(attempt.startTime.getTime() + assessment.duration * 60000);
    if (now > endTime || now > assessment.endTime) {
      attempt.status = 'completed';
      await attempt.save();
      return res.status(400).json({ message: 'Time is up' });
    }
   console.log("come here",questionIndex);
    const question = assessment.questions[questionIndex];
    const results = await evaluateCode(code, language, question.testCases,question);
    const score = calculateScore(results, question.points, question.testCases.length);
    console.log(results);
    const submission = new Submission({
      attempt: attemptId,
      questionIndex,
      code,
      language,
      result: results.every(r => r.status === 'accepted') ? 'accepted' : 'wrong',
      score
    });
    console.log("submission",submission);
    await submission.save();

    // Update total score with best submission per question
    await updateTotalScore(attempt);

    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; */


export const submitCode = async (req, res) => {
  const { attemptId, questionIndex, code, language } = req.body;

  try {
    const attempt = await AssessmentAttempt.findById(attemptId);
    if (!attempt || attempt.student.toString() !== req.user.userId.toString()) {
      return res.status(403).json({ message: 'Invalid attempt' });
    }

    const assessment = await Assessment.findById(attempt.assessment);
    const now = new Date();
    const endTime = new Date(attempt.startTime.getTime() + assessment.duration * 60000);
    if (now > endTime || now > assessment.endTime) {
      attempt.status = 'completed';
      await attempt.save();
      return res.status(400).json({ message: 'Time is up' });
    }

    const question = assessment.questions[questionIndex];
    const results = await evaluateCode(code, language, question.testCases, question);

    // Format the results for the frontend
    const testResults = results.map((r, idx) => ({
      testNumber: idx + 1,
      status: r.status,
      output: r.output,
      expected: r.expected,
      error: r.error || null,
      runtime: r.time ? `${(r.time * 1000).toFixed(0)}ms` : '0ms', // Convert seconds to ms
    }));

    const allPassed = testResults.every(r => r.status === 'accepted');
    const status = allPassed ? 'accepted' : 'wrong';
    const totalTestCases = question.testCases.length;
    const passedTestCases = testResults.filter(r => r.status === 'accepted').length;
    const message = `
      <p className="text-lg font-semibold mb-2">${passedTestCases}/${totalTestCases} Test Cases Passed</p>
      ${question.testCases.map((_, idx) => {
        const testResult = testResults.find(r => r.testNumber === idx + 1);
        const testStatus = testResult?.status === 'accepted' ? 'passed' : 'failed';
        return `
          <div className="flex items-center mb-1">
            <span className="mr-2">${testStatus === 'passed' ? '✅' : '❌'} Hidden Test Case ${idx + 1}</span>
          </div>
        `;
      }).join('')}
    `;

    const score = calculateScore(results, question.points, totalTestCases);
    const submission = new Submission({
      attempt: attemptId,
      questionIndex,
      code,
      language,
      result: status,
      score,
    });

    await submission.save();

    // Update total score with best submission per question
    await updateTotalScore(attempt);

    res.json({
      status,
      message,
      runtime: testResults[0]?.runtime || '0ms',
    });
  } catch (error) {
    console.error('Error submitting code:', error);
    res.status(500).json({ message: error.message });
  }
};

// New Endpoint: Get Attempt Details
export const getAttempt = async (req, res) => {
    try {
        console.log(req.params.id);
      const attempt = await AssessmentAttempt.findById(req.params.id);
      console.log("hello hi",attempt);
      if (!attempt || attempt.student.toString() !== req.user.userId.toString()) {
        return res.status(403).json({ message: 'Invalid attempt' });
      }
      res.json(attempt);
    } catch (error) {
      console.error('Error fetching attempt:', error);
      res.status(500).json({ message: 'Failed to fetch attempt', error: error.message });
    }
  };
  
  export const getAssessmentById = async (req, res) => {
    try {
      const assessment = await Assessment.findById(req.params.id);
      if (!assessment) return res.status(404).json({ message: 'Assessment not found' });
  
      // Ensure the student has an attempt for this assessment
      const attempt = await AssessmentAttempt.findOne({
        assessment: req.params.id,
        student: req.user.userId
      });
      if (!attempt) return res.status(403).json({ message: 'You have not started this assessment' });
  
      res.json(assessment);
    } catch (error) {
      console.error('Error fetching assessment by ID:', error);
      res.status(500).json({ message: 'Failed to fetch assessment', error: error.message });
    }
  };

  // New Endpoint: Get Submissions for an Attempt
  export const getSubmissions = async (req, res) => {
    try {
      const attempt = await AssessmentAttempt.findById(req.params.id);
      if (!attempt || attempt.student.toString() !== req.user.userId.toString()) {
        return res.status(403).json({ message: 'Invalid attempt' });
      }
      const submissions = await Submission.find({ attempt: req.params.id });
      res.json(submissions);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      res.status(500).json({ message: 'Failed to fetch submissions', error: error.message });
    }
  };

// Helper: Evaluate Code with Judge0
/* 
export const evaluateCode = async (code, language, testCases) => {
  console.log("hello from evaluate code");
  const submissions = testCases.map(test => ({
    source_code: code,
    language_id: language === 'cpp' ? 52 : language === 'java' ? 62 : 71, // Judge0 language IDs
    stdin: test.input,
    expected_output: test.output
  }));
  console.log(process.env.JUDGE0_API_URL,"key",process.env.JUDGE0_API_KEY);
  const response = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`, {
    submissions
  }, {
    headers: { 'X-RapidAPI-Key': process.env.JUDGE0_API_KEY }
  });
 console.log(response);
  const tokens = response.data.map(sub => sub.token);
  console.log("token from evaluate code",tokens);
  const results = await Promise.all(tokens.map(token =>
    axios.get(`${process.env.JUDGE0_API_URL}/submissions/${token}`, {
      headers: { 'X-RapidAPI-Key': process.env.JUDGE0_API_KEY }
    })
  ));

  console.log("result from evaluate code",results);
  return results.map((res, idx) => ({
    status: res.data.stdout === testCases[idx].output ? 'accepted' : 'wrong',
    output: res.data.stdout
  }));
}; */


/* export const evaluateCode = async (code, language, testCases) => {
  console.log("hello from evaluate code");
  const submissions = testCases.map(test => ({
    source_code: code,
    language_id: language === 'cpp' ? 52 : language === 'java' ? 62 : 71,
    stdin: test.input,
    expected_output: test.output
  }));
  console.log(process.env.JUDGE0_API_URL, "key", process.env.JUDGE0_API_KEY);

  let response;
  try {
    response = await axios.post(
      `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,
      { submissions },
      { headers: { 'X-RapidAPI-Key': process.env.JUDGE0_API_KEY } }
    );
    console.log("Response from batch submission:", response.data);
  } catch (error) {
    console.error("Error in batch submission:", error.response ? error.response.data : error.message);
    throw error; // Or handle it as needed
  }

  const tokens = response.data.map(sub => sub.token);
  console.log("token from evaluate code", tokens);

  // Function to poll submission until processed
  const waitForSubmission = async (token) => {
    const maxAttempts = 10; // Prevent infinite loops
    let attempts = 0;
    while (attempts < maxAttempts) {
      try {
        const res = await axios.get(
          `${process.env.JUDGE0_API_URL}/submissions/${token}`,
          { headers: { 'X-RapidAPI-Key': process.env.JUDGE0_API_KEY } }
        );
        // Status IDs: 1 = In Queue, 2 = Processing, 3 = Accepted, >3 = Error/Other
        if (res.data.status.id > 2) {
          return res.data;
        }
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
        attempts++;
      } catch (error) {
        console.error(`Error fetching submission ${token}:`, error.message);
        throw error;
      }
    }
    throw new Error(`Submission ${token} timed out after ${maxAttempts} attempts`);
  };

  const results = await Promise.all(tokens.map(token => waitForSubmission(token)));
  console.log("result from evaluate code", results);

  return results.map((res, idx) => {
    if (res.status.id === 3) { // Accepted
      return {
        status: res.stdout === testCases[idx].output ? 'accepted' : 'wrong',
        output: res.stdout
      };
    } else {
      return {
        status: 'error',
        output: res.stdout || null,
        error: res.status.description
      };
    }
  });
}; */

// Helper: Calculate Score
export const calculateScore = (results, totalPoints, testCaseCount) => {
  const passed = results.filter(r => r.status === 'accepted').length;
  return Math.round((passed / testCaseCount) * totalPoints);
};

// Helper: Update Total Score
export const updateTotalScore = async (attempt) => {
  const submissions = await Submission.find({ attempt: attempt._id });
  const scores = {};
  submissions.forEach(sub => {
    scores[sub.questionIndex] = Math.max(scores[sub.questionIndex] || 0, sub.score);
  });
  attempt.totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  await attempt.save();
};

// Log Tab Switch
export const logTabSwitch = async (req, res) => {
  try {
    console.log("tab switching");
    const attempt = await AssessmentAttempt.findById(req.body.attemptId);
    if (attempt && attempt.student.toString() === req.user.userId.toString()) {
      attempt.tabSwitches += 1;
      await attempt.save();
      res.json({ message: 'Tab switch logged' });
    } else {
      res.status(403).json({ message: 'Invalid attempt' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateAttemptStatus = async (req, res) => {
    const { status } = req.body;
    try {
      const attempt = await AssessmentAttempt.findById(req.params.id);
      if (!attempt || attempt.student.toString() !== req.user.userId.toString()) {
        return res.status(403).json({ message: 'Invalid attempt' });
      }
  
      if (!['ongoing', 'completed'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
  
      attempt.status = status;
      if (status === 'completed') {
        attempt.endTime = new Date();
      }
      await attempt.save();
      res.json(attempt);
    } catch (error) {
      console.error('Error updating attempt status:', error);
      res.status(500).json({ message: 'Failed to update attempt status', error: error.message });
    }
  };

  export const incrementCopyPaste = async (req, res) => {
    try {
        console.log("copypaste")
      const { attemptId } = req.body;
  
      if (!attemptId) {
        return res.status(400).json({ message: 'Attempt ID is required' });
      }
  
      const attempt = await AssessmentAttempt.findById(attemptId);
      if (!attempt) {
        return res.status(404).json({ message: 'Assessment attempt not found' });
      }
  
      attempt.copyPaste += 1;
      await attempt.save();
  
      res.status(200).json({ message: 'Copy-paste count updated', copyPaste: attempt.copyPaste });
    } catch (error) {
      console.error('Error incrementing copy-paste count:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };


// Helper to encode to base64
const toBase64 = (str) => Buffer.from(str).toString('base64');

// Helper to decode from base64 (for debugging if needed)
const fromBase64 = (str) => Buffer.from(str, 'base64').toString('utf8');

// Convert JSON test case inputs to C++ syntax
const jsonToCppValue = (value, type) => {
  if (type === 'int') return value.toString();
  if (type === 'double') return value.toString();
  if (type === 'string') return `"${value}"`;
  if (type.startsWith('vector<')) {
    const innerType = type.slice(7, -1);
    if (Array.isArray(value)) {
      const elements = value.map(v => jsonToCppValue(v, innerType)).join(',');
      return `{${elements}}`;
    }
  }
  throw new Error(`Unsupported C++ type: ${type}`);
};

// Convert JSON test case inputs to Java syntax
const jsonToJavaValue = (value, type) => {
  if (type === 'int') return value.toString();
  if (type === 'double') return value.toString();
  if (type === 'String') return `"${value}"`;
  if (type.startsWith('List<')) {
    const innerType = type.slice(5, -1);
    if (innerType.startsWith('List<')) {
      const innerInnerType = innerType.slice(5, -1);
      const elements = value.map(row => `Arrays.asList(${row.map(v => jsonToJavaValue(v, innerInnerType)).join(', ')})`).join(', ');
      return `Arrays.asList(${elements})`;
    } else {
      const elements = value.map(v => jsonToJavaValue(v, innerType)).join(', ');
      return `Arrays.asList(${elements})`;
    }
  }
  throw new Error(`Unsupported Java type: ${type}`);
};

// Generate C++ wrapper code
const wrapCodeCpp = (code, testCase, question) => {
  const argDeclarations = question.arguments.map(arg => {
    const value = testCase.arguments?.[arg.name] !== undefined 
      ? jsonToCppValue(testCase.arguments[arg.name], arg.type) 
      : (arg.type === 'int' ? '0' : '""');
    return `${arg.type} ${arg.name} = ${value};`;
  }).join('\n  ');

  const signature = `${question.returnType} ${question.functionName}(${question.arguments.map(arg => `${arg.type} ${arg.name}`).join(', ')})`;

  let printCode = 'cout << result << endl;';
  if (question.returnType.startsWith('vector<')) {
    const innerType = question.returnType.slice(7, -1);
    if (innerType.startsWith('vector<')) {
      printCode = `cout << "[";
      for (size_t i = 0; i < result.size(); i++) {
        cout << "[";
        for (size_t j = 0; j < result[i].size(); j++) {
          cout << result[i][j];
          if (j < result[i].size() - 1) cout << ",";
        }
        cout << "]";
        if (i < result.size() - 1) cout << ",";
      }
      cout << "]" << endl;`;
    } else {
      printCode = `cout << "[";
      for (size_t i = 0; i < result.size(); i++) {
        cout << result[i];
        if (i < result.size() - 1) cout << ",";
      }
      cout << "]" << endl;`;
    }
  }

  return `${code}

int main() {
  ${argDeclarations}
  auto result = ${question.functionName}(${question.arguments.map(arg => arg.name).join(', ')});
  ${printCode}
  return 0;
}`;
};

// Generate Java wrapper code
const wrapCodeJava = (code, testCase, question) => {
  const argDeclarations = question.arguments.map(arg => {
    const value = testCase.arguments?.[arg.name] !== undefined 
      ? jsonToJavaValue(testCase.arguments[arg.name], arg.type) 
      : (arg.type === 'int' ? '0' : '""');
    return `${arg.type} ${arg.name} = ${value};`;
  }).join('\n    ');

  const signature = `public ${question.returnType} ${question.functionName}(${question.arguments.map(arg => `${arg.type} ${arg.name}`).join(', ')})`;

  let printCode = 'System.out.println(result);';
  if (question.returnType.startsWith('List<')) {
    printCode = 'System.out.println(result.toString().replace(" ", ""));';
  }

  return `import java.util.*;
public class Solution {
    ${code}
  public static void main(String[] args) {
    Solution sol = new Solution();
    ${argDeclarations}
    ${question.returnType} result = sol.${question.functionName}(${question.arguments.map(arg => arg.name).join(', ')});
    ${printCode}
  }
}`;
};

// Generate Python wrapper code
const wrapCodePython = (code, testCase, question) => {
  const argAssignments = question.arguments.map(arg => {
    const value = testCase.arguments?.[arg.name] !== undefined 
      ? JSON.stringify(testCase.arguments[arg.name]) 
      : (arg.type === 'int' ? '0' : '""');
    return `${arg.name} = ${value}`;
  }).join('\n');

  const signature = `def ${question.functionName}(${question.arguments.map(arg => arg.name).join(', ')}):`;

  return `${code.replace(/^/gm, '  ')}

${argAssignments}
result = ${question.functionName}(${question.arguments.map(arg => arg.name).join(', ')})
print(str(result).replace(" ", ""))`;
};

export const evaluateCode = async (code, language, testCases, question) => {
  let wrapCode;
  switch (language) {
    case 'cpp':
      wrapCode = (code, testCase) => wrapCodeCpp(code, testCase, question);
      break;
    case 'java':
      wrapCode = (code, testCase) => wrapCodeJava(code, testCase, question);
      break;
    case 'python':
      wrapCode = (code, testCase) => wrapCodePython(code, testCase, question);
      break;
    default:
      throw new Error(`Unsupported language: ${language}`);
  }

  // Prepare submissions with base64 encoding
  const submissions = testCases.map(test => ({
    source_code: toBase64(wrapCode(code, test)),
    language_id: language === 'cpp' ? 52 : language === 'java' ? 62 : 71,
    expected_output: toBase64(test.output),
    stdin: toBase64(''), // Empty stdin, encoded as base64
  }));

  try {
    // Submit batch with base64 encoding
    const response = await axios.post(
      `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=true`,
      { submissions },
      { headers: { 'X-RapidAPI-Key': process.env.JUDGE0_API_KEY } }
    );
    const tokens = response.data.map(sub => sub.token);

    // Poll for submission results, expecting base64-encoded output
    const waitForSubmission = async (token) => {
      const maxAttempts = 10;
      let attempts = 0;
      while (attempts < maxAttempts) {
        try {
          const res = await axios.get(
            `${process.env.JUDGE0_API_URL}/submissions/${token}?base64_encoded=true`,
            { headers: { 'X-RapidAPI-Key': process.env.JUDGE0_API_KEY } }
          );
          if (res.data.status.id > 2) {
            return {
              ...res.data,
              stdout: res.data.stdout ? fromBase64(res.data.stdout) : '',
              stderr: res.data.stderr ? fromBase64(res.data.stderr) : '',
            };
          }
          await new Promise(resolve => setTimeout(resolve, 2000));
          attempts++;
        } catch (error) {
          console.error(`Error fetching submission ${token}:`, error.message);
          throw error;
        }
      }
      throw new Error(`Submission ${token} timed out after ${maxAttempts} attempts`);
    };

    const results = await Promise.all(tokens.map(token => waitForSubmission(token)));
    return results.map((res, idx) => {
      const expected = testCases[idx].output;
      const actual = res.stdout.trim();
      const passed = res.status.id === 3 && actual === expected;
      return {
        status: passed ? 'accepted' : 'wrong',
        output: actual,
        expected: expected,
        error: res.stderr || res.status.description,
      };
    });
  } catch (error) {
    console.error('Error in evaluateCode:', error);
    throw error;
  }
};


// backend/controller/mock-assessment/runCodeController.js

export const runCode = async (req, res) => {
  const { attemptId, questionIndex, code, language } = req.body;

  try {
    // Fetch the assessment attempt and question data
    const attempt = await AssessmentAttempt.findById(attemptId);
    if (!attempt || attempt.student.toString() !== req.user.userId.toString()) {
      return res.status(403).json({ message: 'Invalid attempt' });
    }

    const assessment = await Assessment.findById(attempt.assessment);
    const question = assessment.questions[questionIndex];

    // Prepare all sample inputs as a single batch for evaluateCode
    const testCases = question.samples.map((sample, idx) => ({
      arguments: sample.arguments,
      output: sample.output,
    }));

    // Evaluate the code against all samples in one call
    const results = await evaluateCode(code, language, testCases, question);

    // Format the results as an array of objects for individual case styling
    const testResults = results.map((r, idx) => ({
      testNumber: idx + 1,
      status: r.status,
      output: r.output,
      expected: r.expected,
      error: r.error || null,
      runtime: r.time ? `${(r.time * 1000).toFixed(0)}ms` : '0ms', // Convert seconds to ms
      input: JSON.stringify(question.samples[idx].arguments),
    }));

    // Determine overall status
    const allPassed = testResults.every(r => r.status === 'accepted');
    const status = allPassed ? 'accepted' : 'wrong';

    res.json({
      status,
      message: testResults, // Array of objects for each sample case
      runtime: testResults[0]?.runtime || '0ms', // Use the first runtime as a representative value
    });
  } catch (error) {
    console.error('Error running code:', error);
    res.status(500).json({ error: error.message || 'Failed to run code' });
  }
};