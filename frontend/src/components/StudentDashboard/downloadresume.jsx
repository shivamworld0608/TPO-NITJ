import React from "react";
import { jsPDF } from "jspdf";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Download, ExternalLink } from "lucide-react";

const ResumeSection = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-2">{title}</h2>
    {children}
  </div>
);

const ResumeDownload = () => {
  const resumeData = {
    "name": "Abhinav Sharma",
    "contact": {
      "github": "Github.com",
      "linkedin": "Linkedin",
      "email": "Email",
      "phone": "123456789"
    },
    "education": [
      {
        "institution": "nitj",
        "location": "jalandhar",
        "degree": "btech cse",
        "percentage": "8.74",
        "duration": "2022-2026"
      }
    ],
    "experience": [
      {
        "title": "full stack developer",
        "company": "xyz company",
        "description": [
          "website"
        ],
        "techStack": [
          "mern"
        ],
        "duration": "nov-present"
      }
    ],
    "projects": [
      {
        "name": "todo list",
        "description": [
          "to do list to trace your work"
        ],
        "techStack": [
          "mern"
        ],
        "link": "github.com"
      }
    ],
    "skills": [
      {
        "category": "technical",
        "skills": [
          "c,c++"
        ]
      }
    ],
    "achievements": [
      {
        "title": "leetocode",
        "description": "10+ questions",
        "link": ""
      }
    ],
    "interests": [
      "machine learning , web development"
    ],
    "coursework": [
      "dsa,cn,oops,os"
    ],
    "responsibilities": [
      {
        "role": "core team memeber",
        "description": "colage team member"
      }
    ]
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const marginLeft = 20;
    let y = 20;

    // Header Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(resumeData.name, 105, y, { align: "center" });
    y += 10;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`📧 ${resumeData.contact.email || "N/A"}`, marginLeft, y);
    y += 7;
    doc.text(`📞 ${resumeData.contact.phone || "N/A"}`, marginLeft, y);
    y += 7;
    doc.text(`🔗 LinkedIn: ${resumeData.contact.linkedin || "N/A"}`, marginLeft, y);
    y += 7;
    doc.text(`💻 GitHub: ${resumeData.contact.github || "N/A"}`, marginLeft, y);
    y += 10;

    const renderSection = (title, data) => {
      if (data.length === 0) return;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(title, marginLeft, y);
      y += 6;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);

      data.forEach((item) => {
        doc.text(`• ${item || "N/A"}`, marginLeft + 5, y);
        y += 6;
      });

      y += 4;
    };

    renderSection(
      "Education",
      resumeData.education.map(
        (edu) =>
          `${edu.degree}, ${edu.institution} (CGPA: ${edu.percentage || "N/A"})`
      )
    );

    renderSection(
      "Experience",
      resumeData.experience.map(
        (exp) => `${exp.title} at ${exp.company} (${exp.duration})`
      )
    );

    renderSection(
      "Projects",
      resumeData.projects.map(
        (proj) => `${proj.name}: ${proj.description.join(", ")}`
      )
    );

    renderSection(
      "Skills",
      resumeData.skills.flatMap((skill) => skill.skills)
    );

    renderSection(
      "Achievements",
      resumeData.achievements.map((ach) => ach.title)
    );

    renderSection("Interests", resumeData.interests);
    renderSection("Coursework", resumeData.coursework);
    renderSection(
      "Responsibilities",
      resumeData.responsibilities.map((resp) => resp.role)
    );

    doc.save("resume.pdf");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">{resumeData.name}</CardTitle>
            <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">📧 {resumeData.contact.email}</span>
              <span className="flex items-center gap-1">📞 {resumeData.contact.phone}</span>
              <a href={resumeData.contact.linkedin} className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                <ExternalLink className="w-4 h-4" /> LinkedIn
              </a>
              <a href={resumeData.contact.github} className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                <ExternalLink className="w-4 h-4" /> GitHub
              </a>
            </div>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={generatePDF} 
              className="w-full flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Resume as PDF
            </Button>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <ResumeSection title="Education">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.institution}, {edu.location}</p>
                  <p className="text-gray-600">CGPA: {edu.percentage} | {edu.duration}</p>
                </div>
              ))}
            </ResumeSection>

            <ResumeSection title="Experience">
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold">{exp.title}</h3>
                  <p className="text-gray-600">{exp.company} | {exp.duration}</p>
                  <ul className="list-disc ml-4 mt-2">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="text-gray-600">{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </ResumeSection>

            <ResumeSection title="Projects">
              {resumeData.projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="text-gray-600">{project.description}</p>
                  <p className="text-sm text-gray-500">Tech Stack: {project.techStack.join(", ")}</p>
                </div>
              ))}
            </ResumeSection>

            <ResumeSection title="Skills">
              {resumeData.skills.map((skillCategory, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold">{skillCategory.category}</h3>
                  <p className="text-gray-600">{skillCategory.skills.join(", ")}</p>
                </div>
              ))}
            </ResumeSection>

            <ResumeSection title="Achievements">
              {resumeData.achievements.map((achievement, index) => (
                <div key={index} className="mb-2">
                  <h3 className="font-semibold">{achievement.title}</h3>
                  <p className="text-gray-600">{achievement.description}</p>
                </div>
              ))}
            </ResumeSection>

            <ResumeSection title="Interests">
              <p className="text-gray-600">{resumeData.interests.join(", ")}</p>
            </ResumeSection>

            <ResumeSection title="Coursework">
              <p className="text-gray-600">{resumeData.coursework.join(", ")}</p>
            </ResumeSection>

            <ResumeSection title="Responsibilities">
              {resumeData.responsibilities.map((resp, index) => (
                <div key={index} className="mb-2">
                  <h3 className="font-semibold">{resp.role}</h3>
                  <p className="text-gray-600">{resp.description}</p>
                </div>
              ))}
            </ResumeSection>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResumeDownload;