import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Save } from 'lucide-react';
import axios from 'axios';
import { jsPDF } from "jspdf";
import Resume from './downloadresume';

const ResumeBuilder = () => {
  const [mode, setMode] = useState('view');
  const [formData, setFormData] = useState({
    name: '',
    contact: {
      github: '',
      linkedin: '',
      email: '',
      phone: ''
    },
    education: [{ institution: '', location: '', degree: '', percentage: '', duration: '' }],
    experience: [{ title: '', company: '', description: [''], techStack: [''], duration: '' }],
    projects: [{ name: '', description: [''], techStack: [''], link: '' }],
    skills: [{ category: '', skills: [''] }],
    achievements: [{ title: '', description: '', link: '' }],
    interests: [''],
    coursework: [''],
    responsibilities: [{ role: '', description: '' }]
  });

  const handleChange = (e, section, index, field, subIndex) => {
    const value = e.target.value;
    setFormData(prev => {
      const newData = { ...prev };

      if (subIndex !== undefined) {
        newData[section][index][field][subIndex] = value;
      } else if (field) {
        newData[section][index][field] = value;
      } else {
        newData[section][index] = value;
      }

      return newData;
    });
  };

  const addItem = (section) => {
    setFormData(prev => {
      const newData = { ...prev };
      const emptyItem = {
        education: { institution: '', location: '', degree: '', percentage: '', duration: '' },
        experience: { title: '', company: '', description: [''], techStack: [''], duration: '' },
        projects: { name: '', description: [''], techStack: [''], link: '' },
        skills: { category: '', skills: [''] },
        achievements: { title: '', description: '', link: '' },
        responsibilities: { role: '', description: '' }
      }[section] || '';

      newData[section] = [...newData[section], emptyItem];
      return newData;
    });
  };

  const removeItem = (section, index) => {
    setFormData(prev => {
      const newData = { ...prev };
      newData[section].splice(index, 1);
      return newData;
    });
  };

  const addArrayItem = (section, index, field) => {
    setFormData(prev => {
      const newData = { ...prev };
      newData[section][index][field].push('');
      return newData;
    });
  };

  const removeArrayItem = (section, index, field, subIndex) => {
    setFormData(prev => {
      const newData = { ...prev };
      newData[section][index][field].splice(subIndex, 1);
      return newData;
    });
  };


  const uploadResume = async () => {
    try {
      const response = await axios.post(`${import.meta.env.REACT_APP_BASE_URL}/resume`, formData, { withCredentials: true });

      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const HandleformData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/resume/getresumedata`, {
        withCredentials: true,
      });
      setFormData(response.data.data);
      // console.log(formData)
      console.log('Fetched Form Data:', response.data);
    } catch (error) {
      console.error('Error fetching resume data:', error.response ? error.response.data : error.message);
      return null;
    }
  };

  const deleteResume = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.REACT_APP_BASE_URL}/resume/deleteresume`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Resume deleted successfully");
      }

      return response.data;
    } catch (error) {
      console.error(
        "Error deleting resume data:",
        error.response ? error.response.data : error.message
      );
      return null;
    }
  };


  useEffect(() => {
    HandleformData();

  },[]);


  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Mode Selection Buttons */}

      <div className="flex gap-4 mb-6 sticky top-0 bg-white p-4 rounded-lg shadow-md z-10">
        <button
          onClick={() => setMode('view')}
          className={`px-4 py-2 rounded ${mode === 'view' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          View
        </button>
        <button
          onClick={() => setMode('create')}
          className={`px-4 py-2 rounded ${mode === 'create' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Create/Update
        </button>
        <button
          onClick={deleteResume}
          className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-700 flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          Delete
        </button>
      </div>
      {
        mode=='view' && (<Resume resumeData={formData} />)
      }

      {  mode !== 'view' && (<form className="max-w-4xl mx-auto space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            disabled={mode === 'view'}
            className="p-2 border rounded w-full"
          />
        </div>

        {/* Contact Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(formData.contact).map(field => (
              <input
                key={field}
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData.contact[field]}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  contact: { ...prev.contact, [field]: e.target.value }
                }))}
                disabled={mode === 'view'}
                className="p-2 border rounded"
              />
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Education</h2>
            {mode !== 'view' && (
              <button
                type="button"
                onClick={() => addItem('education')}
                className="text-blue-600 hover:text-blue-800"
              >
                <PlusCircle className="w-6 h-6" />
              </button>
            )}
          </div>
          {formData.education.map((edu, index) => (
            <div key={index} className="border p-4 rounded mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(edu).map(field => (
                  <input
                    key={field}
                    type="text"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={edu[field]}
                    onChange={(e) => handleChange(e, 'education', index, field)}
                    disabled={mode === 'view'}
                    className="p-2 border rounded"
                  />
                ))}
              </div>
              {mode !== 'view' && formData.education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem('education', index)}
                  className="text-red-600 mt-2"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Experience Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Experience</h2>
            {mode !== 'view' && (
              <button
                type="button"
                onClick={() => addItem('experience')}
                className="text-blue-600 hover:text-blue-800"
              >
                <PlusCircle className="w-6 h-6" />
              </button>
            )}
          </div>
          {formData.experience.map((exp, index) => (
            <div key={index} className="border p-4 rounded mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={exp.title}
                  onChange={(e) => handleChange(e, 'experience', index, 'title')}
                  disabled={mode === 'view'}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => handleChange(e, 'experience', index, 'company')}
                  disabled={mode === 'view'}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={exp.duration}
                  onChange={(e) => handleChange(e, 'experience', index, 'duration')}
                  disabled={mode === 'view'}
                  className="p-2 border rounded"
                />
              </div>

              {/* Description Array */}
              <div className="mt-4">
                <label className="block font-medium mb-2">Description</label>
                {exp.description.map((desc, descIndex) => (
                  <div key={descIndex} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={desc}
                      placeholder=""
                      onChange={(e) => handleChange(e, 'experience', index, 'description', descIndex)}
                      disabled={mode === 'view'}
                      className="p-2 border rounded flex-1"
                    />
                    {mode !== 'view' && (
                      <>
                        <button
                          type="button"
                          onClick={() => removeArrayItem('experience', index, 'description', descIndex)}
                          className="text-red-600"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                ))}
                {mode !== 'view' && (
                  <button
                    type="button"
                    onClick={() => addArrayItem('experience', index, 'description')}
                    className="text-blue-600"
                  >
                    <PlusCircle className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Tech Stack Array */}
              <div className="mt-4">
                <label className="block font-medium mb-2">Tech Stack</label>
                {exp.techStack.map((tech, techIndex) => (
                  <div key={techIndex} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tech}
                      placeholder=""
                      onChange={(e) => handleChange(e, 'experience', index, 'techStack', techIndex)}
                      disabled={mode === 'view'}
                      className="p-2 border rounded flex-1"
                    />
                    {mode !== 'view' && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('experience', index, 'techStack', techIndex)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                {mode !== 'view' && (
                  <button
                    type="button"
                    onClick={() => addArrayItem('experience', index, 'techStack')}
                    className="text-blue-600"
                  >
                    <PlusCircle className="w-5 h-5" />
                  </button>
                )}
              </div>

              {mode !== 'view' && formData.experience.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem('experience', index)}
                  className="text-red-600 mt-4"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Projects Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Projects</h2>
            {mode !== 'view' && (
              <button
                type="button"
                onClick={() => addItem('projects')}
                className="text-blue-600 hover:text-blue-800"
              >
                <PlusCircle className="w-6 h-6" />
              </button>
            )}
          </div>
          {formData.projects.map((project, index) => (
            <div key={index} className="border p-4 rounded mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={project.name}
                  onChange={(e) => handleChange(e, 'projects', index, 'name')}
                  disabled={mode === 'view'}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Link"
                  value={project.link}
                  onChange={(e) => handleChange(e, 'projects', index, 'link')}
                  disabled={mode === 'view'}
                  className="p-2 border rounded"
                />
              </div>

              {/* Description Array */}
              <div className="mt-4">
                <label className="block font-medium mb-2">Description</label>
                {project.description.map((desc, descIndex) => (
                  <div key={descIndex} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={desc}
                      onChange={(e) => handleChange(e, 'projects', index, 'description', descIndex)}
                      disabled={mode === 'view'}
                      className="p-2 border rounded flex-1"
                    />
                    {mode !== 'view' && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('projects', index, 'description', descIndex)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                {mode !== 'view' && (
                  <button
                    type="button"
                    onClick={() => addArrayItem('projects', index, 'description')}
                    className="text-blue-600"
                  >
                    <PlusCircle className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="mt-4">
                <label className="block font-medium mb-2">Tech Stack</label>
                {project.techStack.map((tech, techIndex) => (
                  <div key={techIndex} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) => handleChange(e, 'projects', index, 'techStack', techIndex)}
                      disabled={mode === 'view'}
                      className="p-2 border rounded flex-1"
                    />
                    {mode !== 'view' && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('projects', index, 'techStack', techIndex)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                {mode !== 'view' && (
                  <button
                    type="button"
                    onClick={() => addArrayItem('projects', index, 'techStack')}
                    className="text-blue-600"
                  >
                    <PlusCircle className="w-5 h-5" />
                  </button>
                )}
              </div>

              {mode !== 'view' && formData.projects.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem('projects', index)}
                  className="text-red-600 mt-4"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Skills Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Skills</h2>
            {mode !== 'view' && (
              <button
                type="button"
                onClick={() => addItem('skills')}
                className="text-blue-600 hover:text-blue-800"
              >
                <PlusCircle className="w-6 h-6" />
              </button>
            )}
          </div>
          {formData.skills.map((skillGroup, index) => (
            <div key={index} className="border p-4 rounded mb-4">
              <input
                type="text"
                placeholder="Category"
                value={skillGroup.category}
                onChange={(e) => handleChange(e, 'skills', index, 'category')}
                disabled={mode === 'view'}
                className="p-2 border rounded w-full mb-4"
              />

              {/* Skills Array */}
              <div className="mt-2">
                <label className="block font-medium mb-2">Skills</label>
                {skillGroup.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => handleChange(e, 'skills', index, 'skills', skillIndex)}
                      disabled={mode === 'view'}
                      className="p-2 border rounded flex-1"
                    />
                    {mode !== 'view' && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('skills', index, 'skills', skillIndex)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                {mode !== 'view' && (
                  <button
                    type="button"
                    onClick={() => addArrayItem('skills', index, 'skills')}
                    className="text-blue-600"
                  >
                    <PlusCircle className="w-5 h-5" />
                  </button>
                )}
              </div>

              {mode !== 'view' && formData.skills.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem('skills', index)}
                  className="text-red-600 mt-2"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Achievements</h2>
            {mode !== 'view' && (
              <button
                type="button"
                onClick={() => addItem('achievements')}
                className="text-blue-600 hover:text-blue-800"
              >
                <PlusCircle className="w-6 h-6" />
              </button>
            )}
          </div>
          {formData.achievements.map((achievement, index) => (
            <div key={index} className="border p-4 rounded mb-4">
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={achievement.title}
                  onChange={(e) => handleChange(e, 'achievements', index, 'title')}
                  disabled={mode === 'view'}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={achievement.description}
                  onChange={(e) => handleChange(e, 'achievements', index, 'description')}
                  disabled={mode === 'view'}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Link"
                  value={achievement.link}
                  onChange={(e) => handleChange(e, 'achievements', index, 'link')}
                  disabled={mode === 'view'}
                  className="p-2 border rounded"
                />
              </div>
              {mode !== 'view' && formData.achievements.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem('achievements', index)}
                  className="text-red-600 mt-2"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Interests Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Interests</h2>
            {mode !== 'view' && (
              <button
                type="button"
                onClick={() => addItem('interests')}
                className="text-blue-600 hover:text-blue-800"
              >
                <PlusCircle className="w-6 h-6" />
              </button>
            )}
          </div>
          {formData.interests.map((interest, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={interest}
                onChange={(e) => handleChange(e, 'interests', index)}
                disabled={mode === 'view'}
                className="p-2 border rounded flex-1"
              />
              {mode !== 'view' && formData.interests.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem('interests', index)}
                  className="text-red-600"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Coursework Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Coursework</h2>
            {mode !== 'view' && (
              <button
                type="button"
                onClick={() => addItem('coursework')}
                className="text-blue-600 hover:text-blue-800"
              >
                <PlusCircle className="w-6 h-6" />
              </button>
            )}
          </div>
          {formData.coursework.map((course, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={course}
                onChange={(e) => handleChange(e, 'coursework', index)}
                disabled={mode === 'view'}
                className="p-2 border rounded flex-1"
              />
              {mode !== 'view' && formData.coursework.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem('coursework', index)}
                  className="text-red-600"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Responsibilities Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Responsibilities</h2>
            {mode !== 'view' && (
              <button
                type="button"
                onClick={() => addItem('responsibilities')}
                className="text-blue-600 hover:text-blue-800"
              >
                <PlusCircle className="w-6 h-6" />
              </button>
            )}
          </div>
          {formData.responsibilities.map((resp, index) => (
            <div key={index} className="border p-4 rounded mb-4">
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  placeholder="Role"
                  value={resp.role}
                  onChange={(e) => handleChange(e, 'responsibilities', index, 'role')}
                  disabled={mode === 'view'}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={resp.description}
                  onChange={(e) => handleChange(e, 'responsibilities', index, 'description')}
                  disabled={mode === 'view'}
                  className="p-2 border rounded"
                />
              </div>
              {mode !== 'view' && formData.responsibilities.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem('responsibilities', index)}
                  className="text-red-600 mt-2"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>
        {/* Download Button */}
        <div className="">
        {mode !== 'view' &&  (<button
            onClick={uploadResume}
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            Save
          </button>)}
        </div>
        <div>
        </div>

      </form>)}

    </div>
  );
};

export default ResumeBuilder;