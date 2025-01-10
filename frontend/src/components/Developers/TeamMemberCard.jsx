import React from 'react';
import { Phone, Linkedin } from 'lucide-react';

const TeamMemberCard = ({ image, name, linkedinUrl, mobile }) => (
    <div className="w-80 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 bg-white overflow-hidden transform hover:scale-105">
        <div className="relative w-full h-2/3">
            <img
                src={image || "/api/placeholder/320/192"}
                alt={name}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <h3 className="absolute bottom-4 left-4 text-xl font-semibold text-white">{name}</h3>
        </div>

        <div className="p-6 space-y-4">
            <a
                href={linkedinUrl}
                className="flex items-center space-x-3 text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-lg group"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`LinkedIn profile of ${name}`}
            >
                <Linkedin className="group-hover:scale-110 transition-transform" size={24} />
                <span className="font-medium text-lg">LinkedIn</span>
            </a>
            <div
                className="flex items-center space-x-3 text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label={`Phone number of ${name}`}
            >
                <Phone size={24} />
                <span className="font-medium text-lg">{mobile}</span>
            </div>
        </div>
    </div>
);

export default TeamMemberCard;
