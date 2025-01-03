import React, { useState, useEffect } from "react";
import { Share2, BarChart2, Users, Grid, ChevronDown, ChevronUp, ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../components/header";
import Footer from "../components/footer";

const WhyRecruit = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      title: "Alumni",
      icon: <Share2 className="w-8 h-8 text-blue-500" />,
      description:
        "The institute recognizes alumni who have distinguished themselves through their work and done the institute proud. Our alumni hold senior positions at highly respected institutions globally.",
      expanded:
        "Our alumni network spans across Fortune 500 companies, leading research institutions, and innovative startups. Notable achievements include leadership roles at major tech companies, groundbreaking research publications, and successful entrepreneurial ventures. The institute maintains strong connections with alumni through regular meetups, mentorship programs, and collaborative research projects.",
    },
    {
      title: "Ranking",
      icon: <BarChart2 className="w-8 h-8 text-blue-500" />,
      description:
        "According to NIRF ranking 2022, we ranked 52nd in Engineering Ranking and 85th in overall ranking. We are ranked 47th amongst all Govt. Engineering Institutes and stood 2nd rank in Punjab.",
      expanded:
        "Our consistent improvement in rankings reflects our commitment to academic excellence. We've shown remarkable progress in research output, faculty quality, and industry collaboration. The institute has received multiple awards for innovation and teaching excellence, with substantial increases in research funding and industry partnerships.",
    },
    {
      title: "Selection Process",
      icon: <Users className="w-8 h-8 text-blue-500" />,
      description:
        "Students are admitted through JEE MAINS score or DASA. M.Tech students get admission based on GATE exam scores. MBA admissions are done through CCMT counselling and CAT/MAT/GMAT/CMAT scores.",
      expanded:
        "Our rigorous selection process ensures we admit only the brightest minds. The institute maintains high cutoff ranks, resulting in a highly competitive peer group. We also have special provisions for international students through DASA, promoting cultural diversity on campus. Our selection criteria emphasize both academic excellence and overall potential.",
    },
    {
      title: "Development",
      icon: <Grid className="w-8 h-8 text-blue-500" />,
      description:
        "There are 15 departments with highly educated and experienced staff. We have 10 clubs performing various activities to improve social/cultural skills of students, including famous fests like techNITi and Utkansh.",
      expanded:
        "Our comprehensive development approach includes technical workshops, soft skills training, and leadership development programs. Students participate in national and international competitions, securing top positions. The institute offers state-of-the-art laboratories, research facilities, and innovation centers for hands-on learning experience.",
    },
  ];

  const achievements = [
    "90% placement rate for graduating students",
    "50+ research papers published annually",
    "20+ patents filed in the last 5 years",
    "100+ industry collaborations",
    "30+ startups incubated on campus",
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen  from-gray-50 to-gray-100 bg-[#C6DDFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-6 text-custom-blue">Why Recruit From NIT Jalandhar?</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-semibold">
              Established in 1987, the institute has played a pivotal role in delivering to the technocratic demands of
              the world. Our alumni have proved their worth in global arena and many hold senior positions at highly
              respected institutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[rgb(227,236,245)] rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {stat.icon}
                    <h3 className="text-2xl font-semibold text-gray-900 ml-3">{stat.title}</h3>
                  </div>
                  <button
                    onClick={() => setExpandedSection(expandedSection === index ? null : index)}
                    className="text-blue-500 hover:text-blue-700 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md px-2 py-1"
                    aria-expanded={expandedSection === index}
                    aria-controls={`content-${index}`}
                  >
                    {expandedSection === index ? (
                      <>
                        Show Less <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Know More <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
                <p className="text-gray-600">{stat.description}</p>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: expandedSection === index ? 1 : 0,
                    height: expandedSection === index ? "auto" : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                  id={`content-${index}`}
                >
                  {expandedSection === index && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-gray-600">{stat.expanded}</p>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 bg-blue-900 text-white rounded-lg p-8 shadow-xl"
          >
            <h2 className="text-3xl font-bold mb-6">Our Excellence</h2>
            <p className="text-blue-100 text-lg mb-6">
              Most of our faculty hold PhD degrees from institutes of high repute. The Government pampers us with great
              funds, as the country envisions its future in us. As per our achievements and performance, we can conclude
              that our institute is one of the best in North India region, which explains our increasing overall rankings
              over the years on multiple platforms.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                  <span>{achievement}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Recruit Top Talent?</h2>
            <p className="text-xl text-gray-600 mb-8 font-semibold">
              Join the ranks of leading companies who have found their star performers at NIT Jalandhar.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
            >
              Get in Touch <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WhyRecruit;
