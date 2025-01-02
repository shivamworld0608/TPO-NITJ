import React from 'react';
import TeamSection from '../components/TeamSection';
import Header from '../components/header';
import Footer from '../components/footer';
const teamData = {
    coordinator: [
        {
            image: "https://t4.ftcdn.net/jpg/06/48/39/19/360_F_648391979_uMz6EwAlKNIJnK9r46UpTiM17nT8GuLl.jpg",
            name: "John Doe",
            linkedin: "https://www.linkedin.com/in/prem-kumar-kardale-b72192268/",
            mobile: "+91 9988776655"
        }
    ],
    devTeam: [
        {
            image: "https://t4.ftcdn.net/jpg/06/48/39/19/360_F_648391979_uMz6EwAlKNIJnK9r46UpTiM17nT8GuLl.jpg",
            name: "Jane Smith",
            linkedin: "https://www.linkedin.com/in/prem-kumar-kardale-b72192268/",
            mobile: "+91 9988776655"
        },
        {
            image: "https://t4.ftcdn.net/jpg/06/48/39/19/360_F_648391979_uMz6EwAlKNIJnK9r46UpTiM17nT8GuLl.jpg",
            name: "Mike Johnson",
            linkedin: "https://www.linkedin.com/in/prem-kumar-kardale-b72192268/",
            mobile: "+91 9988776655"
        }
    ],
    developers: [
        {
            image: "https://t4.ftcdn.net/jpg/06/48/39/19/360_F_648391979_uMz6EwAlKNIJnK9r46UpTiM17nT8GuLl.jpg",
            name: "Sarah Wilson",
            linkedin: "https://www.linkedin.com/in/prem-kumar-kardale-b72192268/",
            mobile: "+91 9988776655"
        },
        {
            image: "https://t4.ftcdn.net/jpg/06/48/39/19/360_F_648391979_uMz6EwAlKNIJnK9r46UpTiM17nT8GuLl.jpg",
            name: "Tom Brown",
            linkedin: "https://www.linkedin.com/in/prem-kumar-kardale-b72192268/",
            mobile: "+91 9988776655"
        },
        {
            image: "https://t4.ftcdn.net/jpg/06/48/39/19/360_F_648391979_uMz6EwAlKNIJnK9r46UpTiM17nT8GuLl.jpg",
            name: "Emily Davis",
            linkedin: "https://www.linkedin.com/in/prem-kumar-kardale-b72192268/",
            mobile: "+91 9988776655"
        }
    ]
};

const TeamPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="container mx-auto px-4 py-12 max-w-7xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Team Members</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Meet the talented individuals who make our team exceptional
                    </p>
                </div>

                <div className="space-y-16">
                    <TeamSection
                        title="Coordinator"
                        members={teamData.coordinator}
                    />
                    <TeamSection
                        title="Development Team Leads"
                        members={teamData.devTeam}
                    />
                    <TeamSection
                        title="Developers"
                        members={teamData.developers}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TeamPage;