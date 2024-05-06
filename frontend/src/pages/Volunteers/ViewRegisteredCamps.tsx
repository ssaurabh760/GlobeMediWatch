import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';
import * as client from './../../services/client';
import { Camp } from './../../models/camp';

interface VolunteerCampsProps {
  volunteerId: string;
}

// This component displays the camps that a volunteer has registered for.
const VolunteerCamps: React.FC<VolunteerCampsProps> = ({ volunteerId }) => {
  const [camps, setCamps] = useState<Camp[]>([]);


  useEffect(() => {
    client.getVolunteerById(volunteerId)
      .then(response => {
        setCamps(response.campsVolunteered);
      })
      .catch(error => {
        console.error('Error fetching volunteer details:', error);
      });
  }, [volunteerId]);

  // This function cancels the registration of a volunteer for a camp.
  const handleCancelRegistration = (campId: string) => {
    client.removeVolunteerFromCamp(volunteerId, campId)
      .then(() => {
        setCamps(camps.filter(camp => camp._id !== campId));
        alert('Camp registration cancelled successfully');
      })
      .catch(error => {
        console.error('Error cancelling camp registration:', error);
      });
  };

  // If the volunteer has not registered for any camps, display a message.

  if (camps.length === 0) {
    return (
      <Typography variant="h6" style={{ minHeight: '70vh', textAlign: 'center', marginTop: '20px' }}>
        <h1><i>You have not registered for any camps.</i></h1>
      </Typography>
    );
  }

  return (
    <div data-aos="fade-up">
      <Typography variant="h4" style={{ textAlign: 'center', margin: '20px 0' }}>
        Your Registered Camps
      </Typography>
      {camps.map(camp => (
        <Card key={camp._id} variant="outlined" style={{ borderColor: '#007bff', margin: '20px' }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {camp.campName}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {new Date(camp.date).toLocaleDateString()}
            </Typography>
            <Typography variant="body2">
              {camp.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              style={{ backgroundColor: '#1a237e', color: 'white' }}
              onClick={() => handleCancelRegistration(camp._id)}
            >
              Cancel Registration
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default VolunteerCamps;