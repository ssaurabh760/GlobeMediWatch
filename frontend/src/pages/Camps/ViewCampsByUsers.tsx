import React, { useState, useEffect } from 'react';
import { Camp } from './../../models/camp';
import * as client from './../../services/client';
import './ViewCampsByUsers.scss';
import {loadCamps, getAll} from './../../store/slice/camps';
import {AppDispatch} from './../../store';// Import the AppDispatch type for state management
import { useDispatch, useSelector } from 'react-redux';// Import the useDispatch and useSelector hooks for state management

const HealthCampForUsers: React.FC = () => {
  // const [camps, setCamps] = useState<Camp[]>([]);
  const [selectedCamp, setSelectedCamp] = useState<Camp | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const newCamps = useSelector(getAll());

  useEffect(() => {
    // Simulate fetching data
    client.getAllCamps().then((data) => {
      dispatch(loadCamps(data));// Dispatch the loadCamps action to update the state
      // setCamps(data);
    }).catch(error => console.error('Error fetching camps:', error));
  }, []);

  return (
    <div className="unique-healthcamp-layout-container"  data-aos="fade-up">
      <div className="unique-healthcamp-list-container">
        {newCamps.map(camp => (
          <div key={camp._id} 
               className="unique-healthcamp-card-item" 
               onClick={() => setSelectedCamp(camp)}>
            <div className="unique-healthcamp-card-title">{camp.campName}</div>
            {/* <div className="unique-healthcamp-card-date">{new Date(camp.date).toLocaleDateString()}</div> */}
          </div>
        ))}
      </div>
      <div className="unique-healthcamp-details-container">
      {selectedCamp ? (
  <>
    <h3 className="hc-view-details-name">{selectedCamp.campName}</h3>
    <p className="hc-view-details-date">&#128198;&nbsp;{new Date(selectedCamp.date).toLocaleDateString()}</p>
    <p className="hc-view-details-desc">&#128220;&nbsp;{selectedCamp.description}</p>
    <p className="hc-view-details-addr">&#128640;&nbsp;{selectedCamp.address}</p>
  </>
) : (
  <p className="hc-view-details-empty">Select a camp to view details</p>
)}
      </div>
    </div>
  );
};

export default HealthCampForUsers;
