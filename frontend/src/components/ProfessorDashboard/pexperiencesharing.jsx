import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ProfessorExperienceManagement = () => {
  const [studentExperiences, setStudentExperiences] = useState([]);
  const [recruiterFeedbacks, setRecruiterFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStudentExperiences();
    fetchRecruiterFeedbacks();
  }, []);


  const fetchStudentExperiences = async () => {
    try {
      const response = await axios.get  (
        `${import.meta.env.REACT_APP_BASE_URL}/sharedexperience`, { withCredentials: true });
      setStudentExperiences(response.data.otherExperiences||[]);
      console.log(response.data.otherExperiences);
      setIsLoading(false);
    } catch (error) {
      toast.error('Failed to fetch student experiences');
      setIsLoading(false);
    }
  };

  const fetchRecruiterFeedbacks = async () => {
    try {
      const response = await axios.get  (
        `${import.meta.env.REACT_APP_BASE_URL}/feedback`, { withCredentials: true });
      setRecruiterFeedbacks(response.data.data);
      setIsLoading(false);
    } catch (error) {
      toast.error('Failed to fetch recruiter feedback');
      setIsLoading(false);
    }
  };

  const handleDeleteStudentExperience = async (id) => {
    try {
      await axios.delete  (
        `${import.meta.env.REACT_APP_BASE_URL}/sharedexperience/${id}`, { withCredentials: true });
      setStudentExperiences(studentExperiences.filter(exp => exp._id !== id));
      toast.success('Experience deleted successfully');
    } catch (error) {
      toast.error('Failed to delete experience');
    }
  };

  const handleDeleteRecruiterFeedback = async (id) => {
    try {
      await axios.delete(`${import.meta.env.REACT_APP_BASE_URL}/feedback/${id}`, { withCredentials: true });
      setRecruiterFeedbacks(recruiterFeedbacks.filter(feedback => feedback._id !== id));
      toast.success('Feedback deleted successfully');
    } catch (error) {
      toast.error('Failed to delete feedback');
    }
  };

  const renderStudentExperienceCard = (exp) => (
    <Card key={exp._id} className="mb-4 relative">
      <CardHeader>
        <CardTitle>{exp.studentName}</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Company:</strong> {exp.internshipCompany}</p>
        <p><strong>Role:</strong> {exp.role}</p>
        <p><strong>Description:</strong> {exp.description}</p>
        <Button 
          variant="destructive" 
          size="icon" 
          className="absolute top-2 right-2"
          onClick={() => handleDeleteStudentExperience(exp._id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );

  const renderRecruiterFeedbackCard = (feedback) => (
    <Card key={feedback._id} className="mb-4 relative">
      <CardHeader>
        <CardTitle>{feedback.companyName}</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Technical Skill:</strong> {feedback.technicalSkill}/5</p>
        <p><strong>Communication Skill:</strong> {feedback.communicationSkill}/5</p>
        <p><strong>Overall Experience:</strong> {feedback.overallExperience}/5</p>
        <p><strong>Comments:</strong> {feedback.comment}</p>
        <Button 
          variant="destructive" 
          size="icon" 
          className="absolute top-2 right-2"
          onClick={() => handleDeleteRecruiterFeedback(feedback._id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Tabs defaultValue="experiences" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="experiences">Student Experiences</TabsTrigger>
          <TabsTrigger value="feedback">Recruiter Feedback</TabsTrigger>
        </TabsList>
        <TabsContent value="experiences">
          {studentExperiences.length === 0 ? (
            <p className="text-center text-gray-500 mt-4">No student experiences available.</p>
          ) : (
            studentExperiences.map(renderStudentExperienceCard)
          )}
        </TabsContent>
        <TabsContent value="feedback">
          {recruiterFeedbacks.length === 0 ? (
            <p className="text-center text-gray-500 mt-4">No recruiter feedback available.</p>
          ) : (
            recruiterFeedbacks.map(renderRecruiterFeedbackCard)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfessorExperienceManagement;