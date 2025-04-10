import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Search,
  Home,
  Menu,
  X
} from 'lucide-react';

const Navbar = () => {
  const instituteNames = [
    {
      title: "Dr BR AMBEDKAR NATIONAL INSTITUTE OF",
      subtitle: "TECHNOLOGY JALANDHAR, PUNJAB (INDIA)"
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <div className="flex justify-between items-center h-8">
            {/* Add social icons or other content here if needed */}
          </div>
        </div>
      </div>

      {/* Institute Name */}
      <div className="flex flex-col md:flex-row justify-evenly bg-white">
        {/* Visible only on small screens */}
        <div className="py-4 block md:hidden">

          <div className="container mx-auto px-4">
            <div className="flex flex-row items-center gap-4 justify-around">
              <img
                src="nitj-logo.png"
                alt="NITJ Logo"
                className="h-16 w-auto mb-2"
              />
              <div className="text-center">
                <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold break-words">
                  {instituteNames[index].title}
                </h1>
                <h2 className="text-sm sm:text-md md:text-lg">{instituteNames[index].subtitle}</h2>
              </div>

            </div>
          </div>
        </div>

        {/* Visible on medium and larger screens */}
        <div className="py-4 hidden md:block">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">

              <div className="text-center">
                <h1 className="text-base sm:text-lg md:text-xl lg:text-xl font-semibold whitespace-nowrap">
                  {instituteNames[index].title}
                </h1>
                <h2 className="text-sm sm:text-md md:text-lg font-semibold">{instituteNames[index].subtitle}</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="py-4 hidden md:block">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">

              <div className="text-center">
                <h1 className="text-base sm:text-lg md:text-xl lg:text-xl font-semibold whitespace-nowrap">
                  {instituteNames[(index+1)%3].title}
                </h1>
                <h2 className="text-sm sm:text-md md:text-lg font-semibold">{instituteNames[(index+1)%3].subtitle}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Main Navigation */}
      <div className="bg-custom-blue text-white sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 md:h-10 relative">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden z-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Navigation - Left Side */}
            <div className="hidden md:flex items-center space-x-6 flex-1 justify-evenly font-semibold">

              <Link to="/">
              <Home size={20} className="hover:text-blue-200 cursor-pointer" />
              </Link>
              <Link to="/placements" className="hover:text-blue-200 text-base lg:text-lg">PLACEMENTS</Link>
               <Link to="/internships" className="hover:text-blue-200 text-base lg:text-lg">INTERNSHIPS</Link>
               <Link to="/alumini" className="hover:text-blue-200 text-base lg:text-lg">ALUMINI</Link>
            </div>

            {/* Logo */}
            <div className="flex justify-center items-center">
              <div className="relative">
                <img
                  src="Rectangle.png"
                  alt="Background"
                  className="h-10 md:h-14 w-auto hidden md:block mt-4 "
                />
                <img
                  src="nitj-logo.png"
                  alt="NITJ Logo"
                  className="absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:-translate-y-3/4 h-20 md:h-32 w-auto z-10"
                />
              </div>
            </div>

            {/* Desktop Navigation - Right Side */}
            <div className="hidden md:flex items-center space-x-6 flex-1 justify-evenly font-semibold">
            <Link to="/faq" className="hover:text-blue-200 text-base lg:text-lg">FAQ's</Link>
               <Link to="/team" className="hover:text-blue-200 text-base lg:text-lg">PEOPLE</Link>
               <Link to="/login" className="hover:text-blue-200 text-base lg:text-lg">LOGIN</Link>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="absolute top-10  w-full bg-custom-blue md:hidden shadow-lg z-40">
                <div className="flex flex-col items-center py-4 space-y-4">
                  <Link to="/">
                  <Home size={20} className="hover:text-blue-200 cursor-pointer" />
                  </Link>
                  <Link to="/placements" className="hover:text-blue-200 text-base lg:text-lg">PLACEMENTS</Link>
                   <Link to="/internships" className="hover:text-blue-200 text-base lg:text-lg">INTERNSHIPS</Link>
                   <Link to="/alumini" className="hover:text-blue-200 text-base lg:text-lg">ALUMINI</Link>
                   <Link to="/faq" className="hover:text-blue-200 text-base lg:text-lg">FAQ's</Link>
                   <Link to="/team" className="hover:text-blue-200 text-base lg:text-lg">PEOPLE</Link>
                   <Link to="/login" className="hover:text-blue-200 text-base lg:text-lg">LOGIN</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;