import { useState, useEffect, useRef } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Tanishka Pahuja",
    course: "Intern at Optum",
    quote:
      "Securing an internship at Optum has been a truly rewarding experience for me. My journey at NIT Jalandhar has played a crucial role in shaping my technical skills, problem-solving abilities, and professional attitude.",
    rating: 5,
    background: "bg-gradient-to-br from-blue-100 to-blue-200",
  },
  {
    name: "Raghav",
    course: "Intern at Expedia",
    quote:
      "Securing an internship at Expedia has been an incredibly fulfilling moment in my journey at NIT Jalandhar. The institute’s strong technical culture, continuous encouragement from faculty, and vibrant peer community helped me stay focused and confident throughout the process.",
    rating: 5,
    background: "bg-gradient-to-br from-green-100 to-green-50",
  },
  {
    name: "Danish",
    course: "Microsoft Intern",
    quote:
      "Getting an internship at Microsoft has been a dream come true. My journey at NIT Jalandhar has been instrumental in shaping my skills and mindset — from late-night coding sessions to countless mock interviews and constant support from peers and mentors..",
    rating: 5,
    background: "bg-gradient-to-br from-purple-100 to-purple-200",
  },
  {
    name: "Vivek Yadav",
    course: "Optum Intern",
    quote:
      "I'm thrilled to have secured an internship at Optum! My time at NIT Jalandhar has been key in building the skills and confidence needed for this opportunity.",
    rating: 5,
    background: "bg-gradient-to-br from-red-100 to-red-200",
  },
  {
    name: "Sarishti",
    course: "Amazon Intern",
    quote:
      "Securing an internship at Amazon has been a truly rewarding achievement for me. My time at NIT Jalandhar helped me build a strong technical base, sharpen my problem-solving skills, and stay persistent throughout the preparation journey.",
    rating: 5,
    background: "bg-gradient-to-br from-red-100 to-red-200",
  },
  {
    name: "Raghav",
    course: "Intern at Accenture",
    quote:
      "I'm incredibly excited to have secured an internship at Accenture! My journey at NIT Jalandhar has been filled with learning, growth, and constant encouragement from faculty and peers.",
    rating: 5,
    background: "bg-gradient-to-br from-red-100 to-red-200",
  },
  {
    name: "Rajdeep",
    course: "Google Intern",
    quote:
      "Getting an internship at Google has been a dream come true. My experience at NIT Jalandhar has been a huge part of this journey — from building strong fundamentals to constantly challenging myself to improve.",
    rating: 5,
    background: "bg-gradient-to-br from-red-100 to-red-200",
  },
];

const StudentTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef(null);

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
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`
          inline-block mx-0.5 
          ${index < rating ? "text-yellow-400 fill-current" : "text-gray-300"}
        `}
        size={20}
      />
    ));
  };

  return (
    <section className="bg-white py-5 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center relative">
        {/* <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold mb-12 text-gray-900 tracking-tight"
        >
          Student Success Stories
        </motion.h2> */}

        <h1 className="font-bold text-3xl lg:text-4xl text-center tracking-wide mb-7">
          What Our&nbsp;
          <span className="bg-custom-blue text-transparent bg-clip-text">
            Students Say
          </span>
        </h1>

        <div
          className="relative h-[500px] w-full group"
          onMouseEnter={stopAutoPlay}
          onMouseLeave={startAutoPlay}
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
            {testimonials.map(
              ({ background, name, course, quote, rating }, index) =>
                activeIndex === index && (
                  <motion.div
                    key={index}
                    custom={direction}
                    variants={{
                      enter: (direction) => ({
                        x: direction > 0 ? 1000 : -1000,
                        opacity: 0,
                      }),
                      center: {
                        zIndex: 1,
                        x: 0,
                        opacity: 1,
                      },
                      exit: (direction) => ({
                        zIndex: 0,
                        x: direction < 0 ? 1000 : -1000,
                        opacity: 0,
                      }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    className={`
                    absolute inset-0 rounded-2xl shadow-2xl 
                    ${background} 
                    flex flex-col items-center justify-center p-12
                  `}
                  >
                    <div className="max-w-2xl">
                      <Quote className="text-blue-500 mb-6 mx-auto" size={64} />

                      <p className="text-md font-medium text-gray-800 mb-8 italic">
                        &quot;{quote}&quot;
                      </p>

                      <div className="flex items-center justify-center mb-6">
                        {renderStars(rating)}
                      </div>

                      <div className="flex items-center justify-center">
                        <img
                          src={`/testimonials/testimonial-${index + 1}.jpg`}
                          alt={name}
                          className="w-24 h-24 rounded-full border-4 border-white shadow-lg mr-6"
                        />
                        <div className="text-left">
                          <h3 className="text-2xl font-bold text-gray-900">
                            {name}
                          </h3>
                          <p className="text-md text-gray-600">{course}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-12 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${
                  activeIndex === index
                    ? "bg-custom-blue w-8"
                    : "bg-gray-300 hover:bg-blue-300"
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentTestimonials;
