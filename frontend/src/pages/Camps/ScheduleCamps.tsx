import React, { useState } from 'react';
import { Camp } from './../../models/camp';
import './ScheduleCamps.scss';
import * as client from './../../services/client';
import { useNavigate } from 'react-router-dom';



interface HealthCampFormProps {
  healthOrgId: string;
}
// Define camp types
const campTypes = [
  "Eye Camp", "Blood Donation Camp", "BP Check Camp", "Diabetes Camp", 
  "Dental Fillings Camp", "Cancer Screening Camp", "Nutrition Camp", "Pediatrics Camp"
];


const HealthCampForm: React.FC<HealthCampFormProps> = ({healthOrgId}) => {
  const navigate = useNavigate();
  const [campformData, setCampFormData] = useState<Camp>({
    _id: '',
    campName: '',
    campType: '',
    date: '',
    description: '',
    address: '',
    offeredBy: healthOrgId,
    volunteers: [],
    servicesOffered: []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setCampFormData({
      ...campformData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Health Camp Data Submitted:', campformData);
    alert('Health Camp Scheduled Successfully!');
    client.createHealthCamp(campformData);
    setTimeout(() => {
      navigate('/camp_by_healthorgs');
    }
    , 1000);
  };

  return (
    <div className="health-camp-wrapper" >
        <div className="health-camp-form-container" data-aos="fade-up">
            <form onSubmit={handleSubmit} >
                <label htmlFor="campName" className="health-camp-label">Camp Name:</label>
                <input
                type="text"
                id="campName"
                name="campName"
                className="health-camp-input"
                value={campformData.campName}
                onChange={handleChange}
                />

                <label htmlFor="campType" className="health-camp-label">Type of Camp:</label>
                <select
                id="campType"
                name="campType"
                className="health-camp-input"
                value={campformData.campType}
                onChange={handleChange}
                >
                <option value="">Select Camp Type</option>
                {campTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                ))}
                </select>

                <label htmlFor="description" className="health-camp-label">Description:</label>
                <textarea
                id="description"
                name="description"
                className="health-camp-textarea"
                value={campformData.description}
                onChange={handleChange}
                />

                <label htmlFor="date" className="health-camp-label">Date:</label>
                <input
                type="date"
                id="date"
                name="date"
                className="health-camp-input"
                value={campformData.date}
                onChange={handleChange}
                />

                <label htmlFor="address" className="health-camp-label">Address:</label>
                <input
                type="text"
                id="address"
                name="address"
                className="health-camp-input"
                value={campformData.address}
                onChange={handleChange}
                />

                <button type="submit" className="health-camp-submit-button">Schedule Camp</button>
            </form>
        </div>
    </div>
  );
};

export default HealthCampForm;
