import React from 'react';
import TeamMemberCard from './TeamMemberCard';

const TeamSection = ({ title, members }) => (
    <div className="mb-16">
        <div className="flex items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
            <div className="ml-4 flex-grow h-px bg-gray-200"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member) => (
                <TeamMemberCard key={member.name} {...member} />
            ))}
        </div>
    </div>
);

export default TeamSection;