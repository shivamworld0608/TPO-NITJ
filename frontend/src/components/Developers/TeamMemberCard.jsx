import React from 'react';
import {  FaGithub, FaEnvelope, FaPhone, FaGlobe, FaLinkedinIn, FaFileAlt,FaInstagram } from 'react-icons/fa';

const TeamMemberCard = ({ image, name, department,batch, linkedinUrl, githubUrl, email, mobile, website,resumeUrl,role }) => (
    <div className="w-96 h-auto rounded-2xl shadow-lg bg-white p-6 flex flex-col items-center space-y-4 transform hover:scale-105 transition-all duration-300">
         <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-transparent shadow-md bg-gradient-to-r from-purple-400  to-blue-400 animate-border">
            <img
                src={image || "/api/placeholder/150/150"}
                alt={name}
                className="w-full h-full object-cover"
            />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 text-center">{name}</h3>
        {(role=="Developer Team Lead" || role=="Developer") && <p className="text-gray-600 text-xl font-semibold text-center">{department}&apos;{batch}</p>}
        {/* <p className="text-gray-600 text-xl font-semibold text-center">{batch}</p> */}
        <div className="flex  mt-2">
            {linkedinUrl && (
                <a 
                    href={linkedinUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3  rounded-full text-blue-700 hover:bg-blue-700 hover:text-white transition-all"
                >
                    <FaLinkedinIn size={20} />
                </a>
            )}
            {githubUrl && (
                <a 
                    href={githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 b rounded-full text-gray-900 hover:bg-gray-900 hover:text-white transition-all"
                >
                    <FaGithub size={20} />
                </a>
            )}
            {email && (
                <a 
                    href={`mailto:${email}`} 
                    className="p-3 rounded-full text-red-600 hover:bg-red-600 hover:text-white transition-all"
                >
                    <FaEnvelope size={20} />
                </a>
            )}
            {mobile && (
                <a 
                    href={`tel:${mobile}`} 
                    className="p-3  rounded-full text-green-600 hover:bg-green-500 hover:text-white transition-all"
                >
                    <FaPhone size={20} />
                </a>
            )}
            {website && (
                <a 
                    href={website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-full text-pink-600 hover:bg-pink-600 hover:text-white transition-all"
                >
                    <FaInstagram size={20} />
                </a>
            )}


        </div>
    </div>
);

export default TeamMemberCard;
