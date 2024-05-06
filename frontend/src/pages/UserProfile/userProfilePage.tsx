import React from 'react';
import Box from '@mui/material/Box'; 
import UserProfile from './userprofile.tsx';
import Navbar from '../homePage/Navbar';
import Footer from '../homePage/footer'; 
import LowerFooter from '../homePage/lowerfooter';
import AuthWrapper from '../../services/AuthWrapper'; 
import { ROLES, User } from '../../models/user'; 

const UserProfilePage: React.FC = () => {
  // AuthWrapper component wraps the content and restricts access based on allowed roles  
  return (
      <AuthWrapper allowedRoles={[ROLES.GENERAL, ROLES.ORGANIZATION, ROLES.VOLUNTEER]}>
          {(user: User) => (
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Navbar user = {user}/>
          <Box flexGrow={1}>
            <UserProfile userId={user._id}/>
          </Box>
          <Footer />
          <LowerFooter />
        </Box>
      )}
      </AuthWrapper>
    );
    };

export default UserProfilePage;