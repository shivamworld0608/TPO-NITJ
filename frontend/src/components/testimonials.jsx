import { useState, useEffect } from 'react';
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Om Sharma',
    role: 'Placed at TechCorp',
    year: 'Batch of 2024',
    text: 'The Training and Placement Cell provided exceptional support throughout the placement season. The pre-placement training sessions were highly beneficial.',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/men/29.jpg',
  },
  {
    name: 'Rajiv Maltra',
    role: 'Intern at PM Solutions',
    year: 'Batch of 2025',
    text: 'Thanks to the TPC, I secured a great internship. The training programs and mock interviews were a game-changer for my preparation.',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/men/57.jpg',
  },
  {
    name: 'Snehal Verma',
    role: 'Recruiter at DesignPro',
    year: 'Recruitment Drive 2023',
    text: 'The candidates from NITJ are highly skilled and motivated. The placement process was smooth, and the support from the TPC team was exemplary.',
    rating: 4,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
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

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="testimonial-section  px-4 bg-white">
      <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl text-center mb-12">
        What Our <span className="text-custom-blue">Students Say!</span>
      </h2>

      <div className="testimonial-container relative flex justify-center items-center">
        <motion.div
          className="testimonial-card-container relative w-full max-w-5xl h-80 md:h-96 lg:h-[450px]"
          style={{
            perspective: '1000px',
          }}
        >
          <motion.div
            className="testimonial-cards absolute top-0 left-0 w-full h-full flex justify-center items-center"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateY(${currentTestimonial * -120}deg)`,
              transition: 'transform 1s ease-in-out',
            }}
          >
            {testimonials.map((testimonial, index) => {
              const isActive = index === currentTestimonial;
              return (
                <motion.div
                  key={index}
                  className={`testimonial-card bg-white p-6 rounded-lg shadow-lg max-w-sm w-[60vw] h-[40vh] absolute ${
                    isActive ? 'scale-105' : ''
                  }`}
                  style={{
                    transform: `rotateY(${index * 120}deg) translateZ(300px)`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <div className="testimonial-header flex items-center mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={`${testimonial.name} Avatar`}
                      className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm md:text-base text-gray-500">{testimonial.role}</p>
                      <p className="text-xs md:text-sm text-gray-400">Year: {testimonial.year}</p>
                    </div>
                  </div>

                  <div className="testimonial-text mb-4 text-gray-700 flex items-start">
                    <FaQuoteLeft className="text-lg md:text-xl text-gray-400 mr-2" />
                    <p className="text-sm md:text-base lg:text-lg italic">{testimonial.text}</p>
                    <FaQuoteRight className="text-lg md:text-xl text-gray-400 ml-2" />
                  </div>

                  <div className="testimonial-rating flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-yellow-500 ${i < testimonial.rating ? 'fill-current' : ''}`}
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        <div className={`absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2`}>
          <button
            className="bg-custom-blue p-2 md:p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300"
            onClick={prevTestimonial}
          >
            <FaChevronLeft className="text-sm md:text-xl text-white" />
          </button>
        </div>
        <div className={`absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2`}>
          <button
            className="bg-custom-blue p-2 md:p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300"
            onClick={nextTestimonial}
          >
            <FaChevronRight className="text-sm md:text-xl text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialTPC;
