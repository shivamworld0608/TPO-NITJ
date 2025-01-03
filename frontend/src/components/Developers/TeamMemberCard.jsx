import React from 'react';
import { Phone, Linkedin } from 'lucide-react';

const TeamMemberCard = ({ image, name, linkedinUrl, mobile }) => (
    <div className="w-80 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white overflow-hidden">
        <div className="w-full h-48 relative">
            <img
                src={image || "/api/placeholder/320/192"}
                alt={name}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <h3 className="absolute bottom-4 left-4 font-bold text-xl text-white">{name}</h3>
        </div>

        <div className="p-6">
            <div className="flex flex-col space-y-4">
                <a
                    href={linkedinUrl}
                    className="flex items-center space-x-3 text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-lg hover:bg-blue-50 group"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Linkedin className="group-hover:scale-110 transition-transform" size={20} />
                    <span className="font-medium">{name}</span>
                </a>
                <div className="flex items-center space-x-3 text-gray-700 p-2">
                    <Phone size={20} />
                    <span className="font-medium">{mobile}</span>
                </div>
            </div>
        </div>
    </div>
);

export default TeamMemberCard;