import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faClipboardList, faLightbulb, faStar } from '@fortawesome/free-solid-svg-icons';

const companies = [
  {
    name: 'Microsoft',
    logo: 'https://www.microsoft.com/favicon.ico',
    description: 'Leading tech company offering innovative solutions across the globe.',
    placementHistory: '300+ Placements in 2023, 100+ Internships.',
    insights: 'Known for competitive hiring process, strong presence in tech domains like cloud, AI, and security.',
    rating: 4.5,
    location: 'Redmond, WA, USA',
  },
  {
    name: 'Google',
    logo: 'https://www.google.com/favicon.ico',
    description: 'Pioneering in AI and cloud computing with a focus on innovation.',
    placementHistory: '500+ Placements in 2023, 150+ Internships.',
    insights: 'Highly selective in hiring, offers excellent growth and tech opportunities.',
    rating: 4.7,
    location: 'Mountain View, CA, USA',
  },
  {
    name: 'Meta',
    logo: 'https://cdn-icons-png.flaticon.com/256/6033/6033716.png',
    description: 'Redefining social media with cutting-edge technologies and virtual reality.',
    placementHistory: '200+ Placements in 2023, 50+ Internships.',
    insights: 'Great work culture and innovation in virtual reality and social platforms.',
    rating: 4.3,
    location: 'Menlo Park, CA, USA',
  },
  {
    name: 'Apple',
    logo: 'https://www.apple.com/favicon.ico',
    description: 'Globally recognized for its consumer electronics and software products.',
    placementHistory: '350+ Placements in 2023, 120+ Internships.',
    insights: 'Known for design and engineering excellence. A great place to work with amazing perks.',
    rating: 4.6,
    location: 'Cupertino, CA, USA',
  },
  {
    name: 'Amazon',
    logo: 'https://www.amazon.com/favicon.ico',
    description: 'The largest e-commerce company with a global footprint in various industries.',
    placementHistory: '600+ Placements in 2023, 250+ Internships.',
    insights: 'Offers great opportunities in logistics, tech, and leadership roles.',
    rating: 4.2,
    location: 'Seattle, WA, USA',
  },
];

const ImageSlider = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
  };

  const closeModal = () => {
    setSelectedCompany(null);
  };

  return (
    <>
      {/* Header */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-custom-blue to-blue-500 bg-clip-text text-transparent relative" initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Top <span className="text-transparent">Recruiters</span> Offering Placements
        <span className="block w-24 h-1 bg-gradient-to-r from-custom-blue to-blue-500 mx-auto mt-4 rounded animate-draw"></span>
      </motion.h1>

      {/* Gradient Background */}
      <div className="w-full h-auto py-12 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex justify-center items-center relative overflow-hidden rounded-lg shadow-lg">

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-6xl"
          style={{ perspective: '1200px' }}
        >
          {companies.map((company, index) => (
            <motion.div
              key={index}
              className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform-gpu cursor-pointer border border-blue-200/50"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 8,
                borderColor: '#00d4ff',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
              }}
              onClick={() => handleCompanyClick(company)}
              style={{
                transformStyle: 'preserve-3d',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                transformOrigin: 'center'
              }}
            >
              {/* Badge */}
              <span className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center">
                <FontAwesomeIcon icon={faStar} className="h-4 w-4 mr-1" />
                Top Recruiter
              </span>

              <div className="text-center">
                <motion.div
                  className="mb-4"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="h-16 w-16 object-contain mx-auto rounded-full border-2 border-blue-300 p-1"
                  />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 font-poppins">
                  {company.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 font-poppins">
                  {company.description}
                </p>
                <motion.button
                  className="bg-gradient-to-r from-custom-blue to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold opacity-0"
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Company Details */}
      {selectedCompany && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="bg-white rounded-2xl w-full sm:w-4/5 lg:w-1/2 xl:w-1/3 p-8 relative shadow-2xl border border-blue-200/50"
            initial={{ scale: 0.8, rotateX: -10 }}
            animate={{ scale: 1, rotateX: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              transformStyle: 'preserve-3d',
              background: 'linear-gradient(145deg, #ffffff, #f0f4ff)',
            }}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-3xl text-gray-500 hover:text-red-600 transition duration-300"
            >
              ×
            </button>
            <div className="flex flex-col items-center text-center">
              <motion.img
                src={selectedCompany.logo}
                alt={`${selectedCompany.name} logo`}
                className="h-20 w-20 object-contain mb-6 rounded-full border-2 border-blue-300 p-2"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              <h2 className="text-2xl font-bold mb-2 text-gray-800 font-poppins">
                {selectedCompany.name}
              </h2>
              <p className="text-gray-600 mb-4 font-poppins">
                {selectedCompany.description}
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-custom-blue to-blue-500 mb-6 rounded"></div>

              {/*  Content Box */}
              <div className="flex flex-col h-72 overflow-y-auto">

                <div className="mb-6">
                  <div className="flex items-center justify-center mb-2">
                    <FontAwesomeIcon icon={faFileAlt} className="h-5 w-5 text-custom-blue mr-2" />
                    <h3 className="text-lg font-semibold text-gray-800 font-poppins">
                      Overview
                    </h3>
                  </div>
                  <p className="text-gray-600 font-poppins">
                    {selectedCompany.description}
                  </p>
                  <p className="text-gray-600 mt-4 font-poppins">
                    Rating: {selectedCompany.rating} ★
                  </p>
                  <p className="text-gray-600 mt-2 font-poppins">
                    Location: {selectedCompany.location}
                  </p>
                </div>

                {/* Placement History */}
                <div className="mb-6">
                  <div className="flex items-center justify-center mb-2">
                    <FontAwesomeIcon icon={faClipboardList} className="h-5 w-5 text-custom-blue mr-2" />
                    <h3 className="text-lg font-semibold text-gray-800 font-poppins">
                      Placement History
                    </h3>
                  </div>
                  <p className="text-gray-600 font-poppins">
                    {selectedCompany.placementHistory}
                  </p>
                </div>

                {/* Insights */}
                <div className="mb-6">
                  <div className="flex items-center justify-center mb-2">
                    <FontAwesomeIcon icon={faLightbulb} className="h-5 w-5 text-custom-blue mr-2" />
                    <h3 className="text-lg font-semibold text-gray-800 font-poppins">
                      Placement Insights
                    </h3>
                  </div>
                  <p className="text-gray-600 font-poppins">
                    {selectedCompany.insights}
                  </p>
                </div>

                {/* Reviews */}
                <div>
                  <div className="flex items-center justify-center mb-2">
                    <FontAwesomeIcon icon={faStar} className="h-5 w-5 text-custom-blue mr-2" />
                    <h3 className="text-lg font-semibold text-gray-800 font-poppins">
                      Employee Reviews
                    </h3>
                  </div>
                  <p className="text-gray-600 font-poppins">Coming soon...</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

        .font-poppins {
          font-family: 'Poppins', sans-serif;
        }

        .bg-circuit-pattern {
          background-image: url('https://www.transparenttextures.com/patterns/circuit-pattern.png');
          background-size: cover;
        }

        .animate-draw {
          animation: draw 1.5s forwards;
        }

        @keyframes draw {
          0% {
            width: 0;
          }
          100% {
            width: 6rem;
          }
        }

        @media (max-width: 768px) {
          .text-4xl {
            font-size: 2rem;
          }
          .text-5xl {
            font-size: 2.5rem;
          }
          .h-16 {
            height: 3rem;
          }
          .w-16 {
            width: 3rem;
          }
          .h-20 {
            height: 4rem;
          }
          .w-20 {
            width: 4rem;
          }
        }
      `}</style>
    </>
  );
};

export default ImageSlider;