import Header from "../components/header";
import Footer from "../components/footer";
import { useState } from "react";
import PropTypes from "prop-types";

import Logo from "../assets/nitj-logo.png";

function Card({ title, content, link, downloadName, index }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleReadMore = () => setIsExpanded(!isExpanded);
  const contentThreshold = 150;
  const isContentLong = content.length > contentThreshold;

  return (
    <div className="group overflow-hidden my-5 bg-white shadow-lg hover:shadow-2xl hover:scale-[1.05] hover:rotate-1 transition-all duration-300 border border-gray-200 hover:border-custom-blue cursor-pointer flex-col">
      <a
        href={link}
        download={downloadName}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="relative overflow-hidden p-8 flex flex-col items-center text-center gap-4 flex-[1]">
          <img
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={Logo}
          />
          <div className="z-[100] absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
          <div className="z-[100] flex-shrink-0 flex items-center justify-center bg-white text-custom-blue rounded-full w-14 h-14 shadow-lg font-bold text-2xl">
            {String(index).padStart(2, "0")}
          </div>
          <h3 className="z-[100] text-2xl font-bold text-white leading-tight group-hover:text-white transition-all duration-300">
            {title}
          </h3>
        </div>
      </a>

      <div className="p-8 bg-gray-50">
        <p
          className={`text-gray-700 leading-relaxed text-lg transition-colors duration-300 ${
            isExpanded ? "" : "line-clamp-3"
          }`}
        >
          {isExpanded ? content : `${content.substring(0, contentThreshold)}`}
        </p>

        {isContentLong && (
          <button
            onClick={toggleReadMore}
            className="mt-4 text-custom-blue hover:text-blue-400 font-semibold transition-colors duration-300"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  downloadName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default function Downloads() {
  const availableDownloads = [
    {
      title: "Placement Brochure",
      content:
        "Download the latest placement brochure for detailed information.",
      link: "https://v1.nitj.ac.in/nitj_files/links/pb1_68544.pdf",
      downloadName: "placement-brochure.pdf",
    },
    {
      title: "Placement Policy",
      content: "Understand the placement policy and guidelines.",
      link: "/downloads/placement-policy.pdf",
      downloadName: "placement-policy.pdf",
    },
    {
      title: "Student Handbook",
      content: "A comprehensive guide for students regarding placements.",
      link: "https://nitj.ac.in/files/1691135109355-New%20UG%20Regulations%20(164%20credits)%2020%20Jun%202023.pdf",
      downloadName: "student-handbook.pdf",
    },
  ];

  return (
    <>
      <Header />
      <div className="rounded-2xl bg-white-100">
        <div className="max-w-8xl mx-auto px-6 space-y-16">
          <div className="space-y-6 max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              Recruitment <span className="text-custom-blue">Process</span>
            </h1>
            <p className="text-md text-gray-600 leading-relaxed text-base sm:text-sm lg:text-lg">
              Follow our structured and transparent recruitment process designed
              to ensure mutual success for students and hiring organizations.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {availableDownloads.map(({ title, content, link }, index) => (
              <Card
                key={index}
                title={title}
                content={content}
                link={link}
                index={index + 1}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
