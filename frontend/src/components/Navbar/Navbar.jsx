// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// import {
//   Facebook,
//   Instagram,
//   Twitter,
//   Linkedin,
//   Youtube,
//   Search,
//   Home
// } from 'lucide-react';

// const Navbar = () => {
//   const instituteNames = [
//     {
//       title: "Dr B R AMBEDKAR NATIONAL INSTITUTE OF TECHNOLOGY",
//       subtitle: "JALANDHAR, PUNJAB (INDIA)"
//     },
//     {
//       title: "ਡਾ ਬੀ ਆਰ ਅੰਬੇਡਕਰ ਨੈਸ਼ਨਲ ਇੰਸਟੀਚਿਊਟ ਟੈਕਨਾਲੋਜੀ",
//       subtitle: "ਜਲੰਧਰ, ਪੰਜਾਬ (ਭਾਰਤ)"
//     },
//     {
//       title: "डॉ बी आर अम्बेडकर राष्ट्रीय प्रौद्योगिकी संस्थान",
//       subtitle: "जालंधर, पंजाब (भारत)"
//     }
//   ];
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prevIndex) => (prevIndex + 1) % instituteNames.length);
//     }, 2000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="w-full m-0">
//       {/* Top Bar */}
//       <div className="bg-custom-blue text-white m-0">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center h-10">
//             <div className="flex space-x-4 text-sm">
//               <a href="#" className="hover:text-blue-200">JOBS</a>
//               <a href="#" className="hover:text-blue-200">TENDERS</a>
//               <a href="#" className="hover:text-blue-200">PLACEMENTS</a>
//               <a href="#" className="hover:text-blue-200">RESOURCES</a>
//               <a href="#" className="hover:text-blue-200">LIBRARY</a>
//               <a href="#" className="hover:text-blue-200">PHONEBOOK</a>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="flex space-x-2">
//                 <Facebook size={16} className="hover:text-blue-200 cursor-pointer" />
//                 <Instagram size={16} className="hover:text-blue-200 cursor-pointer" />
//                 <Twitter size={16} className="hover:text-blue-200 cursor-pointer" />
//                 <Linkedin size={16} className="hover:text-blue-200 cursor-pointer" />
//                 <Youtube size={16} className="hover:text-blue-200 cursor-pointer" />
//               </div>
//               <select className="bg-transparent border border-white rounded px-2 py-1 text-sm">
//                 <option value="en">Select Language</option>
//                 <option value="hi">Hindi</option>
//                 <option value="pb">Punjabi</option>
//               </select>
//               <div className="flex space-x-2 text-sm">
//                 <a href="#" className="hover:text-blue-200">ERP</a>
//                 <a href="#" className="hover:text-blue-200">EOFFICE</a>
//                 <a href="#" className="hover:text-blue-200">I-STEM</a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Institute Name */}
//       <div className="bg-white py-4 ">
//         <div className="container mx-auto px-4 flex justify-between h-20">
//           <div className="text-center ">
//             <h1 className="text-xl font-bold">{instituteNames[index].title}</h1>
//             <h2 className="text-lg">{instituteNames[index].subtitle}</h2>
//           </div>

//           <div className="text-center ">
//             <h1 className="text-xl font-bold">{instituteNames[index].title}</h1>
//             <h2 className="text-lg">{instituteNames[index].subtitle}</h2>
//           </div>

//         </div>
//       </div>

//       {/* Main Navigation */}
//       <div className="bg-custom-blue text-white">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-evenly items-center h-10 relative font-semibold text-lg">
//             <div className="flex items-center space-x-6 gap-5">
//               <Home size={24} className="hover:text-blue-200 cursor-pointer" />
//               <Link to="/" className="hover:text-blue-200 text-xl">Home</Link>
//               <Link to="/placements" className="hover:text-blue-200 text-xl">Placements</Link>
//               <Link to="/internships" className="hover:text-blue-200 text-xl">Internships</Link>
//             </div>

//             {/* Image Container */}
//             <div className="relative flex justify-center items-center">
//               <img
//                 src="Rectangle.png"
//                 alt="Background"
//                 className="h-10 w-64"
//               />
//               <img
//                 src="nitj-logo.png"
//                 alt="NITJ Logo"
//                 className="absolute mb-24 h-32 w-auto z-50"
//               />
//             </div>

//             <div className="flex items-center space-x-6 gap-5">
//               <Link to="/alumini" className="hover:text-blue-200 text-xl">Alumni</Link>
//               <Link to="/team" className="hover:text-blue-200 text-xl">People</Link>
//               <Link to="/login" className="hover:text-blue-200 text-xl">Login</Link>
//             </div>
//             <Search size={24} className="hover:text-blue-200 cursor-pointer" />
//           </div>
//         </div>
//       </div>


//     </div>
//   );
// };

// export default Navbar;


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   Facebook, Instagram, Twitter, Linkedin, Youtube,
//   Search, Home, Menu, X
// } from 'lucide-react';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [index, setIndex] = useState(0);

//   const instituteNames = [
//     {
//       title: "Dr B R AMBEDKAR NATIONAL INSTITUTE OF TECHNOLOGY",
//       subtitle: "JALANDHAR, PUNJAB (INDIA)"
//     },
//     {
//       title: "ਡਾ ਬੀ ਆਰ ਅੰਬੇਡਕਰ ਨੈਸ਼ਨਲ ਇੰਸਟੀਚਿਊਟ ਟੈਕਨਾਲੋਜੀ",
//       subtitle: "ਜਲੰਧਰ, ਪੰਜਾਬ (ਭਾਰਤ)"
//     },
//     {
//       title: "डॉ बी आर अम्बेडकर राष्ट्रीय प्रौद्योगिकी संस्थान",
//       subtitle: "जालंधर, पंजाब (भारत)"
//     }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prevIndex) => (prevIndex + 1) % instituteNames.length);
//     }, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="w-full m-0">
//       {/* Mobile Menu Button */}
//       <div className="md:hidden bg-custom-blue p-4">
//         <button
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           className="text-white"
//         >
//           {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-custom-blue text-white p-4">
//           <div className="flex flex-col space-y-4">
//             <div className="flex flex-col space-y-2">
//               <Link to="/" className="hover:text-blue-200">Home</Link>
//               <Link to="/placements" className="hover:text-blue-200">Placements</Link>
//               <Link to="/internships" className="hover:text-blue-200">Internships</Link>
//               <Link to="/alumini" className="hover:text-blue-200">Alumni</Link>
//               <Link to="/team" className="hover:text-blue-200">People</Link>
//               <Link to="/login" className="hover:text-blue-200">Login</Link>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Top Bar - Hidden on mobile, visible on medium and up */}
//       <div className="h-8 bg-custom-blue text-white">

//       </div>

//       {/* Institute Name and Logo Section */}
//       <div className="bg-white">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between">
//             <div className="hidden lg:block  text-center flex-1">
//               <h1 className="text-xl font-bold">{instituteNames[index].title}</h1>
//               <h2 className="text-lg">{instituteNames[index].subtitle}</h2>
//             </div>

//             {/* Logo - Hidden on small screens */}
//             <div className="flex flex-col items-center relative">
//               {/* Background Image */}
//               <div className="absolute top-32">
//               <img src="Rectangle.png" alt="Background" className="h-10 max-w-56" />
//               </div>

//               {/* Foreground Image */}
//               <div className="hidden md:flex flex-col items-center relative top-10 z-10">
//                 <img src="nitj-logo.png" alt="NITJ Logo" className="h-32 max-w-36" />
//               </div>
//             </div>


//             {/* Second Institute Name - Only visible on large screens */}
//             <div className="text-center flex-1">
//               <h1 className="text-xl font-bold">{instituteNames[index].title}</h1>
//               <h2 className="text-lg">{instituteNames[index].subtitle}</h2>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Navigation - Hidden on mobile, shown on medium and up */}
//       <div className="hidden md:block bg-custom-blue text-white font-semibold text-xl">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between h-10 w-full">
//             <div className="flex items-center justify-evenly w-1/2">
//               <Home size={24} className="hover:text-blue-200 cursor-pointer" />
//               <Link to="/" className="hover:text-blue-200">Home</Link>
//               <Link to="/placements" className="hover:text-blue-200">Placements</Link>
//               <Link to="/internships" className="hover:text-blue-200">Internships</Link>
//             </div>
//             <div className="flex items-center justify-evenly w-1/2">
//               <Link to="/alumini" className="hover:text-blue-200">Alumni</Link>
//               <Link to="/team" className="hover:text-blue-200">People</Link>
//               <Link to="/login" className="hover:text-blue-200">Login</Link>
//               <Search size={24} className="hover:text-blue-200 cursor-pointer" />
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Navbar;

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
      title: "Dr BR AMBEDKAR NATIONAL INSTITUTE OF TECHNOLOGY",
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
      <div className="flex flex-col md:flex-row justify-between">
        {/* Visible only on small screens */}
        <div className="bg-white py-4 block md:hidden">
          
          <div className="container mx-auto px-4">
            <div className="flex flex-row items-center gap-4 justify-around">
              <img
                src="nitj-logo.png"
                alt="NITJ Logo"
                className="h-16 w-auto mb-2"
              />
              <div className="text-center">
                <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold whitespace-nowrap">
                  {instituteNames[index].title}
                </h1>
                <h2 className="text-sm sm:text-md md:text-lg">{instituteNames[index].subtitle}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Visible on medium and larger screens */}
        <div className="bg-white py-4 hidden md:block">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
             
              <div className="text-center">
                <h1 className="text-base sm:text-lg md:text-xl lg:text-xl font-semibold whitespace-nowrap">
                  {instituteNames[index].title}
                </h1>
                <h2 className="text-sm sm:text-md md:text-lg">{instituteNames[index].subtitle}</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white py-4 hidden md:block">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            
              <div className="text-center">
                <h1 className="text-base sm:text-lg md:text-xl lg:text-xl font-semibold whitespace-nowrap">
                  {instituteNames[index].title}
                </h1>
                <h2 className="text-sm sm:text-md md:text-lg">{instituteNames[index].subtitle}</h2>
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
                  className="h-10 md:h-12 w-auto hidden md:block"
                />
                <img
                  src="nitj-logo.png"
                  alt="NITJ Logo"
                  className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:-translate-y-3/4 h-20 md:h-32 w-auto z-10"
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
              <div className="absolute top-16 left-0 w-full bg-custom-blue md:hidden shadow-lg z-40">
                <div className="flex flex-col items-center py-4 space-y-4">
                  <Link to="/" className="hover:text-blue-200 text-lg" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                  <Link to="/placements" className="hover:text-blue-200 text-lg" onClick={() => setIsMobileMenuOpen(false)}>Placements</Link>
                  <Link to="/internships" className="hover:text-blue-200 text-lg" onClick={() => setIsMobileMenuOpen(false)}>Internships</Link>
                  <Link to="/alumini" className="hover:text-blue-200 text-lg" onClick={() => setIsMobileMenuOpen(false)}>Alumni</Link>
                  <Link to="/team" className="hover:text-blue-200 text-lg" onClick={() => setIsMobileMenuOpen(false)}>People</Link>
                  <Link to="/login" className="hover:text-blue-200 text-lg" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                  <Search size={24} className="hover:text-blue-200 cursor-pointer" />
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