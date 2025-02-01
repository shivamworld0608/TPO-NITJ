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

  return (
    <div className="bg-white min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-4xl">
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors mb-6"
        >
          Download PDF
        </button>

        <div
          ref={resumeRef}
          className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200 space-y-6 p-8"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{resumeData.name}</h1>
            <div className="flex justify-center gap-6 mt-4 text-gray-600">
              {resumeData.contact.github && (
                <a href={resumeData.contact.github} className="flex items-center gap-2 hover:text-blue-600">
                  GitHub
                </a>
              )}
              {resumeData.contact.linkedin && (
                <a href={resumeData.contact.linkedin} className="flex items-center gap-2 hover:text-blue-600">
                  LinkedIn
                </a>
              )}
              {resumeData.contact.email && (
                <div className="flex items-center gap-2">
                  {resumeData.contact.email}
                </div>
              )}
              {resumeData.contact.phone && (
                <div className="flex items-center gap-2">
                  {resumeData.contact.phone}
                </div>
              )}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Education</h2>
            <div className="space-y-4 text-gray-700 text-base">
              {resumeData.education.map((edu, index) => (
                <div key={index}>
                  <h3 className="font-semibold">{edu.institution}</h3>
                  <p>{edu.degree} | {edu.percentage} | {edu.duration}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Work Experience</h2>
            <div className="space-y-4 text-gray-700 text-base">
              {resumeData.experience.map((exp, index) => (
                <div key={index}>
                  <h3 className="font-semibold">{exp.title} at {exp.company}</h3>
                  <ul className="list-disc pl-4 space-y-2">
                    {exp.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                    <li>Tech Stack: {exp.techStack.join(", ")}</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Projects</h2>
            <div className="space-y-4 text-gray-700 text-base">
              {resumeData.projects.map((proj, index) => (
                <div key={index}>
                  <h3 className="font-semibold">{proj.name}</h3>
                  <p><a href={proj.link} className="text-blue-600 hover:underline">Website Link</a></p>
                  <ul className="list-disc pl-4 space-y-2">
                    {proj.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                    <li>Tech Stack: {proj.techStack.join(", ")}</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
  <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills</h2>
  <div className="space-y-3 text-gray-700 text-base">
    {resumeData.skills.map((category, index) => (
      <div key={index} className="flex">
        <p className="font-bold">{category.category} :</p>
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill, i) => (
            <p key={i} className=" px-2 py-1 ">{skill}</p>
          ))}
        </div>
      </div>
    ))}
  </div>
</div>


          {/* Achievements */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Achievements</h2>
            <div className="space-y-2 text-gray-700 text-base">
              {resumeData.achievements.map((ach, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="font-semibold">{ach.title}</span> {ach.description} 
                  {ach.link && <a href={ach.link} className="text-blue-600 hover:underline">Link</a>}
                </div>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Area of Interest</h2>
            <p className="text-gray-700 text-base">{resumeData.interests.join(", ")}</p>
          </div>

          {/* Coursework */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Work</h2>
            <p className="text-gray-700 text-base">{resumeData.coursework.join(", ")}</p>
          </div>

          {/* Positions of Responsibility */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Positions of Responsibility</h2>
            <ul className="list-disc pl-4 space-y-2 text-gray-700 text-base">
              {resumeData.responsibilities.map((res, index) => (
                <li key={index}>{res.role}: {res.description}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
