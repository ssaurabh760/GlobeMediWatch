import React, { useState, useEffect } from 'react';

import './HealthCampListVolunteers.scss';

import { Camp } from './../../models/camp';

import * as client from './../../services/client';// Importing the client for fetching the data

import { useNavigate } from 'react-router-dom';// Importing the useNavigate for navigating to the next page



// Define the HealthCampCardsProps interface
interface HealthCampCardsProps {

  volunteerId: string;

}



const HealthCampCards: React.FC<HealthCampCardsProps> = () => {

  const [camps, setCamps] = useState<Camp[]>([]);

  const [filteredCamps, setFilteredCamps] = useState<Camp[]>([]);

  const [search, setSearch] = useState('');

  const navigate = useNavigate();



  useEffect(() => {

    client.getAllCamps().then((data) => {

      setCamps(data);

      setFilteredCamps(data);

    });

  }, []);



  useEffect(() => {

    const lowercasedSearch = search.toLowerCase();

    const filteredData = camps.filter(camp =>

      camp.campName.toLowerCase().includes(lowercasedSearch) ||

      camp.address.toLowerCase().includes(lowercasedSearch) ||

      new Date(camp.date).toLocaleDateString().includes(lowercasedSearch)

    );

    setFilteredCamps(filteredData);

  }, [search, camps]);



  // Function to handle joining a camp

  const handleJoinCamp = (campId: string) => {

    navigate(`/volunteer-form/${campId}`);

  };



  return (
    <div className="camp-cards-outercontainer" data-aos="fade-up">
      <div style={{ textAlign: 'right', margin: '10px 20px 20px 0' }}> {/* Adjust margin as needed */}
        <input
          type="text"
          placeholder="Search..."
          className="search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: '200px', padding: '8px' }} // Adjust size and padding
        />
      </div>
      <div className="camp-cards-container">
        {filteredCamps.map(camp => (
          <div key={camp._id} className="camp-card">
            <h3 className="camp-card-title">{camp.campName}</h3>
            <p className="camp-card-date">&#128198;&nbsp;{new Date(camp.date).toLocaleDateString()}</p>
            <p className="camp-card-description">&#128220;&nbsp;{camp.description}</p>
            <p className="camp-card-address">&#128640;&nbsp;{camp.address}</p>
            <button 
              className="camp-card-button"
              onClick={() => handleJoinCamp(camp._id)}
            >
              Join Camp
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthCampCards;