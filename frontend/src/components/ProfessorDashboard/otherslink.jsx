import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';


const OthersLinkManager = ({ jobId, stepIndex, onClose, othersLinks, onUpdateLinks }) => {
  const [students, setStudents] = useState([]);
  const [starredFields, setStarredFields] = useState([]);
  const [commonLink, setCommonLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [allLinksVisible, setAllLinksVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    const fetchEligibleStudents = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/eligible_students`,
          { jobId, stepIndex },
          { withCredentials: true }
        );
        const {eligibleStudents, starredFields} = response.data;
        const updatedStudents = eligibleStudents.map((student) => {
          const studentLink = othersLinks.find(link => link.studentId === student.studentId);
          return {
            ...student,
            othersLink: studentLink ? studentLink.othersLink : '',
            visibility: studentLink ? studentLink.visibility : false
          };
        });
        setStudents(updatedStudents);
        setStarredFields(starredFields || []);
      } catch (err) {
        console.error('Error fetching eligible students:', err);
        toast.error('Failed to fetch eligible students');
      } finally {
        setLoading(false);
      }
    };

    fetchEligibleStudents();
  }, [jobId, stepIndex, othersLinks]);

  const handleToggleVisibility = (index) => {
    const updatedStudents = [...students];
    updatedStudents[index].visibility = !updatedStudents[index].visibility;
    setStudents(updatedStudents);
  };

  const handleCommonLinkChange = (e) => {
    setCommonLink(e.target.value);
  };

  const handleUniqueLinkChange = (index, value) => {
    const updatedStudents = [...students];
    updatedStudents[index].othersLink = value;
    setStudents(updatedStudents);
  };

  const applyCommonLinkToAll = () => {
    const updatedStudents = students.map(student => ({
      ...student,
      othersLink: commonLink,
    }));
    setStudents(updatedStudents);
  };

  const toggleAllVisibility = () => {
    const updatedStudents = students.map(student => ({
      ...student,
      visibility: !allLinksVisible
    }));
    setStudents(updatedStudents);
    setAllLinksVisible(!allLinksVisible);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const studentsWithLinks = students
      .filter(student => student.othersLink.trim() !== '')
      .map(student => ({
        studentId: student.studentId,
        othersLink: student.othersLink,
        visibility: student.visibility
      }));
    if (studentsWithLinks.length === 0) {
      toast.error('No Others links have been provided');
      setIsSubmitting(false);
      return;
    }
  
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/set-others-links`,
        { jobId, stepIndex, students: studentsWithLinks },
        { withCredentials: true }
      );
      toast.success('Others links set successfully!');
      onUpdateLinks(studentsWithLinks);
      onClose();
    } catch (error) {
      console.error('Error setting Others links:', error);
      toast.error('Failed to set Others links.');
    } finally {
      setLoading(false);
      isSubmitting(false);
    }
  };

  return (
    <>
    <div className="mt-2 ml-4">
        <button className="flex items-center text-blue-600 hover:text-blue-800" onClick={onClose}>
          <FaArrowLeft className="mr-2" />
        </button>
      </div>
    <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4 w-2/3">
          <input
            type="text"
            value={commonLink}
            onChange={handleCommonLinkChange}
            className="flex-1 p-2 border border-gray-300 rounded-lg"
            placeholder="Enter common Others link"
          />
          <button
            className="bg-custom-blue text-white px-4 py-2 rounded-lg"
            onClick={applyCommonLinkToAll}
          >
            Apply to All
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={allLinksVisible}
              onChange={toggleAllVisibility}
              className="hidden"
            />
            <div className={`
              w-12 h-6 rounded-full relative transition-colors duration-300
              ${allLinksVisible ? 'bg-green-500' : 'bg-gray-300'}
            `}>
              <span className={`
                absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full 
                transition-transform duration-300
                ${allLinksVisible ? 'translate-x-6' : ''}
              `}></span>
            </div>
            <span className="ml-2 text-sm">Visibility</span>
          </label>
        </div>
      </div>

      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm text-left text-gray-500 border-collapse">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
            {starredFields.map((field, index) => (
                        <th key={index} className="px-4 py-2 border">{field.fieldName}</th>
                      ))}
              <th className="px-4 py-2 border">Others Link</th>
              <th className="px-4 py-2 border">Visibility</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="bg-white border-b">
                 {starredFields.map((field, fieldIndex) => (
                          <td key={fieldIndex} className="px-4 py-2 border">
                            {student[field.fieldName]}
                          </td>
                        ))}
                <td className="px-4 py-2 border">
                  <input
                    type="text"
                    value={student.othersLink}
                    onChange={(e) => handleUniqueLinkChange(index, e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg w-full"
                    placeholder="Enter unique Others link"
                  />
                </td>
                <td className="px-4 py-4 flex justify-center items-center">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={student.visibility}
                      onChange={() => handleToggleVisibility(index)}
                      className="hidden"
                    />
                    <div className={`
                      w-12 h-6 rounded-full relative transition-colors duration-300
                      ${student.visibility ? 'bg-green-500' : 'bg-gray-300'}
                      `}>
                      <span className={`
                        absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full 
                        transition-transform duration-300
                        ${student.visibility ? 'translate-x-6' : ''}
                      `}></span>
                    </div>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 flex space-x-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded-lg" onClick={onClose} disabled={loading}>
          Cancel
        </button>
      </div>
    </div>
  </>
  );
};

export default OthersLinkManager;