import { useState, useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  FaBriefcase,
  FaChartLine,
  FaGlobe,
  FaUserGraduate,
  FaHandshake,
  FaDownload,
  FaShareAlt,
  FaLinkedin,
  FaTwitter,
  FaUserTie,
} from "react-icons/fa";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import toast from "react-hot-toast"; // Add this for toast notifications

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);

const PlacementHighlights = () => {
  const [placementRate, setPlacementRate] = useState(0);
  const [highestPackage, setHighestPackage] = useState(0);
  const [averagePackage, setAveragePackage] = useState(0);
  const [totalOffers, setTotalOffers] = useState(0);
  const [internshipConversion, setInternshipConversion] = useState(0);
  const [companiesVisited, setCompaniesVisited] = useState(0);

  useEffect(() => {
    // Default update speed
    const updateValues = (setter, limit) =>
      setInterval(
        () => setter((prev) => (prev < limit ? prev + 1 : limit)),
        30
      );

    // Faster update speed for totalOffers
    const updateTotalOffers = setInterval(
      () => setTotalOffers((prev) => (prev < 450 ? prev + 5 : 450)),
      10
    );

    const counters = [
      updateValues(setPlacementRate, 95),
      updateValues(setHighestPackage, 1.2),
      updateValues(setAveragePackage, 12),
      updateValues(setInternshipConversion, 85),
      updateValues(setCompaniesVisited, 100),
    ];

    return () => {
      counters.forEach(clearInterval);
      clearInterval(updateTotalOffers);
    };
  }, []);

  const barData = {
    labels: ["2021", "2022", "2023"],
    datasets: [
      {
        label: "Placement Rate (%)",
        data: [90, 92, 95],
        backgroundColor: ["#3b82f6", "#10b981", "#facc15"],
      },
      {
        label: "Average Package (LPA)",
        data: [8, 10, 12],
        backgroundColor: ["#2563eb", "#059669", "#f59e0b"],
      },
    ],
  };

  const doughnutData = {
    labels: [
      "IT",
      "Core Engineering",
      "Finance",
      "Consulting",
      "Other Sectors",
    ],
    datasets: [
      {
        data: [40, 25, 15, 10, 10],
        backgroundColor: [
          "#2563eb",
          "#10b981",
          "#facc15",
          "#f97316",
          "#db2777",
        ],
        hoverOffset: 6,
      },
    ],
  };

  const cardsData = [
    {
      title: "Placement Rate",
      value: `${placementRate}%`,
      icon: <FaBriefcase className="text-4xl mx-auto" />,
      bgColor: "bg-blue-100",
      textColor: "text-blue-800",
    },
    {
      title: "Highest Package",
      value: `₹${highestPackage} LPA`,
      icon: <FaChartLine className="text-4xl mx-auto" />,
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-800",
    },
    {
      title: "Average Package",
      value: `₹${averagePackage} LPA`,
      icon: <FaGlobe className="text-4xl mx-auto" />,
      bgColor: "bg-green-100",
      textColor: "text-green-800",
    },
    {
      title: "Total Offers",
      value: totalOffers,
      icon: <FaUserGraduate className="text-4xl mx-auto" />,
      bgColor: "bg-red-100",
      textColor: "text-red-800",
    },
    {
      title: "Internship Conversion",
      value: `${internshipConversion}%`,
      icon: <FaHandshake className="text-4xl mx-auto" />,
      bgColor: "bg-purple-100",
      textColor: "text-purple-800",
    },
    {
      title: "Companies Visited",
      value: `${companiesVisited}+`,
      icon: <FaUserTie className="text-4xl mx-auto" />,
      bgColor: "bg-sky-100",
      textColor: "text-sky-800",
    },
  ];

  const insightsData = [
    {
      title: "Top Companies",
      content:
        "Google, Microsoft, Amazon, Infosys, TCS, Wipro, Deloitte, Accenture.",
    },
    {
      title: "Internship Highlights",
      content:
        "Over 85% of students secured paid internships at top companies.",
    },
    {
      title: "Key Achievements",
      content: "Highest package of ₹60 LPA secured by multiple students.",
    },
    {
      title: "Top Sectors",
      content:
        "Significant placements in IT, Core Engineering, and Consulting sectors.",
    },
    {
      title: "Alumni Achievements",
      content:
        "Multiple alumni featured in Forbes 30 Under 30 and other accolades.",
    },
    { 
      title: "Placement Statistics", 
      content: "More than 95% of eligible students placed across various sectors."
    },  
  ];

  const handleSocialMediaShare = (platform) => {
    if (platform === "linkedin") {
      window.open(
        `https://www.linkedin.com/company/centre-of-training-and-placement-national-institute-of-technology-jalandhar/posts/?feedView=all`,
        "_blank"
      );
    } else if (platform === "twitter") {
      window.open(`https://x.com/NITJofficial`, "_blank");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(
        `https://www.linkedin.com/company/centre-of-training-and-placement-national-institute-of-technology-jalandhar/posts/?feedView=all`
      ) // Replace with your link
      .then(() => toast.success("Link copied to clipboard!"))
      .catch(() => toast.error("Failed to copy link"));
  };

  const handleDownloadPDF = () => {
    const pdfUrl = "/reports/placement-report.pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "placement-report.pdf";
    link.target = "_blank";
    link.click();
    toast.success("PDF downloaded successfully!");
  };

  return (
    <section className="bg-white py-16 px-6 lg:px-20 relative">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl mb-8">
          Placement <span className="text-custom-blue">Highlights</span>
        </h2>
        <p className="text-gray-600 mb-12 text-base sm:text-sm lg:text-lg">
          Discover our exceptional placement journey and success stories that
          define excellence.
        </p>

        {/* Dynamic Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className={`flex flex-col justify-center items-center ${card.bgColor} ${card.textColor} p-6 h-48 w-full max-w-xs rounded-lg text-center shadow-md m-auto`}
            >
              {card.icon}
              <h3 className="text-xl font-bold mt-4">{card.title}</h3>
              <p className="text-4xl font-extrabold mt-2">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-lg h-[50vh] md:h-[85vh]">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Placement Trends
            </h3>
            <Bar
              data={barData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
          <div className="p-6 bg-gradient-to-br rounded-lg shadow-lg h-[50vh] md:h-[85vh]">
            <h3 className="text-xl font-bold text-gray-800">
              Placement by Sector
            </h3>
            <Doughnut
              data={doughnutData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>

        {/* Insights Section with Testimonials */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {insightsData.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-blue-300 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold  mb-4">{item.title}</h3>
              <p className="text-gray-700">{item.content}</p>
            </div>
          ))}
        </div>

        {/* Social Media Share and Download Section */}
        <div className="flex flex-col sm:flex-row justify-center mt-12 gap-4 sm:gap-10">
          <button
            onClick={() => handleSocialMediaShare("linkedin")}
            className="z-10 flex items-center bg-gradient-to-r from-custom-blue to-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700"
          >
            <FaLinkedin className="mr-2" />
            View on LinkedIn
          </button>
          <button
            onClick={() => handleSocialMediaShare("twitter")}
            className="z-10 flex items-center bg-gradient-to-r from-custom-blue to-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700"
          >
            <FaTwitter className="mr-2" />
            View on Twitter
          </button>
          <button
            onClick={handleCopyLink}
            className="z-10 flex items-center bg-gradient-to-r from-custom-blue to-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700"
          >
            <FaShareAlt className="mr-2" />
            Copy Link
          </button>
          <button
            onClick={handleDownloadPDF}
            className="z-10 flex items-center bg-gradient-to-r from-custom-blue to-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700"
          >
            <FaDownload className="mr-2" />
            Download Placement Report
          </button>
        </div>
      </div>
    </section>
  );
};

export default PlacementHighlights;
