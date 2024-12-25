import React, { useEffect, useState } from "react";
import axios from "axios";

const TopRecruiters = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const response = await axios.get("/api/recruiters");
        setRecruiters(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch recruiters");
        setLoading(false);
      }
    };

    fetchRecruiters();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto my-8">
      <h1 className="text-3xl font-bold text-center mb-6">Top Recruiters</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recruiters.map((recruiter) => (
          <div
            key={recruiter.id}
            className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={recruiter.logoUrl}
              alt={`${recruiter.companyName} logo`}
              className="w-24 h-24 object-contain mb-4"
            />
            <p className="text-lg font-medium text-center">{recruiter.companyName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRecruiters;
