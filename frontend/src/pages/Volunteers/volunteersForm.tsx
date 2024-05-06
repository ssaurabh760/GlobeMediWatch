import React, { useState } from 'react';
import './VolunteerForm.css';
import Alert from '@mui/material/Alert';
import { VolunteerFormState } from '../../models/volunteer';
import * as client from './../../services/client'
import { useParams } from 'react-router-dom';// Importing the useParams for getting the campId
import { useNavigate } from 'react-router-dom';// Importing the useNavigate for navigating to the next page

import { Notification } from '../../models/notification';
import { User } from '../../models/user';
import { sendNotification } from '../../services/CreateNotificationService';// Importing the CreateNotificationService for sending notifications

// const camps = ["Eye Camp", "Blood Donation Camp", "BP Check Camp", "Diabetes Camp", "Dental Fillings Camp", "Cancer Screening Camp", "Nutrition Camp", "Pediatrics Camp"];
const expertiseOptions = ["Medical", "Organizational", "Technical", "Educational"];
interface VolunteerFormProps {
  volunteerId: string;
  
}
// Define the VolunteerForm component
const VolunteerForm: React.FC<VolunteerFormProps> = (volunteerProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<VolunteerFormState>({
    name: '',
    email: '',
    phoneNumber: '',
    camp: '',
    expertise: ''
  });
  const params = useParams();
  const campId = params.campId;
  const [showAlert, setShowAlert] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    setShowAlert(true);
    client.registerVolunteerForCamp(campId, volunteerProps.volunteerId);
  
    try {
      const targetUser: User = await client.getUserByEmail(formData.email);
      console.log('User fetched successfully:', targetUser);
      const notificationData: Notification = {
        targetUser: targetUser,
        subject: 'Registration Confirmation',
        message: 'Thank you for registering as a volunteer for the camp!',
        timeStamp: new Date(),
      };
  
      await sendNotification(notificationData);
      console.log('Notification sent successfully');
    } catch (error) {
      console.error('Failed to send notification:', error);
    }
  
    setTimeout(() => {
      navigate(`/volunteer-registered-camps`);
    }, 3000);
  };

  return (
    <div className="general-container" data-aos="fade-up">
      <div className="volunteer-body">
        <form onSubmit={handleSubmit} className="volunteer-form-container">
        {showAlert && <Alert severity="success">You have successfully Registered</Alert>}
          <div className="volunteer-form-group">
            <label htmlFor="name" className="volunteer-label">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="volunteer-input volunteer-input-icon name" 
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="volunteer-form-group">
            <label htmlFor="email" className="volunteer-label">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="volunteer-input volunteer-input-icon email" 
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="volunteer-form-group">
            <label htmlFor="phoneNumber" className="volunteer-label">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              className="volunteer-input volunteer-input-icon phoneNumber" 
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="volunteer-form-group">
            <label htmlFor="camp" className="volunteer-label">Select your expertise</label>
            <select
              id="camp"
              name="camp"
              className="volunteer-select volunteer-input-icon camp" 
              value={formData.camp}
              onChange={handleChange}
            >
              <option value="">Select Expertise</option>
              {expertiseOptions.map(expertise => (
                <option key={expertise} value={expertise}>{expertise}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="volunteer-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default VolunteerForm;