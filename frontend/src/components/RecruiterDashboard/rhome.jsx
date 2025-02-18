import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from '../ui/card';
import { FaUserTie, FaMoneyBillAlt } from "react-icons/fa";
import { FaClipboardList, FaEye, FaCommentDots, FaFileAlt, FaFilePdf ,FaFileDownload} from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import { ArrowRight } from 'lucide-react';


const RHome = () => {

  const [data, Setdata] = useState({ departmentWise: [], packageWise: [] });
  const [loading, setLoading] = useState(true); // Track loading state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stats, setStats] = useState({
    totalStudentsPlaced: 0,

    averagePackage: 0,
  });

  const logos = [
    {
      name: "Google", url: 'data:image/png;base64,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',
    },
    {
      name: "micro", url: 'https://upload.wikimedia.org/wikipedia/sco/thumb/2/21/Nvidia_logo.svg/2560px-Nvidia_logo.svg.png',
    },
    { name: "accenture", url: 'data:image/png;base64,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' },
    {
      name: "Zeta", url: 'data:image/jpeg;base64,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',
    }, {
      name: "Meesho", url: 'data:image/png;base64,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',
    }, {
      name: "Optum", url: 'data:image/png;base64,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',
    }, {
      name: "Airtel", url: 'data:image/png;base64,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',
    }, {
      name: "IBM", url: 'data:image/png;base64,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',
    },
    { name: "Google", url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkUMikg27db1spuIcpTgnDNlZeqTtD_u_aIw&s' },
    { name: "Google", url: 'https://diplo-media.s3.eu-central-1.amazonaws.com/2024/10/blackrock-ai-etfs-1024x576.png' },
    { name: "Expedia", url: 'https://media.licdn.com/dms/image/v2/D4D12AQEmVZ5jJsrfIQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1685952320582?e=2147483647&v=beta&t=j1FRzKvQxrX8isDy2JHZT8nwxJzQ_bvn7uqCpkJ-q3E' },

  ];

  const imagesPerView = 8;
  const totalSlides = logos.length - imagesPerView + 1;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [totalSlides]);
  const StatCard = ({
    value,
    label,
    bgColor,
    borderColor,
    textColor,
    icon: Icon,
    isLoading,
  }) => {
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
      if (!isLoading) {
        setIsTransitioning(true);
        const timer = setTimeout(() => setIsTransitioning(false), 300);
        return () => clearTimeout(timer);
      }
    }, [isLoading]);

    return (
      <div
        className={`
      ${bgColor} 
      ${borderColor} 
      rounded-xl 
      p-6 
      ${textColor} 
      shadow-lg 
      relative 
      overflow-hidden
      transition-all 
      duration-300 
      ease-in-out
      ${isTransitioning ? "scale-[1.02]" : "scale-100"}
      hover:shadow-xl
    `}
      >
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <div
            className={`
          transform 
          transition-all 
          duration-300 
          ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}
        `}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${textColor} bg-opacity-20`}>
                <Icon className="w-6 h-6" /> {/* Render the icon */}
              </div>
              <div>
                <div className="text-3xl font-bold">
                  {value === 0 ? "N/A" : value}
                </div>
                <div className={`${textColor}/80 text-sm mt-1`}>{label}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.REACT_APP_BASE_URL}/placements/cominsights`,
        { withCredentials: true }
      );
      Setdata(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchPlacements = async () => {
    setLoading(true);
    try {
      const apiUrl = `${import.meta.env.REACT_APP_BASE_URL
        }/placements/insights`;
      const response = await axios.get(apiUrl);
      setStats(response.data);
    } catch (error) {

    } finally {
      // Simulate minimum loading time for better UX
      setTimeout(() => setLoading(false), 800);
    }
  };
  useEffect(() => {
    fetchPlacements();
  }, []);
  // Handle loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-custom-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const departmentData = data.departmentWise.map(item => ({
    name: item._id,
    value: item.count
  }));

  const packageData = data.packageWise.map(item => ({
    name: item._id,
    value: item.count
  }));



  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 animate-fade-in">
          <p className="font-medium text-gray-800">{label}</p>
          <p className="text-blue-600 font-semibold">
            Count: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };
  const chartConfigs = [
    {
      title: "Department-Wise Stats",
      titleColor: "#1D4ED8",
      data: departmentData,
      color: "url(#departmentGradient)",
      stats: {
        total: departmentData.reduce((acc, curr) => acc + curr.value, 0),
        average: (departmentData.reduce((acc, curr) => acc + curr.value, 0) / departmentData.length).toFixed(1),
        highest: Math.max(...departmentData.map(item => item.value)),
        lowest: Math.min(...departmentData.map(item => item.value))
      }
    },
    {
      title: "Package-Wise Stats",
      data: packageData,
      color: "url(#packageGradient)",
      stats: {
        total: packageData.reduce((acc, curr) => acc + curr.value, 0),
        average: (packageData.reduce((acc, curr) => acc + curr.value, 0) / packageData.length).toFixed(1),
        highest: Math.max(...packageData.map(item => item.value)),
        lowest: Math.min(...packageData.map(item => item.value))
      }
    }
  ];

  const recruitmentMetrics = [
    { label: "Applications", value: 380, colorbg: "#dbeafe", txtcolor: "#2563eb" },
    { label: "Shortlisted", value: 120, colorbg: "#dcfce7", txtcolor: "#16a34a" },
    { label: "Interviewed", value: 45, colorbg: "#fef9c3", txtcolor: "#ca8a04" },
    { label: "Offered", value: 8, colorbg: "#fee2e2", txtcolor: "#dc2626" },
    { label: "Time To Hire", value: "45 days", colorbg: "#ccfbf1", txtcolor: "#0d9488" },
    { label: "Conversion", value: "68%", colorbg: "#f3e8ff", txtcolor: "#9333ea" },
  ];

  const placementData = [
    { company: "Barclays", Intern: 50, Placed: 30 },
    { company: "Hero Motorcorp", Intern: 20, Placed: 10 },
    { company: "Intuit", Intern: 30, Placed: 20 },
    { company: "Microsoft", Intern: 70, Placed: 50 },
    { company: "Flipkart", Intern: 60, Placed: 40 },
    { company: "Samsung", Intern: 50, Placed: 30 },
    { company: "TeaGritty", Intern: 40, Placed: 25 },
  ];



  const quickActions = [
    {
      icon: <FaClipboardList size={24} />,
      label: "Create Job Posting",
      description: "Quickly create and publish job opportunities.",
      route: "/rdashboard/jaf",
      color: "bg-blue-50 hover:bg-blue-100"
    },
    {
      icon: <FaEye size={24} />,
      label: "View Applications",
      description: "Direct access to manage submitted applications.",
      route: "/rdashboard/createdjob",
      color: "bg-purple-50 hover:bg-purple-100"
    },
    {
      icon: <FaCommentDots size={24} />,
      label: "Feedback",
      description: "Your Feedback is valuable to us.",
      route: "/rdashboard/feedback",
      color: "bg-green-50 hover:bg-green-100"
    },
    {
      icon: <FaFileAlt size={24} />,
      label: "View Policy",
      description: "View placement/internship policies of college",
      route: "/rdashboard/guidelines",
      color: "bg-orange-50 hover:bg-orange-100"
    }
  ];
  

  const handleDownloadPdf1 = () => {
    const pdfUrl = 'Academic Programs.pdf'; 
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'AcademicPrograms.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to handle the download of the second PDF
  const handleDownloadPdf2 = () => {
    const pdfUrl = 'Brochure.pdf'; 
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'PlacementBorchure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const downloadpdf = [
    {
      icon: <FaFileDownload size={24} />,
      label: "Academic programs",
      description: "Click to download our academic programs.",
      fun: handleDownloadPdf1,
      color: "bg-blue-50 hover:bg-blue-100"
    },
    {
      icon: <FaFileDownload size={24} />,
      label: "Placement borchure",
      description: "Click to download placement borchure of NITJ",
      fun: handleDownloadPdf2,
      color: "bg-purple-50 hover:bg-purple-100"
    },
  ];

  return (
    <div className="bg-gray-100 p-4 md:p-6 min-h-screen">
      <p class="text-4xl font-bold text-center text-custom-blue mb-6 p-4">
        Welcome, XYZ Company ✌️
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 h-32">
        <StatCard
          value={1000}
          label="Total Student"
          bgColor="bg-green-50"
          borderColor="border-2 border-green-100"
          textColor="text-green-700"
          icon={FaUserTie} // Pass the icon
          isLoading={loading}
        />
        <StatCard
          value={stats.totalStudentsPlaced}
          label="Total Placements"
          bgColor="bg-blue-50"
          borderColor="border-2 border-blue-100"
          textColor="text-blue-700"
          icon={FaUserTie} // Pass the icon
          isLoading={loading}
        />
        <StatCard
          value={
            stats.averagePackage != 0
              ? stats.averagePackage >= 10000000
                ? `${(stats.averagePackage / 10000000).toFixed(2)} Cr`
                : `${(stats.averagePackage / 100000).toFixed(2)} LPA`
              : "N/A"
          }
          label="Average Package"
          bgColor="bg-purple-50"
          borderColor="border-2 border-purple-100"
          textColor="text-purple-700"
          icon={FaMoneyBillAlt} // Pass the icon
          isLoading={loading}
        />
      </div>

      {/* Grid Container */}

      {/* Quick Actions */}
      <div className="shadow-lg rounded-xl overflow-hidden m-10 border border-gray-200">
        <h1 className="text-white bg-custom-blue text-center text-3xl font-bold py-3">
          Quick Actions
        </h1>
        <div className="p-8 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {quickActions.map((action, idx) => (
              <Link key={idx} to={action.route} className="no-underline">
                <div
                  className={`group relative overflow-hidden rounded-xl ${action.color} p-8 
            transition-all duration-300 hover:scale-[1.03] cursor-pointer
            shadow-md hover:shadow-xl border border-gray-100 hover:border-gray-200`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-gray-700 text-2xl">{action.icon}</span>
                        <h3 className="font-semibold text-xl text-gray-800">
                          {action.label}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-base">
                        {action.description}
                      </p>
                    </div>
                    <ArrowRight
                      className="text-gray-400 group-hover:text-gray-600 transition-colors duration-300"
                      size={24}
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r 
              from-transparent via-white/20 to-transparent transform translate-x-[-100%] 
              group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Download pdfs*/}
      <div className="shadow-lg rounded-xl overflow-hidden m-10 border border-gray-200">

        <h1 className="text-white bg-custom-blue text-center text-3xl font-bold py-3 flex items-center justify-center gap-2">
          <FaFilePdf />
          <span>Download PDF's</span>
        </h1>
        <div className="p-8 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {downloadpdf.map((action, idx) => (
              
                <div
                  className={`group relative overflow-hidden rounded-xl ${action.color} p-8 
            transition-all duration-300 hover:scale-[1.03] cursor-pointer
            shadow-md hover:shadow-xl border border-gray-100 hover:border-gray-200`}
                >
                  <button onClick={action.fun} className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-gray-700 text-2xl">{action.icon}</span>
                        <h3 className="font-semibold text-xl text-gray-800">
                          {action.label}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-base">
                        {action.description}
                      </p>
                    </div>
                    <ArrowRight
                      className="text-gray-400 group-hover:text-gray-600 transition-colors duration-300"
                      size={24}
                    />
                  </button>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r 
              from-transparent via-white/20 to-transparent transform translate-x-[-100%] 
              group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>
             
            ))}
          </div>
        </div>
      </div>


      {/* Recruitment Metrics */}
      {/* <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="font-semibold text-lg mb-4 text-center md:text-left">
            Recruitment Metrics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recruitmentMetrics.map((metric, idx) => (
              <MetricCard
                key={idx}
                label={metric.label}
                value={metric.value}
                colorbg={metric.colorbg}
                txtcolor={metric.txtcolor}
              />
            ))}
          </div>
        </div> */}

      {/* Placement Analytics */}

      <div className="w-full max-w-7xl p-6 bg-gray-50 rounded-xl">

        <div className="grid md:grid-cols-2 gap-6">
          {chartConfigs.map((config, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{config.title}</h2>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={config.data} className="animate-fade-in">
                      <defs>
                        <linearGradient id="departmentGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.8} />
                          <stop offset="100%" stopColor="#4F46E5" stopOpacity={0.3} />
                        </linearGradient>
                        <linearGradient id="packageGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#059669" stopOpacity={0.8} />
                          <stop offset="100%" stopColor="#059669" stopOpacity={0.3} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#f0f0f0"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="name"
                        stroke="#6b7280"
                        tick={{ fill: '#4b5563', fontSize: 12 }}
                        tickLine={false}
                        axisLine={{ stroke: '#e5e7eb' }}
                      />
                      <YAxis
                        stroke="#6b7280"
                        tick={{ fill: '#4b5563', fontSize: 12 }}
                        tickLine={false}
                        axisLine={{ stroke: '#e5e7eb' }}
                      />
                      <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                      />
                      <Bar
                        dataKey="value"
                        fill={config.color}
                        radius={[8, 8, 0, 0]}
                        maxBarSize={80}
                        animationDuration={1000}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">

                  <div className="bg-indigo-50 p-4  rounded-lg hover:shadow-md transition-shadow duration-200">
                    <p className="text-sm text-gray-600">Average-count</p>
                    <p className="text-xl font-bold text-indigo-600">
                      {config.stats.average}
                    </p>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-lg hover:shadow-md transition-shadow duration-200">
                    <p className="text-sm text-gray-600">Highest-count</p>
                    <p className="text-xl font-bold text-indigo-600">
                      {config.stats.highest}
                    </p>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-lg hover:shadow-md transition-shadow duration-200">
                    <p className="text-sm text-gray-600">Lowest-count</p>
                    <p className="text-xl font-bold text-indigo-600">
                      {config.stats.lowest}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="w-full mt-10 py-10 bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ">
        {/* Heading */}
        <h2 className="text-center text-4xl font-bold mb-12 text-custom-blue">
          Companies visited
        </h2>

        {/* Logo Slider Container */}
        <div className="relative max-w-6xl mx-auto overflow-hidden">
          <div
            className="flex transition-transform duration-200 ease-in-out items-center"
            style={{
              transform: `translateX(-${currentIndex * (100 / imagesPerView)}%)`,
              width: `${(logos.length * 100) / imagesPerView}%`
            }}
          >
            {logos.map((logo, index) => (
              <div
                key={index}
                className="relative flex-shrink-0 px-8"
                style={{ width: `${100 / imagesPerView}%` }}
              >
                <div className="h-20 flex items-center justify-center">
                  <img
                    src={logo.url}
                    alt={`${logo.name} logo`}
                    className="max-w-[180px] max-h-16 object-contain transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>


    </div>
  );
};

// Metric Card Component
const MetricCard = ({ label, value, colorbg, txtcolor }) => (
  <div
    style={{ backgroundColor: colorbg }}
    className="flex flex-col items-center justify-center p-4 rounded-lg shadow-md"
  >
    <p style={{ color: txtcolor }} className="text-xl font-bold">
      {value}
    </p>
    <p className="text-gray-600 capitalize">{label}</p>
  </div>
);


export default RHome;
