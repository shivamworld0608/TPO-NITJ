import React, { useState, useEffect, useRef } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    name: "Emily Rodriguez",
    course: "Web Development Bootcamp",
    quote: "This program completely transformed my career. I went from zero coding knowledge to landing a job at a tech startup in just six months!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/57.jpg",
    background: "bg-gradient-to-br from-blue-100 to-blue-200"
  },
  {
    name: "Michael Chang",
    course: "Data Science Masterclass",
    quote: "The curriculum was challenging but incredibly supportive. The instructors helped me build a portfolio that impressed my future employers.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/29.jpg",
    background: "bg-gradient-to-br from-green-100 to-green-50"
  },
  {
    name: "Sara Johnson",
    course: "UX Design Intensive",
    quote: "Learning design thinking and practical skills has been a game-changer. I now confidently design user-centered digital experiences.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/57.jpg",
    background: "bg-gradient-to-br from-purple-100 to-purple-200"
  },
  {
    name: "Alex Kim",
    course: "AI & Machine Learning Program",
    quote: "The hands-on projects and expert mentorship gave me the skills to develop cutting-edge AI solutions and launch my tech career.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    background: "bg-gradient-to-br from-red-100 to-red-200"
  }
];

const StudentTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const intervalRef = useRef(null);
  const containerRef = useRef(null);

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      handleNext();
    }, 5000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, []);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    stopAutoPlay();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    
    if (Math.abs(walk) > 50) {
      if (walk > 0) {
        handlePrev();
      } else {
        handleNext();
      }
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    startAutoPlay();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      startAutoPlay();
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        className={`
          inline-block mx-0.5 
          ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
        `} 
        size={20} 
      />
    ));
  };

  return (
    <section className="bg-white py-5 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center relative">
        <h1 className="font-bold text-3xl lg:text-4xl text-center tracking-wide mb-7">
          What Our&nbsp;
          <span className="bg-custom-blue text-transparent bg-clip-text">
            Students Say
          </span>
        </h1>

        <div 
          ref={containerRef}
          className="relative h-[500px] w-full group cursor-grab"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <button 
            onClick={handlePrev}
            className="
              absolute left-0 top-1/2 -translate-y-1/2 z-30 
              bg-white/70 hover:bg-white/90 rounded-full p-2 
              shadow-lg group-hover:opacity-100 opacity-0 
              transition-all duration-300
            "
          >
            <ChevronLeft size={32} className="text-gray-700" />
          </button>

          <button 
            onClick={handleNext}
            className="
              absolute right-0 top-1/2 -translate-y-1/2 z-30 
              bg-white/70 hover:bg-white/90 rounded-full p-2 
              shadow-lg group-hover:opacity-100 opacity-0 
              transition-all duration-300
            "
          >
            <ChevronRight size={32} className="text-gray-700" />
          </button>

          <AnimatePresence initial={false} custom={direction}>
            {testimonials.map((testimonial, index) => (
              activeIndex === index && (
                <motion.div
                  key={index}
                  custom={direction}
                  variants={{
                    enter: (direction) => ({
                      x: direction > 0 ? 1000 : -1000,
                      opacity: 0
                    }),
                    center: {
                      zIndex: 1,
                      x: 0,
                      opacity: 1
                    },
                    exit: (direction) => ({
                      zIndex: 0,
                      x: direction < 0 ? 1000 : -1000,
                      opacity: 0
                    })
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className={`
                    absolute inset-0 rounded-2xl shadow-2xl 
                    ${testimonial.background} 
                    flex flex-col items-center justify-center p-12
                    ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
                  `}
                >
                  <div className="max-w-2xl">
                    <Quote className="text-blue-500 mb-6 mx-auto" size={64} />
                    
                    <p className="text-md font-medium text-gray-800 mb-8 italic">
                      "{testimonial.quote}"
                    </p>
                    
                    <div className="flex items-center justify-center mb-6">
                      {renderStars(testimonial.rating)}
                    </div>

                    <div className="flex items-center justify-center">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-24 h-24 rounded-full border-4 border-white shadow-lg mr-6"
                      />
                      <div className="text-left">
                        <h3 className="text-2xl font-bold text-gray-900">{testimonial.name}</h3>
                        <p className="text-md text-gray-600">{testimonial.course}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-12 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${activeIndex === index 
                  ? 'bg-custom-blue w-8' 
                  : 'bg-gray-300 hover:bg-blue-300'}
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentTestimonials;