import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Search,
  Home
} from 'lucide-react';

const Navbar = () => {
  const instituteNames = [
    {
      title: "Dr B R AMBEDKAR NATIONAL INSTITUTE OF TECHNOLOGY",
      subtitle: "JALANDHAR, PUNJAB (INDIA)"
    },
    {
      title: "ਡਾ ਬੀ ਆਰ ਅੰਬੇਡਕਰ ਨੈਸ਼ਨਲ ਇੰਸਟੀਚਿਊਟ ਟੈਕਨਾਲੋਜੀ",
      subtitle: "ਜਲੰਧਰ, ਪੰਜਾਬ (ਭਾਰਤ)"
    },
    {
      title: "डॉ बी आर अम्बेडकर राष्ट्रीय प्रौद्योगिकी संस्थान",
      subtitle: "जालंधर, पंजाब (भारत)"
    }
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % instituteNames.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full m-0">
      {/* Top Bar */}
      <div className="bg-custom-blue text-white m-0">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-10">
            <div className="flex space-x-4 text-sm">
              <a href="#" className="hover:text-blue-200">JOBS</a>
              <a href="#" className="hover:text-blue-200">TENDERS</a>
              <a href="#" className="hover:text-blue-200">PLACEMENTS</a>
              <a href="#" className="hover:text-blue-200">RESOURCES</a>
              <a href="#" className="hover:text-blue-200">LIBRARY</a>
              <a href="#" className="hover:text-blue-200">PHONEBOOK</a>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <Facebook size={16} className="hover:text-blue-200 cursor-pointer" />
                <Instagram size={16} className="hover:text-blue-200 cursor-pointer" />
                <Twitter size={16} className="hover:text-blue-200 cursor-pointer" />
                <Linkedin size={16} className="hover:text-blue-200 cursor-pointer" />
                <Youtube size={16} className="hover:text-blue-200 cursor-pointer" />
              </div>
              <select className="bg-transparent border border-white rounded px-2 py-1 text-sm">
                <option value="en">Select Language</option>
                <option value="hi">Hindi</option>
                <option value="pb">Punjabi</option>
              </select>
              <div className="flex space-x-2 text-sm">
                <a href="#" className="hover:text-blue-200">ERP</a>
                <a href="#" className="hover:text-blue-200">EOFFICE</a>
                <a href="#" className="hover:text-blue-200">I-STEM</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Institute Name */}
      <div className="bg-white py-4">
        <div className="container mx-auto px-4 flex">
          <div className="text-center flex-1">
            <h1 className="text-xl font-bold">{instituteNames[index].title}</h1>
            <h2 className="text-lg">{instituteNames[index].subtitle}</h2>
          </div>

          <div className="text-center flex-1">
            <h1 className="text-xl font-bold">{instituteNames[index].title}</h1>
            <h2 className="text-lg">{instituteNames[index].subtitle}</h2>
          </div>

        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-custom-blue text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-evenly items-center h-10 relative font-semibold text-lg">
            <div className="flex items-center space-x-6 gap-5">
            <Link to="/">
                <Home size={24} className="hover:text-blue-200 cursor-pointer" />
              </Link>
              <Link to="/" className="hover:text-blue-200 text-xl">Home</Link>
              <Link to="/placements" className="hover:text-blue-200 text-xl">Placements</Link>
              <Link to="/internships" className="hover:text-blue-200 text-xl">Internships</Link>
            </div>

            {/* Image Container */}
            <div className="relative flex justify-center items-center">
              <img
                src="Rectangle.png"
                alt="Background"
                className="h-10 w-64"
              />
              <img
                src="nitj-logo.png"
                alt="NITJ Logo"
                className="absolute mb-24 h-32 w-auto z-50"
              />
            </div>

            <div className="flex items-center space-x-6 gap-5">
              <Link to="/#" className="hover:text-blue-200 text-xl">Alumni</Link>
              <Link to="/team" className="hover:text-blue-200 text-xl">People</Link>
              <Link to="/login" className="hover:text-blue-200 text-xl">Login</Link>
            </div>
            <Search size={24} className="hover:text-blue-200 cursor-pointer" />
          </div>
        </div>
      </div>


    </div>
  );
};

export default Navbar;