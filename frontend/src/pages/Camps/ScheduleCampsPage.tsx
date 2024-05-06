import React from 'react';
import Box from '@mui/material/Box'; 
import HealthCampForm from './ScheduleCamps';
import Navbar from '../homePage/Navbar';
import Footer from '../homePage/footer'; 
import LowerFooter from '../homePage/lowerfooter';
import AuthWrapper from '../../services/AuthWrapper';
import { ROLES, User } from '../../models/user';

const ScheduleCampsPage: React.FC = () => {
    return (
        // Defining the role as an organization
        <AuthWrapper allowedRoles={[ROLES.ORGANIZATION.toString()]}>
          {(user: User) => (
            <Box display="flex" flexDirection="column" minHeight="100vh">
              <Navbar user={user}/>
              <Box flexGrow={1}>
                <HealthCampForm healthOrgId={user._id}/>
              </Box>
              <Footer />
              <LowerFooter />
            </Box>
          )}
        </AuthWrapper>
      );
    };
    

export default ScheduleCampsPage;
