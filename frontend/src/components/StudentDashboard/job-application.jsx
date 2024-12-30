import React, { useState } from 'react';

const JobApplications = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        resume: null,
        coverLetter: ''
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };

    return (
        <div className="job-application">
            <h2>Job Application</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Resume:</label>
                    <input
                        type="file"
                        name="resume"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Cover Letter:</label>
                    <textarea
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Submit Application</button>
            </form>
        </div>
    );
};

export default JobApplications;