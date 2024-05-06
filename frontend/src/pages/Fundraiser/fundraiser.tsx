/**
 * Represents the Fundraiser component.
 * This component allows users to create, edit, and delete fundraisers.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.healthOrgId - The ID of the health organization associated with the fundraisers.
 * @returns {JSX.Element} The Fundraiser component.
 */
//
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, LinearProgress } from '@mui/material';
import './fundraiser.scss';
import { Fundraiser } from '../../models/fundriaser';

const API_URL = "http://localhost:3000/";

interface ManageFundraisersProps {
  healthOrgId: String;
}

const FundraiserComponent: React.FC<ManageFundraisersProps> = ({healthOrgId}) => {
  const [formData, setFormData] = useState<Fundraiser>({
    _id: '',
    title: '',
    description: '',
    goalAmount: 0,
    currentAmount: 0,
    associatedCampID: healthOrgId.toString(),
    donors: [],
  });

  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>('');
  const [showEditConfirmation, setshowEditConfirmation] = useState<boolean>(false);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState<boolean>(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);

  useEffect(() => {
    const fetchFundraisers = async () => {
      try {
        const response = await axios.get<Fundraiser[]>(API_URL + `fundraisers/organization/${healthOrgId}`);
        setFundraisers(response.data);
      } catch (error) {
        console.error('Error fetching fundraisers:', error);
      }
    };
    fetchFundraisers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(API_URL + `fundraisers/${selectedId}`, formData);
        setIsEditing(false);
        setshowEditConfirmation(true);

        // Hide confirmation message after 2 seconds
        setTimeout(() => {
          setshowEditConfirmation(false);
        }, 2000);
      } else {
        await axios.post(API_URL + 'fundraisers', formData);
        setShowSaveConfirmation(true);

        // Hide confirmation message after 2 seconds
        setTimeout(() => {
          setShowSaveConfirmation(false);
        }, 2000);
      }
      setFormData({
        _id: '',
        title: '',
        description: '',
        goalAmount: 0,
        currentAmount: 0,
        associatedCampID: '',
        donors: [],
      });
      const response = await axios.get<Fundraiser[]>(API_URL + `fundraisers/organization/${healthOrgId}`);
      setFundraisers(response.data);
    } catch (error) {
      console.error('Error creating or updating fundraiser:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // Prompt confirmation from the user
      const confirmDelete = window.confirm("Are you sure you want to delete this fundraiser?");
      
      // Proceed with deletion if user confirms
      if (confirmDelete) {
        await axios.delete(API_URL + `fundraisers/${id}`);
        setShowDeleteConfirmation(true);
  
        // Hide confirmation message after 2 seconds
        setTimeout(() => {
          setShowDeleteConfirmation(false);
        }, 2000);
  
        const response = await axios.get<Fundraiser[]>(API_URL + `fundraisers/organization/${healthOrgId}`);
        setFundraisers(response.data);
      }
    } catch (error) {
      console.error('Error deleting fundraiser:', error);
    }
  };
  

  const handleEdit = (fundraiser: Fundraiser) => {
    setIsEditing(true);
    setSelectedId(fundraiser._id);
    setFormData(fundraiser);
    window.scrollTo(0, 0);
  };

  const calculateProgress = (currentAmount: number, goalAmount: number) => {
    return (currentAmount / goalAmount) * 100;
  };

  return (
      <div className="container" data-aos="fade-up">
        <h1 className="page-title">Create or Edit Fundraiser</h1><br />
        <form onSubmit={handleSubmit} className="form">
          <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
          <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
          <input type="number" name="goalAmount" value={formData.goalAmount} onChange={handleChange} placeholder="Goal Amount" required />
          {/* <input type="text" name="associatedCampID" value={formData.associatedCampID} onChange={handleChange} placeholder="Associated Camp ID" required readOnly /> */}
          <button type="submit" className="submit-btn">{isEditing ? 'Save Changes' : 'Create Fundraiser'}</button>
          {showEditConfirmation && <div className="confirmation-message">Changes saved successfully!</div>}
          {showSaveConfirmation && <div className="confirmation-message">Fundraiser created successfully!</div>}
          {showDeleteConfirmation && <div className="confirmation-message">Fundraiser deleted successfully!</div>}
        </form>

        <h1 className="page-title">Fundraisers</h1><br />
        <div className="fundraisers-container">
          {fundraisers.map((fundraiser, index) => (
            <Card id={`fundraiser-card-${index}`} className="fundraiser-card" key={fundraiser._id}>
              <CardContent className='cardcontent'>
                <Typography variant="h5" component="h2" className='title'>
                  {fundraiser.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom className='description'>
                  Description: {fundraiser.description}
                </Typography>
                <Typography color="textSecondary">
                  <span style={{ fontWeight: 'bold' }}>Goal Amount: $ {fundraiser.goalAmount}</span>
                </Typography>
                <Typography color="textSecondary">
                  <span style={{ fontWeight: 'bold' }}>Current Amount: $ {fundraiser.currentAmount}</span>
                </Typography>
                <br />
                <LinearProgress variant="determinate" value={calculateProgress(fundraiser.currentAmount, fundraiser.goalAmount)} />
                <br />
                <Button onClick={() => handleEdit(fundraiser)} variant="contained" className="edit-btn">Edit</Button>
                <Button onClick={() => handleDelete(fundraiser._id)} variant="contained" color="error" className="delete-btn">Delete</Button>
              </CardContent>
            </Card>
          ))}
        </div>
    </div>
  );
};

export default FundraiserComponent;
