import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faClipboardList, faLightbulb, faStar } from '@fortawesome/free-solid-svg-icons'; // Importing FontAwesome icons

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

  // Handle click on a company card
  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
  };

  // Close the modal box
  const closeModal = () => {
    setSelectedCompany(null);
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-center mb-8">
        Top <span className="text-custom-blue">Recruiters</span>
      </h1>
      <div className="w-full h-auto py-8 flex justify-center items-center">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4"
          style={{ perspective: '1200px' }}
        >
          {companies.map((company, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg border border-blue-200 hover:shadow-2xl transition-shadow duration-300 transform-gpu cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, rotateX: 10, rotateY: 10 }}
              onClick={() => handleCompanyClick(company)}
              style={{
                transformStyle: 'preserve-3d',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div className="text-center">
                <div className="mb-4">
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="h-16 w-auto object-contain mx-auto"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {company.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{company.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal for company details */}
      {selectedCompany && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="bg-white rounded-xl w-full sm:w-4/5 lg:w-1/2 xl:w-1/3 p-8 relative shadow-2xl"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-2xl  hover:text-red-600 transition duration-300"
            >
              ×
            </button>
            <div className="flex flex-col items-center text-center">
              <img
                src={selectedCompany.logo}
                alt={`${selectedCompany.name} logo`}
                className="h-20 w-auto object-contain mb-6"
              />
              <h2 className="text-2xl font-bold mb-2">{selectedCompany.name}</h2>
              <p className="text-gray-600 mb-4">{selectedCompany.description}</p>
              <div className="w-full h-0.5 bg-gray-300 mb-6"></div>

              {/* Scrollable Box Content */}
              <div className="flex flex-col h-72 overflow-y-auto">
                {/* Company Overview */}
                <div className="mb-4">
                  <div className="flex items-center justify-center mb-2">
                    <FontAwesomeIcon icon={faFileAlt} className="h-5 w-5 text-custom-blue mr-2" />
                    <h3 className="text-lg font-semibold text-gray-800">Overview</h3>
                  </div>
                  <p className="text-gray-600">{selectedCompany.description}</p>
                  <p className="text-gray-600 mt-4">Rating: {selectedCompany.rating} ★</p>
                  <p className="text-gray-600 mt-2">Location: {selectedCompany.location}</p>
                </div>

                {/* Placement History */}
                <div className="mb-4">
                  <div className="flex items-center justify-center mb-2">
                    <FontAwesomeIcon icon={faClipboardList} className="h-5 w-5 text-custom-blue mr-2" />
                    <h3 className="text-lg font-semibold text-gray-800">Placement History</h3>
                  </div>
                  <p className="text-gray-600">{selectedCompany.placementHistory}</p>
                </div>

                {/* Insights */}
                <div className="mb-4">
                  <div className="flex items-center justify-center mb-2">
                    <FontAwesomeIcon icon={faLightbulb} className="h-5 w-5 text-custom-blue mr-2" />
                    <h3 className="text-lg font-semibold text-gray-800">Placement Insights</h3>
                  </div>
                  <p className="text-gray-600">{selectedCompany.insights}</p>
                </div>

                {/* Reviews (Optional Section) */}
                <div>
                  <div className="flex items-center justify-center mb-2">
                    <FontAwesomeIcon icon={faStar} className="h-5 w-5 text-custom-blue mr-2" />
                    <h3 className="text-lg font-semibold text-gray-800">Employee Reviews</h3>
                  </div>
                  <p className="text-gray-600">Coming soon...</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default ImageSlider;
