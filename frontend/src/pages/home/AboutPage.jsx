import React from 'react';
import Navbar from '../../components/Navbar';

const team = [
  {
    name: 'Sayan Maji',
    role: 'Frontend Developer',
  },
  {
    name: 'Soumick Roy',
    role: 'Backend Developer',
  },
  {
    name: 'Oliva Dutta',
    role: 'UI/UX Designer',
  },
  {
    name: 'Pralay Patra',
    role: 'Database Engineer',
  },
  {
    name: 'Dwip Sasmal',
    role: 'Project Manager',
  },
];

const AboutPage = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar/>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-6 text-center">About BeeWatch</h1>
        
        <p className="text-gray-300 text-lg sm:text-xl text-center max-w-3xl mx-auto mb-10">
          BeeWatch is a smart movie and TV show recommendation platform that helps users find the best content to watch,
          powered by intelligent algorithms and The Movie Database (TMDB) API. Whether you're into action, romance, thrillers, or documentaries —
          BeeWatch has something buzzing just for you.
        </p>

        <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-300 mb-4 text-center">Our Mission</h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
          We aim to make discovering movies and TV shows easier, faster, and more personalized.
          Our recommendation engine learns your preferences and helps you avoid endless scrolling.
        </p>

        <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-300 mb-8 text-center">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-yellow-400/40 transition-shadow text-center"
            >
              <div className="text-xl font-bold text-yellow-400">{member.name}</div>
              <div className="text-sm text-gray-300 mt-2">{member.role}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
