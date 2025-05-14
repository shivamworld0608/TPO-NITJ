import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TeamSection from '../components/Developers/TeamSection.jsx';
import Header from '../components/header';
import Footer from '../components/footer';
import BouncingLoader from '../components/BouncingLoader';

const TeamPage = () => {
    const [teamData, setTeamData] = useState({ coordinator: [], devTeam: [], developers: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState(false);

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/devteam/get`);
                const developers = response.data.developers;
                const groupedData = developers.reduce(
                    (acc, member) => {
                        if (member.role === 'Coordinator') {
                            acc.coordinator.push(member);
                        } else if (member.role === 'Developer Team Lead') {
                            acc.devTeam.push(member);
                        } else if (member.role === 'Developer') {
                            acc.developers.push(member);
                        }
                        return acc;
                    },
                    { coordinator: [], devTeam: [], developers: [] }
                );

                setTeamData(groupedData);
            } catch (error) {
                console.error(error);
                setError('Failed to load team data.');
            } finally {
                setLoading(false);
            }
        };

        fetchTeamData();
    }, []);

     if (loading){
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-blue"></div>
      </div>
    )};
     if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <div className="container mx-auto mt px-4 py-12 max-w-7xl">
                <div className="text-center mb-16">
                    <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-center tracking-wide">
                        Team{" "}
                        <span className="bg-custom-blue text-transparent bg-clip-text">
                            Members
                        </span>
                    </h1>
                    <p className="font-bold text-2xl sm:text-sm lg:text-lg text-center tracking-wide">
                        Meet the talented individuals{" "}
                        <span className="bg-custom-blue text-transparent bg-clip-text">
                            who make our team exceptional
                        </span>
                    </p>

                </div>
                <div className='flex justify-end'>

                <div className="flex border-2 border-gray-300 rounded-3xl bg-white ">

                <button
                        className={`px-4 py-2 rounded-3xl ${
                            activeTab === false
                            ? "bg-custom-blue text-white"
                            : "bg-white"
                        }`}
                        onClick={() => setActiveTab(false)}
                        >
                        Dev Team
                    </button>
                    <button
                        className={`px-4 py-2 rounded-3xl ${
                            activeTab === true
                            ? "bg-custom-blue text-white"
                            : "bg-white"
                        }`}
                        onClick={() => setActiveTab(true)}
                        >   
                        Coordinators
                    </button>
                        </div>
                        </div>

                <div className="space-y-16">
                    {
                        activeTab ? (
                            <TeamSection title="Coordinator" members={teamData.coordinator} />
                        ):(
                            <div>
                                <TeamSection title="Developer Team Lead" members={teamData.devTeam} />
                                <TeamSection title="Other Developers" members={teamData.developers} />                               
                            </div>
                        )
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TeamPage;