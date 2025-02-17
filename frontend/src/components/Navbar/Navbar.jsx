import React from 'react';
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
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="text-center flex-1">
              <h1 className="text-xl font-bold">डॉ बी आर अम्बेडकर राष्ट्रीय प्रौद्योगिकी संस्थान</h1>
              <h2 className="text-lg">जालंधर, पंजाब (भारत)</h2>
            </div>
            <img 
              src="nitj-logo.png" 
              alt="NITJ Logo" 
              className="h-20 w-25 z-50"
            />
            <div className="text-center flex-1">
              <h1 className="text-xl font-bold">ਡਾ ਬੀ ਆਰ ਅੰਬੇਡਕਰ ਨੈਸ਼ਨਲ ਇੰਸਟੀਚਿਊਟ ਟੈਕਨਾਲੋਜੀ</h1>
              <h2 className="text-lg">ਜਲੰਧਰ, ਪੰਜਾਬ (ਭਾਰਤ)</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-custom-blue text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-evenly items-center h-12">
            <div className="flex items-center space-x-6">
              <Home size={20} className="hover:text-blue-200 cursor-pointer" />
              <a href="#" className="hover:text-blue-200">ADMINISTRATION</a>
              <a href="#" className="hover:text-blue-200">ACADEMICS</a>
              <a href="#" className="hover:text-blue-200">ADMISSIONS</a>
              </div>
              <img 
              src="Rectangle.png" 
              alt="NITJ Logo" 
              className="h-12 w-100"
            />
              <div className='flex items-center space-x-6'>
              <a href="#" className="hover:text-blue-200">RESEARCH</a>
              <a href="#" className="hover:text-blue-200">ALUMNI</a>
              <a href="#" className="hover:text-blue-200">LIFE AT NITJ</a>
            </div>
            <Search size={20} className="hover:text-blue-200 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;