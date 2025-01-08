import SharedExperience from '../models/sharedexperience.js';
import JobProfile from '../models/jobprofile.js';

export const submitExperience = async (req, res) => {
    try {
        const { title, content } = req.body;
        const author = req.user.userId;
        const experience = await SharedExperience.create({
            title,
            content,
            author
        });
        console.log("experience", experience);
        res.status(201).json({
            success: true,
            experience
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const getAllExperiences = async (req, res) => {
    try {
        const experiences = await SharedExperience.find()
            .populate('author', 'name email')
            .sort('-createdAt');
        const studentId = req.user.userId;
        const currentUserExperiences = experiences.filter(exp => exp.author._id.toString() === studentId);
        const otherExperiences = experiences.filter(exp => exp.author._id.toString() !== studentId);
        let eligible = false;
        const jobs = await JobProfile.find({
            'Hiring_Workflow': {
                $elemMatch: {
                    step_type: 'Interview',
                    eligible_students: studentId,
                },
            },
        });
        if (jobs.length > 0) {
            eligible = true;
        }
        res.status(200).json({
            eligible,
            currentUserExperiences,
            otherExperiences
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getExperience = async (req, res) => {
    try {
        const experience = await SharedExperience.findById(req.params.id)
            .populate('author', 'name email');

        if (!experience) {
            return res.status(404).json({
                success: false,
                message: 'Experience not found'
            });
        }

        res.status(200).json({
            success: true,
            data: experience
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const updateExperience = async (req, res) => {
    try {
        const experience = await SharedExperience.findOneAndUpdate(
            { 
                _id: req.params.id,
                author: req.user.userId
            },
            req.body,
            { new: true}
        );

        if (!experience) {
            return res.status(404).json({
                success: false,
                message: 'Experience not found or unauthorized'
            });
        }

        res.status(200).json({
            success: true,
            data: experience
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


export const deleteExperience = async (req, res) => {
    try {
        const experience = await SharedExperience.findOneAndDelete({
            _id: req.params.id,
            author: req.user.userId
        });

        if (!experience) {
            return res.status(404).json({
                success: false,
                message: 'Experience not found or unauthorized'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Experience deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};