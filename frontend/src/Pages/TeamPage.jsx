import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TeamSection from '../components/Developers/TeamSection.jsx';
import Header from '../components/header';
import Footer from '../components/footer';

const TeamPage = () => {
    const [teamData, setTeamData] = useState({ coordinator: [], devTeam: [], developers: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/devteam/get`); // Replace with your backend URL
                const developers = response.data.developers;

                // Group the data by roles
                const groupedData = developers.reduce(
                    (acc, member) => {
                        if (member.role === 'Coordinator') {
                            acc.coordinator.push(member);
                        } else if (member.role === 'Developer Team Leads') {
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

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

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
                    <TeamSection title="Coordinator" members={teamData.coordinator} />
                    <TeamSection title="Development Team Leads" members={teamData.devTeam} />
                    <TeamSection title="Developers" members={teamData.developers} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TeamPage;
