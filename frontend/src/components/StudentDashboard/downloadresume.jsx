import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Resume = ({ resumeData }) => {
  const resumeRef = useRef(null);

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;

    const element = resumeRef.current;
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${resumeData.name}_Resume.pdf`);
  };

  const handleMakeBold = () => {
    // This will toggle the bold formatting for the selected text.
    document.execCommand("bold", false, null);
  };

  const handleAddLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      document.execCommand("createLink", false, url);
    }
  };

  return (
    <div>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={handleDownloadPDF}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors mb-6"
      >
        Download PDF
      </button>

      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={handleMakeBold}
        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition-colors mb-6 ml-2"
      >
        Bold
      </button>

      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={handleAddLink}
        className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700 transition-colors mb-6 ml-2"
      >
        Add Link
      </button>

      <div
        ref={resumeRef}
        className="max-w-4xl mx-auto p-8 bg-white"
        contentEditable={true}
        suppressContentEditableWarning={true}
      >
        {/* Header */}
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold mb-1 font-serif">{resumeData.name}</h1>
          <div className="flex flex-wrap gap-4 text-sm justify-center ">
            {resumeData.contact.github && (
              <a href={resumeData.contact.github} className="text-gray-600">GitHub</a>
            )}
            {resumeData.contact.linkedin && (
              <a href={resumeData.contact.linkedin} className="text-gray-600">LinkedIn</a>
            )}
            {resumeData.contact.email && (
              <span className="text-gray-600">{resumeData.contact.email}</span>
            )}
            {resumeData.contact.phone && (
              <span className="text-gray-600">{resumeData.contact.phone}</span>
            )}
          </div>
        </header>

        {/* Education Section */}
        {resumeData.education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-1 border-b border-black pb-2 font-serif">EDUCATION</h2>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="mb-4 font-serif">
                <h3 className="font-bold tracking-wide">{edu.institution}</h3>
                <p>{edu.degree} - {edu.percentage} | {edu.duration}</p>
              </div>
            ))}
          </section>
        )}

        {/* Work Experience */}
        {resumeData.experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-1 border-b border-black pb-1 font-serif">WORK EXPERIENCE</h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-bold tracking-wide">{exp.title} at {exp.company}</h3>
                <ul className="list-disc ml-5 font-serif">
                  {exp.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                  <li>Tech Stack: {exp.techStack.join(", ")}</li>
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {resumeData.projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-1 border-b border-black pb-1 font-serif">PROJECTS</h2>
            {resumeData.projects.map((proj, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-bold tracking-wide">{proj.name}</h3>
                <a href={proj.link} className="text-blue-600">Website Link</a>
                <ul className="list-disc ml-5 font-serif">
                  {proj.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                  <li>Tech Stack: {proj.techStack.join(", ")}</li>
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-1 border-b border-black pb-1 font-serif">SKILLS</h2>
            {resumeData.skills.map((category, index) => (
              <p key={index} className="font-serif">
                {category.category}: {category.skills.join(", ")}
              </p>
            ))}
          </section>
        )}

        {/* Achievements */}
        {resumeData.achievements.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-1 border-b border-black pb-1 font-serif">ACHIEVEMENTS</h2>
            {resumeData.achievements.map((ach, index) => (
              <p key={index}>
                {ach.title} - {ach.description}{" "}
                {ach.link && (
                  <a href={ach.link} className="text-blue-600 font-serif">
                    Link
                  </a>
                )}
              </p>
            ))}
          </section>
        )}

        {/* Area of Interest */}
        {resumeData.interests.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-1 border-b border-black pb-1 font-serif">AREA OF INTEREST</h2>
            <p className="font-serif">{resumeData.interests.join(", ")}</p>
          </section>
        )}

        {/* Course Work */}
        {resumeData.coursework.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-1 border-b border-black pb-1 font-serif">COURSE WORK</h2>
            <p className="font-serif">{resumeData.coursework.join(", ")}</p>
          </section>
        )}

        {/* Positions of Responsibility */}
        {resumeData.responsibilities.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-1 border-b border-black pb-1 font-serif">POSITIONS OF RESPONSIBILITY</h2>
            <ul className="list-disc ml-5 font-serif">
              {resumeData.responsibilities.map((res, index) => (
                <li key={index}>
                  {res.role}: {res.description}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export default Resume;
