// controllers/jobEventsController.js
import JobProfile from '../models/jobprofile.js';

export const getJobEvents = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          message: 'Both startDate and endDate are required'
        });
      }
      console.log('Fetching events for date range:', { startDate, endDate });
      
    
    // Convert dates to match the deadline field format
    const start = new Date(startDate);
    const end = new Date(endDate);

    const jobs = await JobProfile.find({
      deadline: {
        $gte: start,
        $lte: end
      },
      Approved_Status: true // Only fetch approved jobs
    }).select('job_id company_name job_role job_type deadline company_logo');

    console.log(`Found ${jobs.length} jobs`);

    // Transform jobs into calendar events format
    const events = jobs.reduce((acc, job) => {
      const dateKey = job.deadline.toISOString().split('T')[0];
      
      const eventData = {
        _id : job._id,
        type: job.job_type === 'Intern' ? 'internship' : 'placement',
        company: job.company_name,
        role: job.job_role,
        time: job.deadline.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        company_logo: job.company_logo,
      };

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(eventData);
      
      return acc;
    }, {});


    res.status(200).json({ 
        success: true, 
        events,
        meta: {
          totalEvents: Object.values(events).flat().length,
          dateRange: { startDate, endDate }
        }
      });
    } catch (error) {
    console.error('Error fetching job events:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching job events',
      error: error.message 
    });
  }
};


//Job Profile POST Controller
export const createJobProfile = async (req, res) => {
    try {
      const jobProfile = new JobProfile(req.body);
      const savedJob = await jobProfile.save();
      res.status(201).json({
        success: true,
        message: 'Job profile created successfully',
        data: savedJob
      });
    } catch (error) {
      console.error('Error creating job profile:', error);
      res.status(400).json({
        success: false,
        message: 'Error creating job profile',
        error: error.message
      });
    }
  };

  