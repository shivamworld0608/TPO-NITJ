import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaGlobe, FaLinkedinIn, FaFilePdf } from 'react-icons/fa';

const TeamMemberCard = ({ image, name, department,batch, linkedinUrl, githubUrl, email, mobile, website,resume }) => (
    <div className="w-96 h-auto rounded-2xl shadow-lg bg-white p-6 flex flex-col items-center space-y-4 transform hover:scale-105 transition-all duration-300">
        <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-blue-600 shadow-md">
            <img
                src={image || "/api/placeholder/150/150"}
                alt={name}
                className="w-full h-full object-cover"
            />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 text-center">{name}</h3>
        <p className="text-gray-600 text-lg text-center">{department}</p>
        <p className="text-gray-600 text-lg text-center">{batch}</p>
        <div className="flex space-x-1 mt-2">
            {linkedinUrl && (
                <a 
                    href={linkedinUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3  rounded-md text-blue-700 hover:bg-blue-700 hover:text-white transition-all"
                >
                    <FaLinkedinIn size={20} />
                </a>
            )}
            {githubUrl && (
                <a 
                    href={githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800 rounded-full text-white hover:bg-gray-900 transition-all"
                >
                    <FaGithub size={24} />
                </a>
            )}
            {email && (
                <a 
                    href={`mailto:${email}`} 
                    className="p-3 bg-red-600 rounded-full text-white hover:bg-red-800 transition-all"
                >
                    <FaEnvelope size={24} />
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
                    className="p-3 bg-indigo-600 rounded-full text-white hover:bg-indigo-800 transition-all"
                >
                    <FaGlobe size={24} />
                </a>
            )}
             {resume && (
                <a 
                    href={resume} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-purple-600 rounded-full text-white hover:bg-purple-800 transition-all"
                    download={true}
                >
                    <FaFilePdf size={24} />
                </a>
            )}
        </div>
    </div>
);

export default TeamMemberCard;
