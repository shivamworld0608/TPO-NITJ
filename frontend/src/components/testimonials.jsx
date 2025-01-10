import { useState } from 'react';
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Amit Sharma',
    role: 'Placed at TechCorp',
    year: 'Batch of 2024',
    text: 'The Training and Placement Cell provided exceptional support throughout the placement season. The pre-placement training sessions were highly beneficial, and the TPC team was always available for guidance.',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/men/29.jpg',
  },
  {
    name: 'Sneha Verma',
    role: 'Recruiter at DesignPro',
    year: 'Recruitment Drive 2023',
    text: 'The candidates from NITJ are highly skilled and motivated. The placement process was smooth, and the support from the TPC team was exemplary.',
    rating: 4,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Rajiv Malhotra',
    role: 'Intern at PM Solutions',
    year: 'Batch of 2025',
    text: 'Thanks to the TPC, I secured a great internship. The training programs and mock interviews were a game-changer for my preparation.',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/men/57.jpg',
  },
];

const TestimonialTPC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="testimonial-section py-16 px-4 bg-white">
      <h2 className="text-4xl font-bold text-center  mb-10">
    What Our <span className='text-custom-blue'>Students Say!</span>
      </h2>

      <div className="testimonial-container relative flex justify-center items-center">
        <motion.div
          className="testimonial-card bg-white p-8 rounded-lg shadow-lg max-w-md w-full transition-transform duration-300 hover:shadow-xl transform hover:scale-105"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="testimonial-header flex items-center mb-4">
            <img
              src={testimonials[currentTestimonial].avatar}
              alt={`${testimonials[currentTestimonial].name} Avatar`}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{testimonials[currentTestimonial].name}</h3>
              <p className="text-sm text-gray-500">{testimonials[currentTestimonial].role}</p>
              <p className="text-xs text-gray-400">Year: {testimonials[currentTestimonial].year}</p>
            </div>
          </div>

          <div className="testimonial-text mb-6 text-gray-700 flex items-start">
            <FaQuoteLeft className="text-xl text-gray-400 mr-2" />
            <p className="text-lg italic">{testimonials[currentTestimonial].text}</p>
            <FaQuoteRight className="text-xl text-gray-400 ml-2" />
          </div>

          <div className="testimonial-rating flex items-center">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-yellow-500 ${i < testimonials[currentTestimonial].rating ? 'fill-current' : ''}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Navigation Arrows */}
        <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 ${currentTestimonial === 0 && 'hidden'}`}>
          <button
            className="bg-custom-blue p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300"
            onClick={prevTestimonial}
          >
            <FaChevronLeft className="text-xl text-white" />
          </button>
        </div>
        <div className={`absolute right-0 top-1/2 transform -translate-y-1/2 ${currentTestimonial === testimonials.length - 1 && 'hidden'}`}>
          <button
            className="bg-custom-blue p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300"
            onClick={nextTestimonial}
          >
            <FaChevronRight className="text-xl text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialTPC;
