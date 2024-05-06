import React from 'react';
import Box from '@mui/material/Box'; 
import HealthCampCards from './HealthCampListVolunteers'; 
import Navbar from '../homePage/Navbar';
import Footer from '../homePage/footer'; 
import LowerFooter from '../homePage/lowerfooter';
import AuthWrapper from '../../services/AuthWrapper';
import { ROLES, User } from '../../models/user';

const HealthCampCardsPage: React.FC = () => {
    console.log(ROLES.VOLUNTEER.toString());
    return (
        // Defining the role as a volunteer
        <AuthWrapper allowedRoles={[ROLES.VOLUNTEER.toString()]}>
          {(user: User) => (
            <Box display="flex" flexDirection="column" minHeight="100vh">
              <Navbar user={user}/>
              <Box flexGrow={1}>
                <HealthCampCards volunteerId={user._id} />
              </Box>
              <Footer />
              <LowerFooter />
            </Box>
          )}
        </AuthWrapper>
      );
    };

export default HealthCampCardsPage;