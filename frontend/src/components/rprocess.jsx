import { useState } from "react";

const Card = ({ title, content, headerColor = "custom-blue", index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => setIsExpanded(!isExpanded);

  const contentThreshold = 150;
  const isContentLong = content.length > contentThreshold;

  return (
    <div className="group rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-2xl hover:scale-[1.05] hover:rotate-1 transition-all duration-300 border border-gray-200">
      <div className="bg-custom-blue p-8 flex flex-col items-center text-center gap-4">
        <div className="flex-shrink-0 flex items-center justify-center bg-white text-custom-blue rounded-full w-14 h-14 shadow-lg font-bold text-2xl">
          {String(index).padStart(2, "0")}
        </div>
        <h3 className="text-2xl font-bold text-white leading-tight group-hover:decoration-white transition-all duration-300">
          {title}
        </h3>
      </div>

      <div className="p-8">
        <p
          className={`text-gray-700 leading-relaxed text-lg  transition-colors duration-300 ${
            isExpanded ? "" : "line-clamp-3"
          }`}
        >
          {isExpanded ? content : `${content.substring(0, contentThreshold)}`}
        </p>

        {isContentLong && (
          <button
            onClick={toggleReadMore}
            className="mt-4 text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-300"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
    </div>
  );
};

const RecruitmentProcess = () => {
  const steps = [
    {
      title: "Initial Contact",
      content:
        "The Placement office sends invitations to the companies/organizations along with relevant information",
    },
    {
      title: "Company Registration",
      content:
        "Interested companies register on the placement portal and provide necessary details.",
    },
    {
      title: "Pre-Placement Talk",
      content:
        "Companies conduct pre-placement talks to provide insights about their organization and job roles.",
    },
    {
      title: "Application Process",
      content:
        "Students apply for the job roles they are interested in through the placement portal.",
    },
    {
      title: "Shortlisting",
      content:
        "Companies shortlist candidates based on their resumes and academic performance.",
    },
    {
      title: "Aptitude Test",
      content:
        "Shortlisted candidates appear for an aptitude test conducted by the company.",
    },
    {
      title: "Technical Interview",
      content:
        "Candidates who clear the aptitude test undergo technical interviews to assess their skills.",
    },
    {
      title: "HR Interview",
      content:
        "Candidates who clear the technical interview have an HR interview to evaluate their fit for the company culture.",
    },
    {
      title: "Final Selection",
      content: "Selected candidates receive offer letters from the companies.",
    },
  ];

  return (
    <>
      <div className="rounded-2xl bg-gray-100 py-24 min-h-screen">
        <div className="max-w-8xl mx-auto px-6 space-y-16">
          <div className="space-y-6 max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-custom-blue">
              Recruitment Process
            </h1>
            <p className="text-sm text-gray-600 leading-relaxed">
              Follow our structured and transparent recruitment process designed
              to ensure mutual success for students and hiring organizations.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {steps.map((step, index) => (
              <Card
                key={index}
                title={step.title}
                content={step.content}
                index={index + 1}
                headerColor="bg-custom-blue"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecruitmentProcess;
