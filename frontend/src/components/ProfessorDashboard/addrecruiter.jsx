import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const RecruiterForm = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
    designation: '',
  });

  const fetchRecruiters = async () => {
    try {
      const response = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/add-recruiter/get`,{withCredentials:true});
      setRecruiters(response.data);
    } catch (error) {
      console.error('Error fetching recruiters:', error);
    }
  };

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post(`${import.meta.env.REACT_APP_BASE_URL}/add-recruiter/add`,formData,{withCredentials:true});
        toast.success('Recruiter added successfully!');
        setFormData({
          name: '',
          email: '',
          password: '',
          company: '',
          designation: '',
        });
        fetchRecruiters();

    } catch (error) {
      console.error('Error adding recruiter:', error);
      toast.error(`${error.response.data.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
     
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Add New Recruiter</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Designation</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
               
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-custom-blue text-white py-2 px-4 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add Recruiter
            </button>
          </div>
        </form>

        <h2 className="text-2xl font-bold mt-12 mb-6">Recruiters List</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recruiters.map((recruiter) => (
              <div key={recruiter._id} className="border p-4 rounded-lg">
                <h3 className="text-lg font-semibold">{recruiter.name}</h3>
                <p className="text-sm text-gray-600">{recruiter.email}</p>
                <p className="text-sm text-gray-600">{recruiter.company}</p>
                <p className="text-sm text-gray-600">{recruiter.designation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterForm;