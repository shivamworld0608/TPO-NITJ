import { useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaMinus, FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";

const faqData = [
    {
      question: "How can I register for the placement process?",
      answer: "You can register for the placement process via the online portal provided by the Training and Placement Cell."
    },
    {
      question: "What documents do I need to submit for placement registration?",
      answer: "You need to submit your updated resume, academic transcripts, and other relevant documents."
    },
    {
      question: "What is the eligibility criteria for participating in campus placements?",
      answer: "You need to have a minimum GPA of 7.5 and have no active backlogs to be eligible."
    },
    {
      question: "How are placement offers made to students?",
      answer: "Placement offers are made directly by the recruiting companies after interviews, group discussions, and assessments."
    },
    {
      question: "When do the placement drives typically begin?",
      answer: "The placement drives usually begin at the start of the final semester, around August or September."
    },
    {
      question: "Can I apply for multiple companies during the placement process?",
      answer: "Yes, you can apply for multiple companies during the placement process, but you can only accept one offer."
    },
    {
      question: "What kind of training is provided by the Training and Placement Cell?",
      answer: "The Training and Placement Cell provides training in interview skills, resume building, soft skills, and technical expertise."
    },
    {
      question: "Are there any pre-placement offers (PPOs) or internships available?",
      answer: "Yes, PPOs and internships are often available, depending on the companies visiting the campus."
    },
    {
      question: "How does the Placement Cell assist in interview preparation?",
      answer: "The cell organizes mock interviews, workshops, and one-on-one sessions to help you prepare."
    },
    {
      question: "What are the key companies that visit the campus for recruitment?",
      answer: "Key companies include tech giants like Google, Microsoft, and Amazon, as well as industry leaders in various sectors."
    },
    {
      question: "How can I stay updated about the upcoming placement drives?",
      answer: "You can stay updated by checking the placement portal, attending placement seminars, and following the official social media pages."
    },
    {
      question: "Can I participate in the placement process if I have backlogs?",
      answer: "You must clear all backlogs before the placement process to be eligible for recruitment."
    },
    {
      question: "What is the average salary package offered during placements?",
      answer: "The average salary package varies, but it typically ranges between INR 6-12 LPA depending on the company."
    },
    {
      question: "Is there any support available for resume building and LinkedIn optimization?",
      answer: "Yes, the cell provides workshops on resume building and LinkedIn optimization to enhance your profile."
    },
    {
      question: "What role does the Placement Cell play in alumni networking?",
      answer: "The Placement Cell maintains an alumni network to provide mentorship, career guidance, and job referrals."
    },
    {
      question: "How does the Training and Placement Cell handle communication with recruiters?",
      answer: "The cell handles all communication with recruiters, including scheduling interviews, sharing student profiles, and facilitating offer letters."
    },
  ];
  

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const questionsPerPage = 6;

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredFaqData = faqData.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredFaqData.slice(indexOfFirstQuestion, indexOfLastQuestion);

  return (
    <div className="faq-container py-16 px-4 sm:px-6 md:px-8 lg:px-12 bg-white">
      <h2 className="text-4xl font-bold text-center mb-8 ">Frequently<span className="text-custom-blue"> Asked Questions</span></h2>

      {/* Search Bar */}
      <div className="search-bar mb-8 flex justify-center">
        <div className="relative w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
          <input
            type="text"
            className="search-input w-full p-4 pl-12 pr-6 rounded-full border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:text-custom-blue shadow-sm transition-all duration-300 ease-in-out hover:ring-2 hover:ring-blue-500"
            placeholder="Search for a question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute left-4 top-1/2 transform -translate-y-1/2 text-custom-blue hover:text-blue-500 transition duration-300 rounded-full">
            <FaSearch className="text-xl font-bold" />
          </button>
        </div>
      </div>

      <div className="faq-list space-y-4">
        {currentQuestions.map((item, index) => (
          <motion.div
            key={index}
            className="faq-item"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            <div
              className="faq-question bg-gray-100 p-4 rounded-lg shadow-lg cursor-pointer hover:bg-blue-100 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => toggleFAQ(indexOfFirstQuestion + index)}
            >
              <h3 className="text-lg font-semibold flex items-center justify-between">
                {item.question}
                <span>
                  {activeIndex === indexOfFirstQuestion + index ? (
                    <FaMinus className="text-custom-blue transition-transform duration-300 transform rotate-0" />
                  ) : (
                    <FaPlus className="text-custom-blue transition-transform duration-300 transform rotate-0" />
                  )}
                </span>
              </h3>
            </div>
            {activeIndex === indexOfFirstQuestion + index && (
              <motion.div
                className="faq-answer bg-gray-50 p-4 mt-2 rounded-lg shadow-md"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                transition={{ duration: 0.4 }}
              >
                <p>{item.answer}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination flex justify-center space-x-4 mt-6">
        {currentPage > 1 && (
          <button
            className="pagination-button bg-gradient-to-r from-custom-blue to-blue-500 text-white p-3 rounded-full hover:bg-gradient-to-l transition duration-300"
            onClick={() => paginate(currentPage - 1)}
          >
            <FaChevronLeft className="inline mr-2" />
            Previous
          </button>
        )}

        {currentPage < Math.ceil(filteredFaqData.length / questionsPerPage) && (
          <button
            className="pagination-button bg-gradient-to-r from-custom-blue to-blue-700 text-white p-3 rounded-full hover:bg-gradient-to-l transition duration-300"
            onClick={() => paginate(currentPage + 1)}
          >
            Next
            <FaChevronRight className="inline ml-2" />
          </button>
        )}
      </div>
    </div>
  );
};

export default FAQ;
